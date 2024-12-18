const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/me')
    .get(verifyJWT, userController.getCurrentUser)
    .put(verifyJWT, userController.updateCurrentUser);

    router.route('/:id')
    .get(userController.getUserById);

module.exports = router;