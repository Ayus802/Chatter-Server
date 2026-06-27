
const mongoose = require('mongoose');
const { Conversation } = require('../models/conversation.model');

const createConversationController = async (req, res) => {
    try {
        const { type, participant_ids, name } = req.body;
        const userId = req.info.id;

        if (!type || !participant_ids || !Array.isArray(participant_ids)) {
            return res.status(400).json({ success: false, message: 'Invalid request body' });
        }

        if (type === 'private' && participant_ids.length !== 1) {
            return res.status(400).json({ success: false, message: 'Private conversations must have exactly one participant' });
        }

        if (type === 'group' && participant_ids.length < 2) {
            return res.status(400).json({ success: false, message: 'Group conversations must have at least two participants' });
        }

        if (type !== 'private' && type !== 'group') {
            return res.status(400).json({ success: false, message: 'Invalid conversation type' });
        }

        const participants = [userId, ...participant_ids].map(id => mongoose.Types.ObjectId(id));

        if (type === 'private') {
            const existingConversation = await Conversation.findOne({
                type: 'private',
                participant_ids: { $all: participants, $size: 2 }
            });

            if (existingConversation) {
                return res.status(400).json({ success: false, message: 'Conversation already exists', data: existingConversation });
            }
        }

        const newConversation = new Conversation({
            type,
            name: type === 'group' ? name || 'Group Chat' : undefined,
            createdBy: userId,
            participant_ids: participants
        });

        await newConversation.save();

        return res.status(201).json({ success: true, message: 'Conversation created successfully', data: newConversation });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getConversationsController = async (req, res) => {
    try {
        const userId = req.info.id;
        const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 25, 1), 100);
        const skip = (page - 1) * limit;

        const filter = { participant_ids: mongoose.Types.ObjectId(userId) };

        const [totalCount, conversations] = await Promise.all([
            Conversation.countDocuments(filter),
            Conversation.find(filter)
                .sort({ updated_at: -1, created_at: -1 })
                .skip(skip)
                .limit(limit)
        ]);

        return res.status(200).json({
            success: true,
            page,
            limit,
            totalPages: Math.ceil(totalCount / limit),
            totalCount,
            data: conversations
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getConversationByIdController = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.info.id;

        if (!mongoose.Types.ObjectId.isValid(conversationId)) {
            return res.status(400).json({ success: false, message: 'Invalid conversation ID' });
        }

        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ success: false, message: 'Conversation not found' });
        }

        const isParticipant = conversation.participant_ids
            ? conversation.participant_ids.some(participant => participant.toString() === userId)
            : false;

        if (!isParticipant) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        return res.status(200).json({ success: true, data: conversation });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    createConversationController,
    getConversationsController,
    getConversationByIdController
};