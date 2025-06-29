const express = require('express');
const { app, server } = require('./socket/socket');
const { messageRouter } = require('./router/message');
const connectDB = require('./db/db');
const { authRouter } = require('./router/auth');
const cors = require('cors');
const { userRouter } = require('./router/user');
require('dotenv').config()

app.use(express.json());
app.use(cors())

app.use("/api/v1/message", messageRouter );
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter);
// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    connectDB()
    console.log(`Server listening on http://localhost:${PORT}`);
});