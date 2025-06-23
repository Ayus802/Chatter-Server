const express = require('express');
const { app } = require('../socket/socket');
const { sendMessageController, getMessagesController } = require('../controller/message.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();
console.log("Message router initialized");
router.post("/:id", authMiddleware, sendMessageController);
router.get("/:id", authMiddleware, getMessagesController);

module.exports = {
    messageRouter: router
};