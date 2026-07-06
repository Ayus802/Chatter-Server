const mongoose = require("mongoose")
const { MESSAGE_TYPES } = require("../const/constants")

const messageSchema = new mongoose.Schema({
    conversationId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Conversation",
        required: true
    },
    senderId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    content:{
        type: String,
        required: true
    },
    type:{
        type: String,
        enum: Object.values(MESSAGE_TYPES),
        required: true
    },
    replyToMessageId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Message",
        
    },
    isEdited:{
        type: Boolean,
        default: false
    },
    isDeleted:{
        type: Boolean,
        default: false
    },

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}
)

const Message = mongoose.model("Message", messageSchema);
module.exports = {Message};