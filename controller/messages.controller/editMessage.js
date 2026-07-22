const { Conversation, Participant } = require("../../models/conversation.model");
const { Message } = require("../../models/message.model");
const { getio } = require("../../socket");


const editMessageController = async (req, res) => {
    try {
        const { conversationId, newContent } = req.body;
        const { messageId } = req.params;
        const sender = req.info;

        if (!newContent || !messageId || !conversationId) {
            return res.status(400).json({ error: 'New content, conversationId and message ID are required' });
        }

        const isValidConversationId = await Conversation.findById(conversationId)
        if (!isValidConversationId){
            return res.status(400).json({ error: 'ConversationId is not valid'  })
        };

        const isParticipant = await Participant.findOne({userId: sender.id, conversationId});
        if (!isParticipant){
            return res.status(400).json({error: "User is not a part of this conversation"});
        };
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        if (message.senderId != sender.id){
            return res.status(400).json({  error: "user is not author or this message" });
        };


        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            { 
                content: newContent ,
                isEdited: true 
            },
            {
                new: true
            }
        );

        
        getio().to(conversationId).emit('message-update', { message: "A message has been updated", content: updatedMessage })

        return res.status(200).json({ message: 'Message updated successfully', data: updatedMessage });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    editMessageController
}