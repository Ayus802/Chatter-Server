
const zod = require('zod');
const User = require('../models/user.modal');
const bcrypt = require('bcrypt'); 
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenHandler');
const { SignUpResponsePayload } = require('../const/payloads');
const redis = require('../db/redis');


const registerSchema = zod.object({
    name: zod.string().min(1, 'Name is required'),
    username: zod.string().min(1, 'Username is required'),
    password: zod.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: zod.string().min(6, 'Confirm Password must be at least 6 characters long'),

}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match'
});

const loginSchema = zod.object({
    username: zod.string().min(1, 'Username is required'),
    password: zod.string().min(6, 'Password must be at least 6 characters long'),
}); 

const registrationController = async(req, res) => {
    const body = req.body;
    
    const parsed = registerSchema.safeParse(body);
    try{
    if (!parsed.success) {
        return res.status(400).json({ success: false, message: parsed.error + "Parse"});
    }
    const existingUser = await User.findOne({ username: parsed.data.username.toLowerCase() })
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Username already exists' });
    }
    const user = await User.create({

        name: parsed.data.name,
        username: parsed.data.username.toLowerCase(),
        password: parsed.data.password,
    })
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    await redis.set(`refreshToken:${user._id}`, refreshToken, {
        ex: 7 * 24 * 60 * 60 // Set expiration time to 7 days
    });
    
    return res.status(201).json(SignUpResponsePayload(user._id, user.username, user.email, user.profilePicture, accessToken));

    }catch(err) {
            return res.status(500).json({ success: false, message: 'Error registering user', error: err.message });
        };
    
};

const loginController = async(req, res) => {
    const { username, password } = req.body;

    const parsed = loginSchema.safeParse({ username, password });
    if(!parsed.success){
        return res.status(400).json({ success: false, message: parsed?.error?.errors[0]?.message });
    }
    const user = await User.findOne(({ username: parsed?.data?.username?.toLowerCase(), password: parsed?.data?.password }))
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
    const passwordMatch = bcrypt.compare(parsed?.data?.password, user?.password);
    if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
    } 
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    await redis.set(`refreshToken:${user._id}`, refreshToken, {
        ex: 7 * 24 * 60 * 60 // Set expiration time to 7 days
    });
    return res.status(200).json({ success: true, message: 'Login successful', accessToken });
    // Here you would typically validate the user credentials

    
};

const refreshTokenController = async(req, res) => {
    const refreshToken = req?.cookies?.refreshToken;
    const user = req.info;
    console.log("Refresh Token:", user);
    if (!refreshToken) {
        return res.status(401).json({ success: false, message: 'Refresh token not found' });
    }
    const cachedRefreshToken = await redis.get(`refreshToken:${user.id}`);
    if (!cachedRefreshToken || cachedRefreshToken !== refreshToken) {
        return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }
    const accessToken = generateAccessToken(cachedRefreshToken);
    return res.status(200).json({ success: true, message: 'Access token refreshed', accessToken });

}

module.exports = {
    registrationController,
    loginController,
    refreshTokenController
};