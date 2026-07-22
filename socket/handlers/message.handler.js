const { EVENTS } = require("../../const/constants");
const { Participant } = require("../../models/conversation.model");




const messageReadHandler = async(io, socket, message) => {
    const conversationId = message?.conversationId;
    const userId = socket?.user?.id
    
    if (!conversationId || !userId){
        socket.emit(EVENTS.ERROR, { message: "conversationId and UserID are required" });
        return;
    };
    const inConversation = socket.rooms.has(conversationId);
    if (!inConversation){
        socket.emit(EVENTS.ERROR, { message: "user is not in conversation" });
        return;
    };
    const isParticipant = await Participant.find({userId, conversationId});
    if (!isParticipant){
        socket.emit(EVENTS.ERROR, { message: "User is not a participant in this conversation" });
        return;
    };

    

    socket.to(conversationId).emit('message-read', {  message: "User has read this message"  });
    socket.emit('sent-succesfully', {  message: "info transfer complete"  });
    return;

};

module.exports = {
    messageReadHandler
}