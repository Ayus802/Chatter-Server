const { verifyToken } = require("../../utils/tokenHandler");


const socketAuthMiddleware = (socket, next) => {
    try {
        const authHeader = socket.handshake.headers.authorization;

        if (!authHeader) {
            return next(new Error("No token provided"));
        }

        const accessToken = authHeader.split(" ")[1];

        const payload = verifyToken(accessToken);

        if (!payload) {
            return next(new Error("Invalid token"));
        }
        console.log("Socket Auth Middleware: User authenticated", payload);
        socket.user = payload;

        next();
    } catch (err) {
        next(new Error("Authentication failed"));
    }
};

module.exports = {
    socketAuthMiddleware
};