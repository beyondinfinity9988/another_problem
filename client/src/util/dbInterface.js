const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const problemsetSchema = new mongoose.Schema({
    difficulty: Number,
    problems: [{
        problemId: String,
        problemName: String,
        problemSaved: Boolean,
    }],
});

const userSchema = new mongoose.Schema({
    handle: String,
    password: String,
    savedProblemset: [{
        problemId: String,
        problemName: String,
        problemDifficulty: Number,
    }],
    generatedProblemsets: [problemsetSchema],
});

let dbConnection;
let User;

async function startConnection() {
    dbConnection = await mongoose.connect('mongodb://127.0.0.1:27017/users');
    User = dbConnection.model('User', userSchema);
}

async function getUser(handle) {
    return await User.findOne({ handle: handle }).clone();
}

function hashPassword(password) {
    return password;
}

async function authenticate(handle, password) {
    const user = await getUser(handle);
    return user && hashPassword(password) == user.password;
}

async function addProblemset(userHandle, problemsetDifficulty, problemset) {
    const user = await getUser(userHandle);
    // console.log(user.generatedProblemsets);
    user.generatedProblemsets.push({
        difficulty: problemsetDifficulty,
        problems: problemset
    });
    await User.updateOne({ handle: userHandle }, { generatedProblemsets: user.generatedProblemsets }, (err, obj) => {
        if (err)
            console.log(err);
    }).clone();
}

async function getSavedProblemset(userHandle) {
    const user = await getUser(userHandle);
    // console.log(user);
    return user.savedProblemset;
}

async function getProblemset(userHandle, problemsetDifficulty) {
    const user = await getUser(userHandle);
    // console.log(user.generatedProblemsets);
    for (let problemset of user.generatedProblemsets) {
        if (problemset.difficulty === problemsetDifficulty) {
            return problemset.problems;
        }
    }
    return "PROBLEMSET_NOT_FOUND";
}

async function addProblemToSaved(userHandle, problemId, problemName, problemDifficulty) {
    const user = await getUser(userHandle);
    user.savedProblemset.push({
        problemId: problemId,
        problemName: problemName,
        problemDifficulty: problemDifficulty,
    });

    const problemsetIndex = user.generatedProblemsets.findIndex(problemset => problemset.difficulty == problemDifficulty);
    const problemIndex = user.generatedProblemsets[problemsetIndex].problems.findIndex(problem => problem.problemId === problemId);

    user.generatedProblemsets[problemsetIndex].problems[problemIndex].problemSaved = true;

    await User.updateOne({ handle: userHandle }, { generatedProblemsets: user.generatedProblemsets, savedProblemset: user.savedProblemset }, (err, obj) => {
        if (err)
            console.log(err);
    }).clone();
}

async function removeProblemFromSaved(userHandle, problemId, problemDifficulty) {
    const user = await getUser(userHandle);
    const problemIndex = user.savedProblemset.findIndex((problem) => problem.problemId === problemId);
    user.savedProblemset.splice(problemIndex, 1);

    const problemsetIndex = user.generatedProblemsets.findIndex(problemset => problemset.difficulty == problemDifficulty);
    const generatedProblemIndex = user.generatedProblemsets[problemsetIndex].problems.findIndex(problem => problem.problemId === problemId);

    user.generatedProblemsets[problemsetIndex].problems[generatedProblemIndex].problemSaved = false;

    await User.updateOne({ handle: userHandle }, { generatedProblemsets: user.generatedProblemsets, savedProblemset: user.savedProblemset }, (err, obj) => {
        if (err)
            console.log(err);
    }).clone();
}

module.exports = { authenticate, addProblemset, getProblemset, getSavedProblemset, startConnection, addProblemToSaved, removeProblemFromSaved };