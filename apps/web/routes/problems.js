const express = require("express");
const router = express.Router();
const problemsController = require("../controllers/problemsController");
const verifyAuth = require("../middleware/verifyAuth");
const { checkProblemData } = require("../middleware/verifyModelData/Problem");
const {
  checkTestCaseFiles,
} = require("../middleware/verifyModelData/TestCase");
const { uploadTestCaseFiles } = require("../middleware/uploadFiles");

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
router
  .route("/")
  .get(problemsController.getAllProblems)
  .post(
    verifyAuth,
    uploadTestCaseFiles,
    checkTestCaseFiles,
    checkProblemData,
    problemsController.createProblem,
  );

/**
 * @swagger
 * /api/problems/{slug}:
 *   get:
 *     summary: Get problem by Slug
 *     tags: [Problems]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: The problem Slug
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
 *     summary: Update problem by Slug
 *     tags: [Problems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: The problem Slug
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
 *     summary: Delete problem by Slug
 *     tags: [Problems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: The problem Slug
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
router
  .route("/:slug")
  .get(problemsController.getProblemBySlug)
  .delete(verifyAuth, problemsController.deleteProblem)
  .put(verifyAuth, uploadTestCaseFiles, problemsController.updateProblem);

module.exports = router;
