const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    receiverId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },  
    messages: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Message"
    }],
},
{
    timestamps: true
});

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;