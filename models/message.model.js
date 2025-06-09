const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    message:{
        type: String,
        trim: true,
        required: true
    }
})

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;