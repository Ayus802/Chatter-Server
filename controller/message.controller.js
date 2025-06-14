const Message = require('../models/message.model');
const Conversation = require('../models/conversation.model');
const express = require('express');
const jwt = require('jsonwebtoken');
const { io, userToSocketMap } = require('../socket/socket');
const { verifyToken } = require('../utils/tokenHandler');

const sendMessageController = async(req, res) => {
        const { message } = req.body;
        const { id } = req.params;
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const verifyToken = verifyToken(token);
        console.log(verifyToken);
        if (!verifyToken) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const messageDb = await Message.create({ message });    
        await Conversation.findOneAndUpdate(
            { senderId: userId, receiverId: id },
            { $push: { messages: messageDb._id } },
            { new: true, upsert: true }
        );
        
        if (userToSocketMap.has(id)) {
            io.to(userToSocketMap[id]).emit('message', message);
        }
        res.status(200).json({ success: true, message: 'Message sent' });
}

const getMessagesController = async(req, res) => {
    if (!req.query.id) {
        return res.status(400).json({ error: 'User ID is required' });
    }  
    // Here, you would typically fetch messages from the database
    const conversation = await Conversation.findOne({
        senderId: req.user._id,
        receiverId: req.query.id
    }).populate('messages');    
    if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
    }
    const messages = conversation.messages.map(msg => ({
        id: msg._id,
        text: msg.message,
        createdAt: msg.createdAt
    }));

    res.status(200).json({ success: true, messages });
}

module.exports = {
    sendMessageController,
    getMessagesController
};