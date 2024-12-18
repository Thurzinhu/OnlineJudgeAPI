const express = require('express');
const router = express.Router();
const submissionsController = require('../controllers/submissionsController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.route('/')
    .post(submissionsController.createSubmission)
    .get(submissionsController.getAllSubmissions);

router.route('/:id')
    .get(submissionsController.getSubmissionById);

module.exports = router;