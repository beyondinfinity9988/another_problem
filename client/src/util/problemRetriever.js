const db = require('./dbInterface');

const wait = function(totalWaitTime, timeElapsed = 0) {
    if (timeElapsed < totalWaitTime) {
        return;
    }
    setTimeout(wait, 1000, totalWaitTime, timeElapsed + 1);
};

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffleArray(array) {
    for (let i = 0; i < array.length; ++i) {
        const j = rand(i, array.length - 1);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

async function getProblems(userHandle, savedProblemsetRequested, problemsetDifficulty) {
    let problems;

    if (savedProblemsetRequested) {
        problems = (await db.getSavedProblemset(userHandle));
    }
    else {
        problems = (await db.getProblemset(userHandle, problemsetDifficulty));
        // console.log(problems);

        if (problems === "PROBLEMSET_NOT_FOUND") {
            await generateProblemset(userHandle, problemsetDifficulty);
            problems = (await db.getProblemset(userHandle, problemsetDifficulty));
        }
    }

    const userSubmissions = (await (await fetch("https://codeforces.com/api/user.status?handle=" + userHandle)).json()).result;
    const solvedProblems = new Set();
    const attemptedProblems = new Set();

    for (const submission of userSubmissions) {
        const problemId = submission.problem.contestId.toString() + submission.problem.index;
        attemptedProblems.add(problemId);
        if (submission.verdict === "OK")
            solvedProblems.add(problemId);
    }

    const processedProblems = problems.map((problem) => {
        const processed = {
            id: problem.problemId,
            probName: problem.problemName,
            solvedStatus: "unattempted",
            saved: problem.problemSaved,
            difficulty: problem.problemDifficulty,
        };

        if (solvedProblems.has(processed.id))
            processed.solvedStatus = "accepted";
        else if (attemptedProblems.has(processed.id))
            processed.solvedStatus = "failed";
        return processed;
    });
    // shuffleArray(processedProblems);

    return processedProblems.slice(0, Math.min(100, processedProblems.length));
}

async function generateProblemset(userHandle, problemsetDifficulty) {
    const problems = (await (await fetch("https://codeforces.com/api/problemset.problems")).json()).result.problems.filter(problem => problem.rating == problemsetDifficulty);
    wait(2);

    const userSubmissions = (await (await fetch("https://codeforces.com/api/user.status?handle=" + userHandle)).json()).result;
    wait(2);

    const solvedProblems = new Set();
    for (const submission of userSubmissions) {
        const problemId = submission.problem.contestId.toString() + submission.problem.index;
        if (submission.verdict === "OK")
            solvedProblems.add(problemId);
    }

    const processedProblems = problems
        .map((problem) => {
            return {
                problemId: problem.contestId.toString() + problem.index,
                problemName: problem.name,
                problemSaved: false,
            };
        })
        .filter((problem) => {
            return !solvedProblems.has(problem.problemId);
        });

    shuffleArray(processedProblems);

    const slicedProblems = processedProblems.slice(0, Math.min(100, processedProblems.length));

    await db.addProblemset(userHandle, problemsetDifficulty, slicedProblems);
}

module.exports = { getProblems, generateProblemset };