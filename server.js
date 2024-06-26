/*
sample check

const express = require('express');
const path = require('path');
const session = require('express-session');
const db = require('./client/src/util/dbInterface');
const User = require('./models/user'); // Import your User model

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(
  session({
    secret: 'yourSecretKey', // Replace with a secure secret key
    resave: false,
    saveUninitialized: false,
  })
);

function setRoutes() {
  app.get('/', (req, res) => {
    req.session.curPage = 'home';
    req.session.lastPageRequest = 'home';
    res.sendFile(path.join(__dirname, 'client/build', 'main.html'));
  });

  app.get('/problemset/saved', (req, res) => {
    req.session.curPage = 'saved';
    req.session.lastPageRequest = 'saved';
    if (!req.session.userHandle) {
      res.redirect('/login');
    } else {
      res.sendFile(path.join(__dirname, 'client/build', 'main.html'));
    }
  });

  app.get('/problemset/:difficulty', (req, res) => {
    req.session.curPage = 'difficulty' + req.params.difficulty;
    req.session.lastPageRequest = 'difficulty' + req.params.difficulty;
    req.session.curDifficulty = parseInt(req.params.difficulty);
    if (!req.session.userHandle) {
      res.redirect('/login');
    } else {
      res.sendFile(path.join(__dirname, 'client/build', 'main.html'));
    }
  });

  app.get('/login', (req, res) => {
    req.session.curPage = 'login';
    res.sendFile(path.join(__dirname, 'client/build', 'main.html'));
  });

  app.get('/get-current-session', (req, res) => {
    res.send({
      curPage: req.session.curPage,
      curDifficulty: req.session.curDifficulty,
      userHandle: req.session.userHandle,
      lastPageRequest: req.session.lastPageRequest,
    });
  });

  app.post('/submit-login-form', async (req, res) => {
    if (await db.authenticate(req.body.handle, req.body.password)) {
      req.session.userHandle = req.body.handle;
      if (req.session.lastPageRequest === 'saved') {
        res.redirect('/problemset/saved');
      } else if (req.session.lastPageRequest.startsWith('difficulty')) {
        res.redirect(`/problemset/${req.session.curDifficulty}`);
      } else {
        res.redirect('/');
      }
    } else {
      res.redirect('/login');
    }
  });

  app.post('/add-user', async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send(user);
  });

  app.get('/get-users', async (req, res) => {
    const users = await User.find();
    res.status(200).send(users);
  });

  app.get('*', (req, res) => {
    res.redirect('/');
  });
}

db.startConnection().then(() => {
  setRoutes();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
*/

const express = require("express");
const path = require("path");
const db = require("./client/src/util/dbInterface");
const session = require('./client/src/util/session');
const probRetriever = require('./client/src/util/problemRetriever');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

function setRoutes() {
    app.get('/', (req, res) => {
        session.curPage = "home";
        session.lastPageRequest = "home";
        res.sendFile(path.join(__dirname, 'client/build', 'main.html'));
    });

    app.get('/problemset/saved', (req, res) => {
        session.curPage = "saved";
        session.lastPageRequest = "saved";
        if (session.userHandle === "UNKNOWN_USER")
            res.redirect("/login");
        else {
            res.sendFile(path.join(__dirname, 'client/build', 'main.html'));
        }
    });
    
    app.get('/problemset/:difficulty', (req, res) => {
        session.curPage = "difficulty" + req.params.difficulty;
        session.lastPageRequest = "difficulty" + req.params.difficulty;
        session.curDifficulty = parseInt(req.params.difficulty);
        if (session.userHandle === "UNKNOWN_USER")
            res.redirect("/login");
        else {
            // await probRetriever.generateProblemset(session.userHandle, session.curDifficulty);
            res.sendFile(path.join(__dirname, 'client/build', 'main.html'));
        }
    });
    
    app.get('/login', (req, res) => {
        session.curPage = "login";
        res.sendFile(path.join(__dirname, 'client/build', 'main.html'));
    });
    
    app.get('/get-current-session', (req, res) => {
        res.send({ 
            curPage: session.curPage, 
            curDifficulty: session.curDifficulty, 
            userHandle: session.userHandle, 
            lastPageRequest: session.lastPageRequest,
        });
    });
    
    app.get('/submit-login-form?*', async (req, res) => {
        if (await db.authenticate(req.query.handle, req.query.password)) {
            session.userHandle = req.query.handle;
            if (session.lastPageRequest === "saved") {
                res.redirect('/problemset/saved');
            }
            else if (session.lastPageRequest.startsWith("difficulty")) {
                res.redirect(`/problemset/${session.curDifficulty}`);
            }
            
            else {
                console.log(session.lastPageRequest);
            }
        }
        else {
            res.redirect('/login');
        }
    });

    app.get('/get-problemset/:userHandle/:problemsetName', async (req, res) => {
        // res.send(db.getProblemset(req.params.userHandle, req.params.difficulty));
        res.send(await probRetriever.getProblems(req.params.userHandle, req.params.problemsetName === "saved", parseInt(req.params.problemsetName)));
    });

    app.get('/add-problem-to-saved/:userHandle/:problemId/:problemName/:problemDifficulty', (req, res) => {
        db.addProblemToSaved(req.params.userHandle, req.params.problemId, req.params.problemName, req.params.problemDifficulty);
    });

    app.get('/remove-problem-from-saved/:userHandle/:problemId/:problemName/:problemDifficulty', (req, res) => {
        db.removeProblemFromSaved(req.params.userHandle, req.params.problemId, req.params.problemDifficulty);
    });
    
    app.get('*', (req, res) => {
        res.redirect("/");
    });
}

db.startConnection().then(() => {
    setRoutes();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server listening on port ${port}');
}); 