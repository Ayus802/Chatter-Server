const Message = require('../models/message.model');
const Conversation = require('../models/conversation.model');
const express = require('express');
const jwt = require('jsonwebtoken');
const { io, userToSocketMap } = require('../socket/socket');
const { verifyToken } = require('../utils/tokenHandler');

const sendMessageController = async(req, res) => {
        const { message } = req.body;
        const { id } = req.params;
        const sender = req.info;
        console.log("Sender info:", sender);
        
        if (!message) { 
            return res.status(400).json({ error: 'Message is required' });
        }
        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const messageDb = await Message.create({ message });    
        await Conversation.findOneAndUpdate(
            { senderId: sender.id, receiverId: id },
            { $push: { messages: messageDb._id } },
            { new: true, upsert: true } 
        );
          
        if (userToSocketMap.has(id)) {
            io.emit('message', message);
        }
        res.status(200).json({ success: true, message: 'Message sent' });
}

const getMessagesController = async(req, res) => {

    const sender = req.info;
    const {id : receiverId} = req.params;

    if (!receiverId) {
        return res.status(400).json({ error: 'User ID is required' });
    }  
    // Here, you would typically fetch messages from the database
    const messagesSend = await Conversation.findOne({
        senderId: sender.id,
        receiverId
    }).populate('messages');    
    const messagesReceived = await Conversation.findOne({
        senderId: receiverId,
        receiverId: sender.id
    }).populate('messages');
    // if (!messagesSend && !messagesReceived) {
    //     return res.status(404).json({ error: 'Conversation not found' });
    // }
    console.log("Messages sent:", messagesSend);
    console.log("Messages received:", messagesReceived);

    res.status(200).json({ success: true, messagesSend, messagesReceived });
}

module.exports = {
    sendMessageController,
    getMessagesController
};