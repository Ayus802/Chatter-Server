const express = require('express');
const { app, server } = require('./socket/socket');
const { messageRouter } = require('./router/message');
const connectDB = require('./db/db');

app.use(express.json());

app.use("/api/v1/message", messageRouter );
// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    connectDB()
    console.log(`Server listening on http://localhost:${PORT}`);
});