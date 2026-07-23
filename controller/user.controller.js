const User = require('../models/user.modal');

const getProfileController = async (req, res) => {
    try {
        const userId = req.info.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, message: 'Profile fetched successfully', data: user });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error fetching profile', error: error.message });
    }
};

const updateProfileController = async (req, res) => {
    try {
        const userId = req.info.id;
        const updatedData = req.body;
        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, message: 'Profile updated successfully', data: user });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error updating profile', error: error.message });
    }
};

const getProfileByUsernameController = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, message: 'Profile fetched successfully', data: user });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error fetching profile', error: error.message });
    }
};

const getProfileByIdController = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        console.log("Fetched User:", userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, message: 'Profile fetched successfully', data: user });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error fetching profile', error: error.message });
    }   
};

module.exports = {
    getProfileController,
    updateProfileController,
    getProfileByUsernameController,
    getProfileByIdController
};
