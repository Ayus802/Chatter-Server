const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const User = require("../models/user.modal");

const router = express.Router();

router.get("/list", authMiddleware, async (req, res)=> {
    try {
        console.log("list triggered")
        const list = await User.find({}, { username: 1 })
        return res.status(200).json({
            success: true,
            message: "User list fetched successfully",
            data: list
        });
        
    } catch (error) {
        return new Error(error)
    }
})

module.exports = {
    userRouter: router  
};