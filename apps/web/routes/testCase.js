const express = require("express");
const router = express.Router();
const testCaseController = require('../controllers/testCaseController');

/**
 * @swagger
 * tags:
 *   name: TestCase
 *   description: Test case management
 */

/**
 * @swagger
 * /api/test_case/{id}:
 *   get:
 *     summary: Get test case by ID
 *     tags: [TestCase]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The test case ID
 *     responses:
 *       200:
 *         description: Successful retrieval of test case
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 submission:
 *                   type: string
 *                   description: The submission ID
 *                 status:
 *                   type: string
 *                   description: The status of the test case
 *                 time:
 *                   type: number
 *                   description: The time taken by the test case
 *                 memory:
 *                   type: number
 *                   description: The memory used by the test case
 *                 judge0TrackingId:
 *                   type: string
 *                   description: The Judge0 tracking ID
 *       204:
 *         description: No test case found
 *       500:
 *         description: Internal server error
 */
router.route("/:id").get(testCaseController.getTestCaseById);

/**
 * @swagger
 * /api/test_case/submission/{id}:
 *   get:
 *     summary: Get all test cases by submission ID
 *     tags: [TestCase]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The submission ID
 *     responses:
 *       200:
 *         description: Successful retrieval of test cases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   submission:
 *                     type: string
 *                     description: The submission ID
 *                   status:
 *                     type: string
 *                     description: The status of the test case
 *                   time:
 *                     type: number
 *                     description: The time taken by the test case
 *                   memory:
 *                     type: number
 *                     description: The memory used by the test case
 *                   judge0TrackingId:
 *                     type: string
 *                     description: The Judge0 tracking ID
 *       500:
 *         description: Internal server error
 */
router.route("/submission/:id").get(testCaseController.getAllTestCasesBySubmission);

module.exports = router;