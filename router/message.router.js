const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');
const { editMessageController } = require('../controller/messages.controller/editMessage');
const { deleteMessageController } = require('../controller/messages.controller/deleteMessage');
const { sendMessageController } = require('../controller/messages.controller/sendMessage');
const { getMessageController } = require('../controller/messages.controller/getMessage');


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message management APIs
 */

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Send a message
 *     description: Sends a new message to a conversation.
 *     tags: [Messages]
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
 *               - conversationId
 *               - content
 *               - type
 *             properties:
 *               conversationId:
 *                 type: string
 *                 example: 685fd6d99c8e48b8d9f729d1
 *
 *               content:
 *                 type: string
 *                 example: Hello Rahul!
 *
 *               type:
 *                 type: string
 *                 enum:
 *                   - TEXT
 *                   - IMAGE
 *                   - VIDEO
 *                   - FILE
 *                   - AUDIO
 *                 example: TEXT
 *
 *               replyToMessageId:
 *                 type: string
 *                 nullable: true
 *                 example: 685fd6d99c8e48b8d9f72000
 *
 *     responses:
 *       201:
 *         description: Message sent successfully.
 *
 *       400:
 *         description: Validation failed.
 *
 *       401:
 *         description: Unauthorized.
 *
 *       403:
 *         description: User is not a participant.
 *
 *       404:
 *         description: Conversation not found.
 *
 *       500:
 *         description: Internal server error.
 */

router.post("/", authMiddleware, sendMessageController);

/**
 * @swagger
 * /messages/{conversationId}:
 *   get:
 *     summary: Get conversation messages
 *     description: Returns paginated messages of a conversation.
 *     tags: [Messages]
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
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *         description: Cursor for pagination.
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *
 *     responses:
 *       200:
 *         description: Messages fetched successfully.
 *
 *       401:
 *         description: Unauthorized.
 *
 *       403:
 *         description: Access denied.
 *
 *       404:
 *         description: Conversation not found.
 *
 *       500:
 *         description: Internal server error.
 */

router.get("/:conversationId", authMiddleware, getMessageController);

/**
 * @swagger
 * /messages/{messageId}:
 *   put:
 *     summary: Edit a message
 *     description: Edit an existing message.
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         example: 685fd6d99c8e48b8d9f729d1
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - conversationId
 *               - newContent
 *              
 *             properties:
 *              conversationId:
 *                type: string
 *                example: 685fd6d99c8e48b8d9f729d1
 *              newContent:
 *                 type: string
 *                 example: Updated message
 *
 *     responses:
 *       200:
 *         description: Message updated successfully.
 *
 *       400:
 *         description: Validation failed.
 *
 *       401:
 *         description: Unauthorized.
 *
 *       403:
 *         description: Only sender can edit message.
 *
 *       404:
 *         description: Message not found.
 *
 *       500:
 *         description: Internal server error.
 */

router.put("/:messageId", authMiddleware, editMessageController);

/**
 * @swagger
 * /messages/{messageId}:
 *   delete:
 *     summary: Delete a message
 *     description: Soft deletes a message.
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         example: 685fd6d99c8e48b8d9f729d1
 *
 *     responses:
 *       200:
 *         description: Message deleted successfully.
 *
 *       401:
 *         description: Unauthorized.
 *
 *       403:
 *         description: Only sender can delete message.
 *
 *       404:
 *         description: Message not found.
 *
 *       500:
 *         description: Internal server error.
 */

router.delete("/:messageId", authMiddleware, deleteMessageController);


module.exports = {
    messageRouter: router
};