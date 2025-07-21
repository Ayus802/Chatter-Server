const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateToken(user){
    
    const accessToken = jwt.sign(
        {
            id: user._id,
            username: user.username,
            name: user.name
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } 
    );

    const refreshToken = jwt.sign(
        {
            id: user._id,
            username: user.username,
            name: user.name
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    return accessToken;
}

function verifyToken(token){
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded; // Returns the decoded token if valid
    } catch (error) {
        return null; // Returns null if the token is invalid or expired
    }
}

module.exports = {
    generateToken,
    verifyToken
};

