const express = require('express');
const router = express.Router();
const problemsController = require('../controllers/problemsController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/')
    .get(problemsController.getAllProblems)
    .post(verifyJWT, problemsController.createProblem);

router.route('/:id')
    .get(problemsController.getProblemById)
    .put(verifyJWT, problemsController.updateProblem)
    .delete(verifyJWT, problemsController.deleteProblem);

module.exports = router;