const { Conversation } = require("../../models/conversation.model");
const { Message } = require("../../models/message.model");



const getMessageController = async(req, res) => {
    try {    
        const sender = req.info;
        const { conversationId, content, type } = req.body;

        if (!conversationId || !content || !type) {
            return res.status(400).json({ error: 'conversationId, content, and type are required' });
        }
        const existingConversation = await Conversation.findById(conversationId);
        if (!existingConversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        const message = await Message.create({ conversationId, senderId: sender.user_id, content, type });
        res.status(200).json({ success: true, message: 'Message sent', data: message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getMessageController
}