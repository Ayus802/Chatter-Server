
const zod = require('zod');
const User = require('../models/user.modal');
const bcrypt = require('bcrypt'); 
const { generateToken } = require('../utils/tokenHandler');


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
        return res.status(400).json({ success: false, message: parsed.error.errors[0].message });
    }
    const existingUser = await User.findOne({ username: parsed.data.username })
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Username already exists' });
    }
    const user = await User.create({
        name: parsed.data.name,
        username: parsed.data.username,
        password: parsed.data.password,
    })
    const token = generateToken(user);
    return res.status(201).json({ success: true, message: 'User registered successfully', token });

    }catch(err) {
            return res.status(500).json({ success: false, message: 'Error registering user', error: err.message });
        };
    // Here you would typically save the user to the database
    
};

const loginController = async(req, res) => {
    const { username, password } = req.body;

    const parsed = loginSchema.safeParse({ username, password });
    if(!parsed.success){
        return res.status(400).json({ success: false, message: parsed?.error?.errors[0]?.message });
    }
    const user = await User.findOne(({ username: parsed?.data?.username, password: parsed?.data?.password }))
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
    const passwordMatch = bcrypt.compare(parsed?.data?.password, user?.password);
    if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
    } 
    const token = generateToken(user)
    return res.status(200).json({ success: true, message: 'Login successful', token });
    // Here you would typically validate the user credentials
    
};

module.exports = {
    registrationController,
    loginController
};