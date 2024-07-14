const User = require("../models/user");
const generate_token = require("../config/generate_token");

module.exports = {
  //handler to access page to register user
  new_user: (req, res) => {
    res.render("register", {
      error: req.flash("error"),
      validation_errors: req.flash("validation_errors"),
    });
  },
  //handler to create and register a new user
  create_user: async (req, res, next) => {
    console.log(req.body)
    const { email, name, password, master_password_hint } = req.body;
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (!name || !email || !password) {
      res.status(400).send("Please enter all the fields");
      return;
    }

    const user_exists = await User.findOne({ email });
  
    if (user_exists) {
      res.status(400).send("User already exists");
      return;
    }

    if (!emailRegex.test(email)) {
      res.status(400).send("Invalid email");
      return;
    }

    try {
      const user = await User.create({
        name,
        email,
        password,
        master_password_hint
      });

      if (user) {
        console.log(user)
        const token = generate_token(user._id);
        user.token = token;
        res.status(201).send(user);
      } else {
        res.status(400).send("Could not register user");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
  fetch_user: (req, res, next) => {
    debugger;
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
    ///console.log(req.body)

    if (!email || !master_password) {
        return res.status(400).send("Please enter all the fields");
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("User does not exist");
        }

        const isMatch = await user.matchPassword(master_password);
        if (!isMatch) {
            return res.status(401).send("Invalid Email or Password");
        }

        const token = generate_token(user._id);
        user.token = token;
        console.log(user);

        res.status(201).send(user);
    } catch (error) {
        console.error(error); // Log error for debugging
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
    console.log(updated_user)
    res.status(200).send(updated_user);
  } catch (error) {
    res.status(404).send(error);
  }
}
};
