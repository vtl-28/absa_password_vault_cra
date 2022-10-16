const User = require("../models/user");
const { validationResult } = require("express-validator");
const email_helper = require("../config/send_email");

module.exports = {
  //handler to retrieve user master password hint
  retrieve_password_hint: (req, res, next) => {
    debugger;
    let user_email = Object.keys(req.body).toString();
    User.findOne({ email: user_email })
      .then((user) => {
        !user ? res.status(404).send('User does not exist') : res
        .status(200)
        .send(`Your master password hint is ${user.master_password_hint}`);
      })  
      .catch((error) => {
        res.status(404).send("Failed to retrieve master password hint");
      });
  },
};
