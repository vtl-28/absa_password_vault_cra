const Password = require("../models/password");
const User = require("../models/user");
const mongoose = require('mongoose')
const { encrypt, decrypt } = require("../lib/password_utils");

module.exports = {
  //handler to create and store user application password
  create: async (req, res, next) => {
    const encrypted_data = encrypt(req.body.application_password);

    let password_params = {
      department: req.body.department,
      application_name: req.body.application_name,
      username: req.body.username,
      application_password: encrypted_data,
      created_by: req.user._id,
    };

    try {
      const password = await (
        await Password.create(password_params)
      ).populate("created_by", "_id email name master_password_hint");
      res.status(201).send(password);
    } catch (error) {
      res.status(404).send(`Error saving password: ${error.message}`);
    }
  },
  show_app_password: async (req, res, next) => {
    const { department, created_by } = req.query;

  if (!department) {
    return res.status(400).send("Department parameter is required");
  }
    try {
      const query = { department };
  
      if (created_by) {
        query.created_by = mongoose.Types.ObjectId(created_by);
      }
  
      const passwords = await Password.find(query).populate('created_by', 'name email'); 
      res.status(200).send(passwords);
    } catch (error) {
      console.error(error);
      res.status(404).send(`Error retrieving last inserted application password: ${error.message}`);
    }

  },
  decrypt_app_password: async (req, res, next) => {
    const application_id = req.params.application_password;

    try {
      const application = await Password.findOne({_id: application_id});

      if (!application) {
        res.status(404).send("Application does not exist");
        return;
      }

      const { application_password } = application;

      const decrypted_password = decrypt(application_password);
      res.status(201).send(decrypted_password);
    } catch (error) {
      res.status(404).send(`Error fetching and decrypting password: ${error.message}`);
      return;
    }

},
  delete_password: async (req, res, next) => {
    const application_id = req.params.id;

    Password.findByIdAndRemove({ _id: application_id})
      .then((data) => {
        res.json({
          message: "Application password deleted successfully",
          data,
        });
      })
      .catch((error) => {
        res
          .status(404)
          .send(`Application password delete failed: ${error.message}`);
      });
  },
};
