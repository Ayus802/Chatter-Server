/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const { getProfileByIdController, getProfileByUsernameController, updateProfileController, getProfileController } = require("../controller/user.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Profile APIs
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get current user's profile
 *     description: Returns the authenticated user's profile.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Profile fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */

router.get("/profile", authMiddleware, getProfileController);


/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Update current user's profile
 *     description: Updates the authenticated user's profile.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ayush Gupta
 *               bio:
 *                 type: string
 *                 example: Backend Developer
 *               profilePicture:
 *                 type: string
 *                 example: https://example.com/avatar.png
 *
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */

router.put("/profile", authMiddleware, updateProfileController);

/**
 * @swagger
 * /users/profile/{username}:
 *   get:
 *     summary: Get user profile by username
 *     description: Returns a user's public profile using their username.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         example: ayush
 *
 *     responses:
 *       200:
 *         description: User profile fetched successfully.
 *       404:
 *         description: User not found.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */

router.get("/profile/:username", authMiddleware, getProfileByUsernameController);

/**
 * @swagger
 * /users/profile/id/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     description: Returns a user's public profile using their unique ID.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 685fd6d99c8e48b8d9f729d1
 *
 *     responses:
 *       200:
 *         description: User profile fetched successfully.
 *       404:
 *         description: User not found.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
router.get("/profile/id/:id", authMiddleware, getProfileByIdController);


module.exports = {
    userRouter: router  
};