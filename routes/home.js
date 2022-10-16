const express = require('express');
const app = express.Router();
const passport = require('passport');

const { logout } = require('../controllers/home_controller');

//require and let server know of passport strategy 
require('../config/passport');
app.use(passport.initialize());
app.use(passport.session());

//route to access home page
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) throw err;
        if(!user) res.status(404).send("User does not exist");
        else {
            req.logIn(user, (err) => {
              if (err) throw err;
              res.status(200).send(req.user);
              console.log(req.user);
              console.log(req.session);
              next();
            });
          }
    })(req, res, next)
});

//route to logout authenticated user
app.post('/logout', logout);

module.exports = app;