const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/authController');
const logoutController = require('../controllers/auth/logoutController');
const registerController = require('../controllers/auth/registerController');
const refreshTokenController = require('../controllers/auth/refreshTokenController');

router.route('/login')
    .post(authController.handleLogin);

router.route('/logout')
    .get(logoutController.handleLogout);

router.route('/register')
    .post(registerController.handleNewUser);

router.route('/refreshToken')
    .get(refreshTokenController.handleRefreshToken);

module.exports = router;