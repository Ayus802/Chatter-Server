const { Message } = require("../../models/message.model");


const editMessageController = async (req, res) => {
    try {
        const { newContent } = req.body;
        const { messageId } = req.params;
        const sender = req.info;

        if (!newContent || !messageId) {
            return res.status(400).json({ error: 'New content and message ID are required' });
        }
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            { content: newContent },
            { isEdited: true }
        );

        return res.status(200).json({ message: 'Message updated successfully', updatedMessage });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    editMessageController
}