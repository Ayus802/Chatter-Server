
const express = require('express');
const { loginController, registrationController, refreshTokenController } = require('../controller/auth.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication APIs
 */


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates a user and returns an access token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: ayush123
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password@123
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Internal server error.
 */

router.post('/login', loginController)

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - username
 *               - password
 *               - confirmPassword
 *
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ayush Gupta
 *
 *               username:
 *                 type: string
 *                 example: ayush123
 *
 *               password:
 *                 type: string
 *                 example: Password@123
 * 
 *               confirmPassword:
 *                 type: string
 *                 example: Password@123
 *
 *     responses:
 *       201:
 *         description: User registered successfully.
 *
 *       400:
 *         description: Validation failed.
 *
 *       409:
 *         description: User already exists.
 */
router.post('/register', registrationController)

/**
 * @swagger
 * /auth/refresh-token:
 *  get:
 *    summary: Refresh access token
 *    description: Refreshes the access token using a valid refresh token.
 *    tags: [Authentication]
 *    responses:
 *      200:
 *        description: Access token refreshed successfully.
 *      401:
 *        description: Invalid or expired refresh token.
 *      500:
 *        description: Internal server error.
 */
router.get('/refresh-token', refreshTokenController)

module.exports = {
    authRouter: router
};