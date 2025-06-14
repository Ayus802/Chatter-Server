const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateToken(user){
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            name: user.name
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
    );

    return token;
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

