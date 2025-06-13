const express = require('express');
const { app } = require('../socket/socket');
const { sendMessageController, getMessagesController } = require('../controller/message.controller');

const router = express.Router();

router.post("/:id", sendMessageController);
router.get("/", getMessagesController);

module.exports = {
    messageRouter: router
};