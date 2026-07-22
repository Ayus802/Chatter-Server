const express = require('express');
// const { server } = require('./socket/socket');
const { messageRouter } = require('./router/message.router');
const connectDB = require('./db/db');
const { authRouter } = require('./router/auth.router');
const cors = require('cors');
const { userRouter } = require('./router/user.router');
const { conversationRouter } = require('./router/conversation.router');
require('dotenv').config()
const { swaggerUi, swaggerSpec } = require("./config/swagger");
const cookieParser = require('cookie-parser');
const { app, server } = require('./socket');




app.use(express.json());
app.use(cors())
app.use(cookieParser())
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);
app.use("/api/v1/messages", messageRouter );
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter);
app.use("/api/v1/conversations", conversationRouter);
// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    connectDB()
    console.log(`Server listening on http://localhost:${PORT}`);
});