const { EVENTS } = require("../../const/constants");
const { Conversation, Participant } = require("../../models/conversation.model");
const { Message } = require("../../models/message.model");
const { getio } = require("../../socket");



const sendMessageController = async(req, res) => {
    try {    
        const sender = req.info;
        const { conversationId, content, type } = req.body;

        if (!conversationId || !content || !type) {
            return res.status(400).json({ error: 'conversationId, content, and type are required' });
        }
        const existingConversation = await Conversation.findById(conversationId);
        if (!existingConversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        };
        const isParticipant = await Participant.findOne({conversationId, userId:sender.id})
        if (!isParticipant){
            return res.status(400).json({  error: 'User is not a participant in this conversation'  })
        }
        const message = await Message.create({ conversationId, senderId: sender?.id, content, type });

        await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: message._id,
            updatedAt: new Date(),
        });

        getio()
            .to(conversationId)
            .emit(EVENTS.NEW_MESSAGE, message);

        getio()
            .to(conversationId)
            .emit(EVENTS.CONVERSATION_UPDATED, {
                conversationId,
                lastMessage: {
                    _id: message._id,
                    senderId: message.senderId,
                    content: message.content,
                    type: message.type,
                    createdAt: message.createdAt,
                },
            });
        res.status(200).json({ success: true, message: 'Message sent', data: message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    sendMessageController
}