const { EVENTS } = require("../../const/constants");
const { Conversation, Participant } = require("../../models/conversation.model");



// const userOnlineHandler = async (socket, io,data) => {
//     const conversationId = data?.conversationId
//     if (!conversationId) {
//         console.error('conversationId is missing in userOnlineHandler');
//         io.to(socket.id).emit('error', { message: 'conversationId is required' });
//         return;
//     }
//     const existingConversation = io.sockets.adapter.rooms.has(conversationId);
//     if (!existingConversation) {
//         io.to(socket.id).emit('error', { message: 'No room found for the specified conversation' });
//         return;
//     };
//     io.to(data.conversationId).emit('userOnline', { userId: socket.user.id });
// };

// const userOfflineHandler = (socket, io,data) => {
//     const conversationId = data?.conversationId
//     if (!conversationId) {
//         console.error('conversationId is missing in userOnlineHandler');
//         io.to(socket.id).emit('error', { message: 'conversationId is required' });
//         return;
//     }

//     io.to(data.conversationId).emit('userOffline', { userId: socket.user.id });
// };


const joinConversationHandler = async(io, socket,data) => {
    try{

        const conversationId = data?.conversationId;
        console.log('userId hai', socket.user)
        const userId = socket.user.id; 
        if (!conversationId) {
            console.error('conversationId is missing in userOnlineHandler');
            socket.emit('error', { message: 'conversationId is required' });
            return;
        }
        console.log('conversationId:', conversationId, 'userId:', userId);
        const existingConversation = await Conversation.findById(conversationId);
        console.log('existingConversation:', existingConversation);
        if (!existingConversation){
            socket.emit('error', {  message: 'Invalid conversationId'  })
            return;
        }
        const isParticipant = await Participant.findOne({conversationId, userId})
        if (!isParticipant){
            socket.emit('error', {  message: 'You are not a Participant of this conversation'  });
            return;
        }

        socket.join(conversationId)
        socket.emit('conversation-joined', {  message: 'Succesfully joined the conversation.'  })
        return;
    }catch(err){
        console.error(err);

        socket.emit(EVENTS.ERROR,{
            message: err.message,
            stack: err.stack
        });
    }
};

const leaveConversationHandler = (io, socket,data) => {
    try{

        const conversationId = data?.conversationId;
        if (!conversationId) {
            console.error('conversationId is missing in userOnlineHandler');
            socket.emit('error', { message: 'conversationId is required' });
            return;
        };

        const socketInRoom = socket.rooms.has(conversationId);
        if (!socketInRoom) {
            socket.emit('error', { message: 'Socket is not in the specified conversation room' });
            return;
        };
    
        socket.leave(data.conversationId);
        socket.emit('left-conversation', { message: 'Succesfully left the conversation.' });
        return;
    }catch(error){
        socket.emit('error', { message: 'Code fat gya' });
        return;
    }
};

module.exports = {
    // userOnlineHandler,
    // userOfflineHandler,
    joinConversationHandler,
    leaveConversationHandler
};