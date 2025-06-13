const mongoose = require('mongoose');

async function connectDB(){
    const MONGO_URI = `mongodb+srv://guptayush47:ytU0aRfjmXjGwS5O@cluster727.nlyzewj.mongodb.net/chatterDb`
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectDB;