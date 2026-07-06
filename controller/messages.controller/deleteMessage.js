const { Message } = require("../../models/message.model");


const deleteMessageController = async (req, res) => {
    try {
        const { messageId } = req.params;
        const sender = req.info;

        const existingMessage = await Message.findById(messageId);
        if (!existingMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }

        const deletedMessage = await Message.findByIdAndUpdate(messageId, { isDeleted: true }, { content: '[deleted]' });
        return res.status(200).json({ message: 'Message deleted successfully', deletedMessage });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    deleteMessageController
}