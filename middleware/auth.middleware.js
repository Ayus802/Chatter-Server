const { verifyToken } = require("../utils/tokenHandler");


const authMiddleware = (req,res,next) => {
    const token = req?.headers?.authorization?.split(' ')[1];
    console.log("Auth middleware triggered", req.headers);
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        const decoded = verifyToken(token);
        console.log("Decoded token:", decoded, token);
        if (!decoded) {
            return res.status(401).json({ success: false, message: 'Invalid token', token });
        }
        req.info = decoded;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
}

module.exports = {
    authMiddleware
};