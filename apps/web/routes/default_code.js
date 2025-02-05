const express = require('express');
const router = express.Router();
const defaultCodeController = require('../controllers/defaultCodeController');

router.route('/:id')
    .get(defaultCodeController.getDefaultCodeByProblem);

module.exports = router;