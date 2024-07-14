const express = require('express');
const app = express.Router();
const User = require('../models/user');
const { authorize_user } = require("../middlewares/auth_user");

const { retrieve_password_hint } = require('../controllers/password_hint_controller');

//route to retrieve user master password hint
app.post('/password_hint', authorize_user, retrieve_password_hint);

 module.exports = app;
