const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Express route example
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// Socket.io connection
const userToSocketMap = new Map(); // Map to track user IDs to socket IDs
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    const userId = socket.handshake.query.userId; // Assuming user ID is sent in the query string
    if (userId) {
        userToSocketMap.set(userId, socket.id); // Map user ID to socket ID
        console.log(`User ${userId} connected with socket ID ${socket.id}`);
    }
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

 
module.exports = {
    app,
    server,
    io,
    userToSocketMap
};