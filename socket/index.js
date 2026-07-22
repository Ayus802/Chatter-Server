const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { EVENTS } = require('../const/constants');
const { connectionHandler } = require('./handlers/connection.handler');
const { socketAuthMiddleware } = require('./middleware/auth.socket');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: "*", // update with frontend origin for production
        methods: ["GET", "POST"]
    }
})
io.use(socketAuthMiddleware);

io.on(EVENTS.CONNECTION, (socket) => {
    
    socket.join(socket.user.id);
    io.emit(EVENTS.USER_ONLINE, { userId: socket.user.id });
    connectionHandler(io,socket);
   
    socket.on(EVENTS.DISCONNECT, () => {
        console.log('A user disconnected:', socket.id);
        io.emit(EVENTS.USER_OFFLINE, { userId: socket.user.id });
    });
});

function getio(){
    return io
}

module.exports = {
    getio,
    server,
    app
}