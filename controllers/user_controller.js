const User = require("../models/user");
const generate_token = require("../config/generate_token");

module.exports = {
  //handler to create and register a new user
  create_user: async (req, res, next) => {
    const { email, name, master_password, confirm_master_password, master_password_hint } = req.body;
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    const user_exists = await User.findOne({ email });
  
    if (user_exists) {
      res.status(400).send("User already exists");
      return;
    }

    if (!emailRegex.test(email)) {
      res.status(400).send("Invalid email");
      return;
    }

    if (master_password !== confirm_master_password) {
      res.status(400).send("Passwords do not match");
      return;
    }

    try {
      const user = await User.create({
        name,
        email,
        password: master_password,
        master_password_hint
      });

      if (user) {
        const token = generate_token(user._id);
        user.token = token;
        res.status(201).send("User account created");
      } else {
        res.status(400).send("Could not register user");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
  fetch_user: (req, res, next) => {
    let user_id = {
      _id: req.params.id,
    };
    User.findOne(user_id)
      .then((user) => {
        res.status(201).send(user);
        console.log(`user is ${user}`);
      })
      .catch((error) => {
        res.status(404).send(`${error.message}`);
      });
  },
  login_user: async (req, res, next) => {
    const { email, master_password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).send("User does not exist");
            return;
        }

        const isMatch = await user.matchPassword(master_password);
        if (!isMatch) {
            res.status(401).send("Invalid Email or Password");
            
        }

        const token = generate_token(user._id);
        user.token = token;

        res.status(201).send(user);
    } catch (error) {
        res.status(500).send("Server Error");
    }
  },
  //handler to access page to update details of user
  fetch_account: (req, res, next) => {
    let user_id = {
      _id: req.params.id,
    };
    User.findById(user_id)
      .then((user) => {
        console.log(user);
        res.status(200).send(user);
      })
      .catch((error) => {
        res.status(404).send(`Error fetching user by ID: ${error.message}`);
      });
  },
  //handler to update details of user
  update_user: async (req, res, next) => {
    const user_id = req.params.id;

    const { email, name, master_password_hint } = req.body;

    if (!name && !email || !master_password_hint) {
      res.status(404).send("Please fill in the form to update your profile");
      return;
    }

    const user = await User.findOne({ email });
  if (user !== null) {
    res.status(404).send("User with this email already exists");
    return;
  }

  const user_params = {
    name,
    email,
    master_password_hint
  }
  Object.keys(user_params).forEach((detail) => {
    if (user_params[detail] === "") {
      delete user_params[detail];
    }
  });

  try {
    const updated_user = await User.findByIdAndUpdate(user_id, {
      $set: user_params,
    });
    res.status(201).send("Account info updated successfully");
  } catch (error) {
    res.status(404).send(error);
  }
}
};
