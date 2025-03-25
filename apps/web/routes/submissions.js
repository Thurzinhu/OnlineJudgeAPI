const express = require("express");
const router = express.Router();
const submissionsController = require("../controllers/submissionsController");
const verifyAuth = require("../middleware/verifyAuth");
const {
  checkSubmissionData,
} = require("../middleware/verifyModelData/Submission");

/**
 * @swagger
 * tags:
 *   name: Submissions
 *   description: API endpoints for managing submissions
 */

router.use(verifyAuth);

/**
 * @swagger
 * /api/submissions:
 *   post:
 *     summary: Create a new submission
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               problem:
 *                 type: string
 *                 description: The ID of the problem to which the submission is made
 *               code:
 *                 type: string
 *                 description: The code submitted by the user
 *               language:
 *                 type: string
 *                 description: The programming language of the submitted code
 *             required:
 *               - problem
 *               - code
 *               - language
 *     responses:
 *       201:
 *         description: Submission created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Submission'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *   get:
 *     summary: Get all submissions for the authenticated user
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Submission'
 *       204:
 *         description: No submissions found
 *       500:
 *         description: Internal server error
 */
router
  .route("/")
  .get(submissionsController.getAllSubmissions)
  .post(checkSubmissionData, submissionsController.createSubmission);

/**
 * @swagger
 * /api/submissions/{id}:
 *   get:
 *     summary: Get a submission by ID
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The submission ID
 *     responses:
 *       200:
 *         description: Submission data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Submission'
 *       204:
 *         description: No submission found with the given ID
 *       500:
 *         description: Internal server error
 */
router.route("/:id").get(submissionsController.getSubmissionById);

module.exports = router;
