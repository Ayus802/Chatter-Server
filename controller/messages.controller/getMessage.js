const { Conversation, Participant } = require("../../models/conversation.model");
const { Message } = require("../../models/message.model");


const getMessageController = async(req, res) => {
    try {
        const { conversationId } = req.params;
        const { cursor, limit } = req.query;
        const sender = req.info;

        if (!conversationId) {
            return res.status(400).json({ error: 'conversationId is required' });
        }
        const existingConversation = await Conversation.findById(conversationId);
        if (!existingConversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        const isParticipant = await Participant.findOne({conversationId, userId: sender.id});
        if(!isParticipant){
            return res.status(404).json({ error: 'User is not part of this conversation'  });
        };
        const messages = await Message.find({
            conversationId
        })
        .sort({ createdAt: -1 })
        .skip(cursor ? parseInt(cursor) : 0)
        .limit(limit ? parseInt(limit) : 20);

        if (existingConversation.lastMessage 
            && (!isParticipant.lastReadMessage || isParticipant.lastReadMessage.toString() !== existingConversation.lastMessage.toString())) {
            
                await Participant.findByIdAndUpdate(isParticipant._id, { lastReadMessage: existingConversation.lastMessage  }, { new: true  });
        };
        console.log("message aa rha ahi",messages)

        res.status(200).json({ success: true, message: 'Messages fetched successfully', data: messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

module.exports = {
    getMessageController
}