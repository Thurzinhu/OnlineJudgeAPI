const express = require('express');
const router = express.Router();
const problemsController = require('../controllers/problemsController');
const verifyJWT = require('../middleware/verifyJWT');
const { uploadInputAndSolutionFiles } = require('../middleware/uploadFiles');
const MAX_INPUT_FILES_COUNT = 40;

/**
 * @swagger
 * tags:
 *   name: Problems
 *   description: Problem management and retrieval
 */

/**
 * @swagger
 * /api/problems:
 *   get:
 *     summary: Get all problems
 *     tags: [Problems]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Problem'
 *       204:
 *         description: No problems found
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new problem
 *     tags: [Problems]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Problem'
 *     responses:
 *       201:
 *         description: Problem created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Problem'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.route('/')
    .get(problemsController.getAllProblems)
    .post(
        verifyJWT,
        uploadInputAndSolutionFiles,
        problemsController.createProblem
    );

/**
 * @swagger
 * /api/problems/{id}:
 *   get:
 *     summary: Get problem by ID
 *     tags: [Problems]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The problem ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Problem'
 *       404:
 *         description: Problem not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update problem by ID
 *     tags: [Problems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The problem ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Problem'
 *     responses:
 *       200:
 *         description: Problem updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Problem'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Problem not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete problem by ID
 *     tags: [Problems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The problem ID
 *     responses:
 *       204:
 *         description: Problem deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Problem not found
 *       500:
 *         description: Internal server error
 */
router.route('/:id')
    .get(problemsController.getProblemById)
    .delete(verifyJWT, problemsController.deleteProblem)
    .post(
        verifyJWT,
        uploadInputAndSolutionFiles,
        problemsController.updateProblem
    );;

module.exports = router;