const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    message:{
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true
}
)

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;