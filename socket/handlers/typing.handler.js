const { Participant } = require("../../models/conversation.model");


const typingHandler = async(io, socket, data) => {
    const conversationId = data?.conversationId;

    if (!conversationId){
        socket?.emit('error', { message: 'conversationId is missing' });
        return;
    };
    const hasJoinedConversation = socket?.rooms?.has(conversationId);
    if (!hasJoinedConversation){
        socket.emit('error', { message: "User haven't joined the conversation" });
        return;
    };

    socket?.to(data.conversationId).emit('typing', { 
        userId: socket?.user?.id, 
        username: socket?.user?.username
     });
    
};

const stopTypingHandler = async(io, socket, data) => {
    const conversationId = data?.conversationId;

    if (!conversationId){
        socket.emit('error', { message: 'conversationId is missing' });
        return;
    };

    const hasJoinedConversation = socket?.rooms?.has(conversationId);
    if (!hasJoinedConversation){
        socket.emit('error', { message: "User haven't joined the conversation" });
        return;
    };

   
    socket?.to(data.conversationId)?.emit('stop-typing', { userId: socket.user.id });
};

module.exports = {
    typingHandler,
    stopTypingHandler
}