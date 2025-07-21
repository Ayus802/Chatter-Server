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
var userToSocketMap = new Map(); // Map to track user IDs to socket IDs
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    const userId = socket.handshake.query.userId; // Assuming user ID is sent in the query string
    if (!userId) {
        console.error('User ID is required for socket connection');
        socket.disconnect(); // Disconnect if user ID is not provided
        return;
    }


    let senderSocket = null;
    let receiverSocket =null;

    socket.on('message', (msg) => {
        const message = JSON.parse(msg);
        if (message.type === 'sender'){
            senderSocket = socket.id;
        } else if (message.type === 'receiver'){
            receiverSocket = socket.id;
        } else if (message.type === "createOffer"){
            if (socket.id !== senderSocket) return;
            socket.to(receiverSocket).emit({type: 'createOffer', sdp : message.sdp});
        } else if (message.type === "createAnswer") {
            
        }

    })
    userToSocketMap.set(userId, socket.id); // Map user ID to socket ID
    console.log(`User ${userId} connected with socket ID ${socket.id}`);
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