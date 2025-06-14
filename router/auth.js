const express = require('express');
const { loginController, registrationController } = require('../controller/auth.controller');

const router = express.Router();

router.post('/login', loginController)
router.post('/register', registrationController)

module.exports = {
    authRouter: router
};