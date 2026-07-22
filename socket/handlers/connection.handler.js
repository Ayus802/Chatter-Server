const { EVENTS } = require("../../const/constants");
const { sendMessageHandler, newMessageHandler, messageReadHandler } = require("./message.handler");
const { joinConversationHandler, leaveConversationHandler } = require("./presence.handler");
const { stopTypingHandler, typingHandler } = require("./typing.handler");


const connectionHandler = (io, socket) => {


    // socket.on(EVENTS.SEND_MESSAGE, (data) => sendMessageHandler(io, socket, data));
    socket.on(EVENTS.MESSAGE_READ, (data) => messageReadHandler(io, socket, data));

    socket.on(EVENTS.STOP_TYPING, (data) => stopTypingHandler(io, socket, data));
    socket.on(EVENTS.TYPING, (data) => typingHandler(io, socket, data));

    // socket.on(EVENTS.USER_ONLINE, (data) => userOnlineHandler(io, socket, data));
    // socket.on(EVENTS.USER_OFFLINE, (data) => userOfflineHandler(io, socket, data));
    socket.on(EVENTS.JOIN_CONVERSATION, (data) => joinConversationHandler(io, socket, data));
    socket.on(EVENTS.LEAVE_CONVERSATION, (data) => leaveConversationHandler(io, socket, data));


}
module.exports = {
    connectionHandler
}