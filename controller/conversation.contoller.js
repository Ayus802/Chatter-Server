
const mongoose = require('mongoose');
const { Conversation, Participant } = require('../models/conversation.model');


const CHAT_TYPES = {
    PRIVATE: 'private',
    GROUP: 'group'
};

const PARTICIPANT_ROLES = {
    ADMIN: 'ADMIN',
    MEMBER: 'MEMBER'
};

const createConversationController = async (req, res) => {
    try {
        const { type, participant_ids, name } = req.body;
        const userId = req.info.id;

            if (!type || !participant_ids || !Array.isArray(participant_ids)) {
                return res.status(400).json({ success: false, message: "Invalid request body" });
            }
            if (type === "private" && participant_ids.length !== 1) {
                return res.status(400).json({ success: false, message: "Private conversations must have exactly one participant" });
            }
            else if (type === "group" && participant_ids.length < 2) {
                return res.status(400).json({ success: false, message: "Group conversations must have at least two participants" });
            }
            else if (type !== "private" && type !== "group") {
                return res.status(400).json({ success: false, message: "Invalid conversation type" });
            }
            

            if (type === CHAT_TYPES.PRIVATE && participant_ids.length==1) {
                const existingConversation = await Conversation.aggregate([
                    {
                        $match:{
                            type: CHAT_TYPES.PRIVATE,
                        }
                    },
                    {
                        $lookup: {
                            from: "participants",
                            localField:"_id",
                            foreignField: "conversationId",
                            as: "participants"
                        }
                    },
                    {
                        $match: {
                            $and: [

                                {"participants.userId": new mongoose.Types.ObjectId(participant_ids[0])},
                                {'participants.userId': new mongoose.Types.ObjectId(userId)},
                                {"participants": {$size: 2}}
                            ]
                        }
                    }
                ])
                console.log("conversation: ", existingConversation)
                if (existingConversation.length != 0) {
                    return res.status(400).json({ success: false, message: "Conversation with this name already exists" });
                }
                const newConversation = new Conversation({
                    type: CHAT_TYPES.PRIVATE,
                    createdBy: userId,
                });
                await newConversation.save();
                const participant1 = new Participant ({
                    conversationId: newConversation._id,
                    userId: userId,
                    role: PARTICIPANT_ROLES.ADMIN,
                })
                const participant2 = new Participant ({
                    conversationId: newConversation._id,
                    userId: participant_ids[0],
                    role: PARTICIPANT_ROLES.MEMBER
                })
                await participant1.save();
                await participant2.save();

                return res.status(201).json({ success: true, message: "Private conversation created successfully", data: newConversation });
            }
            else if (type === CHAT_TYPES.GROUP && participant_ids.length>1) {
                const { name, type, participant_ids } = req.body;
                
                const existingConversation = await Conversation.findOne({ name, type: CHAT_TYPES.GROUP});
                if (existingConversation) {
                    return res.status(400).json({ success: false, message: "Conversation with this name already exists" });
                }
                const newConversation = new Conversation({
                    type: CHAT_TYPES.GROUP,
                    name,
                    createdBy: userId,
                })
                await newConversation.save();

                const participants = participant_ids.map(participantId => ({
                    conversationId: newConversation._id,
                    userId: participantId,
                    role: PARTICIPANT_ROLES.MEMBER
                }));

                
                await Participant.insertMany(participants);

                const adminParticipant = new Participant({
                    conversationId: newConversation._id,
                    userId: userId,
                    role: PARTICIPANT_ROLES.ADMIN
                });
                await adminParticipant.save();

                return res.status(201).json({ success: true, message: "Group conversation created successfully", data: newConversation });


            }

        }catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }

 }

 const getConversationsController = async(req,res) => {
        try{
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page -1 )* limit;
            const user_id = req.info.id;
            const participant = await Participant.find({ userId: user_id })
                .sort({ updated_at: -1 })
                .skip(skip)
                .limit(limit)
                .populate('conversationId');
            return res.status(200).json({ success: true, message: "Conversations fetched successfully", data: participant });

        }catch(error){
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
 }

 const getConversationByIdController = async(req,res) => {
        try{ 
            const { conversationId } = req.params;
            const existingConversation = await Conversation.findById(conversationId);
            if (!existingConversation) {
                return res.status(404).json({ success: false, message: "Conversation not found" });
            }
            const allParticipants = await Participant.find({ conversationId: conversationId })
                .populate('userId', 'username email profilePicture');
            return res.status(200).json({ success: true, message: "Conversation fetched successfully", data: { ...existingConversation, participants: allParticipants } });


        }catch(error){
            return res.status(500).json({ success: false, message:"Internal server error" });
        }
 }

 module.exports = {
    createConversationController,
    getConversationsController,
    getConversationByIdController
 }