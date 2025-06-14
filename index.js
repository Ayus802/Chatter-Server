const express = require('express');
const { app, server } = require('./socket/socket');
const { messageRouter } = require('./router/message');
const connectDB = require('./db/db');
const { authRouter } = require('./router/auth');

app.use(express.json());

app.use("/api/v1/message", messageRouter );
app.use("api/v1/auth", authRouter)
// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    connectDB()
    console.log(`Server listening on http://localhost:${PORT}`);
});