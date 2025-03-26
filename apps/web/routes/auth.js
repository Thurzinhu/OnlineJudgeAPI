const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/auth/authController");
const logoutController = require("../controllers/auth/logoutController");
const registerController = require("../controllers/auth/registerController");
const refreshTokenController = require("../controllers/auth/refreshTokenController");
const { checkUserData } = require("../middleware/verifyModelData/User");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and authorization
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The JWT access token
 *       400:
 *         description: Email and password are required
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
router.route("/login").post(authController.handleLogin);

/**
 * @swagger
 * /api/auth/login/google:
 *   get:
 *     summary: Initiate Google OAuth login
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to Google OAuth
 */
router.route("/login/google").get(passport.authenticate("google"));

/**
 * @swagger
 * /api/auth/oauth2/redirect/google:
 *   get:
 *     summary: Google OAuth callback endpoint
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User authenticated
 *       401:
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 *       500:
 *         description: Login error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 */
router.route("/oauth2/redirect/google").get(
    (req, res, next) => {
        passport.authenticate("google", (err, user, info) => {
            if (err || !user) {
                return res.status(401).json({ message: "Authentication failed", error: info });
            }
            req.login(user, (loginErr) => {
                if (loginErr) {
                    return res.status(500).json({ message: "Login error", error: loginErr });
                }
                return res.json({ message: "User authenticated" });
            });
        })(req, res, next);
    }
);

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       204:
 *         description: Successful logout, no content
 *       500:
 *         description: Internal server error
 */
router.route("/logout").get(
    (req, res, next) => {
        req.logout((err) => {
          if (err) {
            return next(err);
          }
          return next();
        });
    },
    logoutController.handleLogout
);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: The user's first name
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *             required:
 *               - nickname
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: nickname, email, and password are required
 *       409:
 *         description: Email already in use
 *       500:
 *         description: Internal server error
 */
router.route("/register").post(checkUserData, registerController.handleNewUser);

/**
 * @swagger
 * /api/auth/refreshToken:
 *   get:
 *     summary: Refresh the access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The new JWT access token
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.route("/refreshToken").get(refreshTokenController.handleRefreshToken);

/**
 * @swagger
 * /api/auth/status:
 *   get:
 *     summary: Check if the user is logged in
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User is logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 loggedIn:
 *                   type: boolean
 *                   description: Whether the user is logged in or not
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       description: The user's email
 *                     nickname:
 *                       type: string
 *                       description: The user's nickname
 *       401:
 *         description: User is not logged in
 *       500:
 *         description: Internal server error
 */
router.route("/status").get((req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({
            loggedIn: true,
            user: {
                ...req.user
            }
        });
    } else {
        return res.status(401).json({
            loggedIn: false,
            message: "User is not logged in"
        });
    }
});

module.exports = router;
