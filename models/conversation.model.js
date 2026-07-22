const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    type:{
        type: String,
        enum: ["private", "group"],
        required: true
    },
    lastMessage: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Message",
        default: null
    },
    name:{
        type: String,
        trim: true,
    },  
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const ParticipantSchema = new mongoose.Schema({
    conversationId: {
        type : mongoose.SchemaTypes.ObjectId,
        ref: "Conversation",
        required: true
    },
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    },
    lastReadMessage: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Message",
        default: null,
    },
    role: {
        type: String,
        enum: ["ADMIN", "MEMBER"],
        default: "MEMBER"
    }

},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const Participant = mongoose.model("Participant", ParticipantSchema);
const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = {Conversation, Participant};