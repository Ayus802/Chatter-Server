const express = require('express');
const { io } = require('../socket/socket');

export const messageController = () => {
    const router = express.Router();

    // Example route to send a message
    router.post('/send', (req, res) => {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Emit the message to all connected clients
        io.emit('message', message);
        res.status(200).json({ success: true, message: 'Message sent' });
    });

    return router;
}