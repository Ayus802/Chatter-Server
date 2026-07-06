const { Conversation } = require("../../models/conversation.model");
const { Message } = require("../../models/message.model");


const sendMessageController = async(req, res) => {
    try {
        const { conversationId } = req.parms;
        const { cursor, limit } = req.query;

        if (!conversationId) {
            return res.status(400).json({ error: 'conversationId is required' });
        }
        const existingConversation = await Conversation.findById(conversationId);
        if (!existingConversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        const messages = await Message.find({
            conversationId
        })
        .sort({ createdAt: -1 })
        .skip(cursor ? parseInt(cursor) : 0)
        .limit(limit ? parseInt(limit) : 20);

        res.status(200).json({ success: true, message: 'Messages fetched successfully', data: messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

module.exports = {
    sendMessageController
}