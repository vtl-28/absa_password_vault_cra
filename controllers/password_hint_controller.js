const User = require("../models/user");
const email_helper = require("../config/send_email");

module.exports = {
  //handler to retrieve user master password hint
  retrieve_password_hint: async (req, res, next) => {
    const { email } = req.body;
    console.log(req.body);

    try {
      const user = await User.findOne({ email });

    if (!user) {
      res.status(404).send('User does not exist');
      return;
    }

    if (!user.master_password_hint || user.master_password_hint === "") {
      res.status(404).send('No master password hint found!');
      return;
    }

    res.status(200).send(user.master_password_hint);
    } catch (error) {
      res.status(404).send(`Failed to retrieve master password hint: ${error}`);
    }

    // let user_email = Object.keys(req.body).toString();
    // User.findOne({ email: user_email })
    //   .then((user) => {
    //     !user ? res.status(404).send('User does not exist') : res
    //     .status(200)
    //     .send(`Your master password hint is ${user.master_password_hint}`);
    //   })  
    //   .catch((error) => {
    //     res.status(404).send("Failed to retrieve master password hint");
    //   });
  },
};
