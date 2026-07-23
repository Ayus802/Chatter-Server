const { Conversation, Participant } = require("../../models/conversation.model");
const { Message } = require("../../models/message.model");
const { getio } = require("../../socket");


const deleteMessageController = async (req, res) => {
    try {
        const { messageId } = req.params;
        const sender = req.info;

        if(!messageId){
            return res.status(404).json({ error: "messageId is are required"  })
        }
        
        const existingMessage = await Message.findById(messageId);
        if (!existingMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }
        let conversationId = String(existingMessage.conversationId); 
        if (existingMessage.isDeleted){
            return res.status(404).json({ error: "message is already deleted"  });
        };
        const isValidConversationId = await Conversation.findById(conversationId);
        if (!isValidConversationId){
            return res.status(400).json({ error: 'ConversationId is not valid'  })
        };

        const isParticipant = await Participant.findOne({userId: sender.id, conversationId});
        if (!isParticipant){
            return res.status(400).json({error: "User is not a part of this conversation"});
        };
        

        if (existingMessage.senderId!= sender.id){
            return res.status(404).json({ error: 'user not authorized to delete this message'  })
        }

        const deletedMessage = await Message.findByIdAndUpdate(messageId, { isDeleted: true, content: '[deleted]' },{ new: true  });
        console.log('conversationId:', conversationId, 'deletedMessage:', deletedMessage);
        getio()
            .to(conversationId)
            // .except(sender.id)
            .emit('message-delete', { message: 'A message is deleted', content: deletedMessage })
        
        return res.status(200).json({ message: 'Message deleted successfully', deletedMessage });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error', error_in_detail: error.message  });
    }
}

module.exports = {
    deleteMessageController
}