const express = require("express");
const router = express.Router();
const defaultCodeController = require("../controllers/defaultCodeController");

/**
 * @swagger
 * tags:
 *   name: DefaultCode
 *   description: Default code management
 */

/**
 * @swagger
 * /api/default_code/{id}:
 *   get:
 *     summary: Get default code by problem ID
 *     tags: [DefaultCode]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The problem ID
 *     responses:
 *       200:
 *         description: Successful retrieval of default code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DefaultCode'
 *       404:
 *         description: No problem matches the provided ID
 *       500:
 *         description: Internal server error
 */
router.route("/:id").get(defaultCodeController.getDefaultCodeByProblem);

module.exports = router;
