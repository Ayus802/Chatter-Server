const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateAccessToken(user){
    
    const accessToken = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '36000s' } 
    );
    return accessToken;
}
function generateRefreshToken(user){

    const refreshToken = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    return refreshToken;
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
    generateAccessToken,
    generateRefreshToken,
    verifyToken
};

