const express = require('express');
const app = express.Router();
const { authorize_user } = require("../middlewares/auth_user");
const User = require('../models/user');

const { new_user, create_user, update_user, login_user, fetch_user, fetch_account} 
    = require('../controllers/user_controller');

//route to access page to create new user
app.get('/user/new', new_user);
//route to create and validate new user
app.post('/user/create', create_user);
app.post('/user/login', login_user);

app.get('/user/:id', authorize_user, fetch_user);

//route to access page to edit user details
app.get('/account/:id', authorize_user, fetch_account);
//route to update details of existing user
app.put('/user/update/:id', authorize_user, update_user);

module.exports = app;