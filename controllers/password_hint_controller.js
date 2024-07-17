const User = require("../models/user");

module.exports = {
  //handler to retrieve user master password hint
  retrieve_password_hint: async (req, res, next) => {
    const { email }  = req.body;

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

  },
};
