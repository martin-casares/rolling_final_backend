const express = require('express');

const { register, login } = require('../controllers/authControllers');
const { validateRegister, validateLogin } = require('../helpers/authCheck');

const routerAuth = express.Router();

routerAuth.post('/register', validateRegister, register);

routerAuth.post('/login', validateLogin, login);

module.exports = routerAuth;
