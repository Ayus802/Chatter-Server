const express = require('express');
const { io, userToSocketMap } = require('../socket/socket');

export const messageController = (req, res) => {
        const { message } = req.body;
        const { id } = req.params;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        
        // Emit the message to all connected clients
        io.to(userToSocketMap[id]).emit('message', message);
        res.status(200).json({ success: true, message: 'Message sent' });
}

export const getMessagesController = (req, res) => {
    // This is a placeholder for retrieving messages.
    // In a real application, you would fetch messages from a database.
    const messages = [
        { id: 1, text: 'Hello World' },
        { id: 2, text: 'Socket.io is awesome!' }
    ];

    res.status(200).json({ success: true, messages });
}