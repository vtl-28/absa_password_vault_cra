const express = require('express');
const app = express.Router();
const { authorize_user } = require("../middlewares/auth_user");
const { create, decrypt_app_password, show_app_password, delete_password } = require('../controllers/password_controller');

//route to create and store an application password for user
app.post('/create_password', authorize_user, create);
app.get('/find_password', authorize_user, show_app_password);
app.get('/decrypt_password/:application_password', authorize_user, decrypt_app_password);
app.delete("/delete_password/:id", authorize_user, delete_password);

module.exports = app;