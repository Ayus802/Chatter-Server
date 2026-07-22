const { decode } = require("jsonwebtoken");
const { verifyToken } = require("../utils/tokenHandler");


const authMiddleware = (req,res,next) => {
    const token = req?.headers?.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        const isValid = verifyToken(token);
        const info = decode(token)
        console.log("Decoded token:", info, token);
        if (!isValid) {
            return res.status(401).json({ success: false, message: 'Invalid token', token });
        }
        req.info = info;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
}

module.exports = {
    authMiddleware
};