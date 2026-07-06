const express = require('express')
const { authMiddleware } = require('../middleware/auth.middleware')
const { createConversationController, getConversationsController, getConversationByIdController } = require('../controller/conversation.contoller')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Conversations
 *   description: Conversation management APIs
 */

/**
 * @swagger
 * /conversations:
 *   post:
 *     summary: Create a new conversation
 *     description: Creates a new direct or group conversation.
 *     tags: [Conversations]
 *     security:
 *       - BearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - participants
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [DIRECT, GROUP]
 *                 example: DIRECT
 *               name:
 *                 type: string
 *                 nullable: true
 *                 example: Backend Team
 *               participant_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "6a3446e638a2e47f60312cbd"
 *
 *     responses:
 *       201:
 *         description: Conversation created successfully.
 *
 *       400:
 *         description: Validation failed.
 *
 *       401:
 *         description: Unauthorized.
 *
 *       404:
 *         description: Participant not found.
 *
 *       409:
 *         description: Conversation already exists.
 *
 *       500:
 *         description: Internal server error.
 */

router.post('/', authMiddleware, createConversationController)

/**
 * @swagger
 * /conversations:
 *   get:
 *     summary: Get all conversations
 *     description: Returns all conversations of the authenticated user.
 *     tags: [Conversations]
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *
 *     responses:
 *       200:
 *         description: Conversations fetched successfully.
 *
 *       401:
 *         description: Unauthorized.
 *
 *       500:
 *         description: Internal server error.
 */

router.get('/', authMiddleware, getConversationsController)

/**
 * @swagger
 * /conversations/{conversationId}:
 *   get:
 *     summary: Get conversation by ID
 *     description: Returns a conversation along with all its participants.
 *     tags: [Conversations]
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *         example: 685fd6d99c8e48b8d9f729d1
 *
 *     responses:
 *       200:
 *         description: Conversation fetched successfully.
 *
 *       400:
 *         description: Invalid conversation ID.
 *
 *       401:
 *         description: Unauthorized.
 *
 *       403:
 *         description: You are not a participant of this conversation.
 *
 *       404:
 *         description: Conversation not found.
 *
 *       500:
 *         description: Internal server error.
 */

router.get('/:conversationId', authMiddleware, getConversationByIdController)

module.exports = {
    conversationRouter: router
}