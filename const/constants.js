

const MESSAGE_TYPES = {
    TEXT: "text",
    IMAGE: "image",
    VIDEO: "video",
    AUDIO: "audio",
    FILE: "file"
}

const EVENTS = {
    CONNECTION: "connection",
    DISCONNECT: "disconnect",

    JOIN_CONVERSATION: "join-conversation",
    LEAVE_CONVERSATION: "leave-conversation",

    SEND_MESSAGE: "send-message",
    NEW_MESSAGE: "new-message",

    TYPING: "typing",
    STOP_TYPING: "stop-typing",

    MESSAGE_READ: "message-read",

    USER_ONLINE: "user-online",
    USER_OFFLINE: "user-offline",

    CONVERSATION_UPDATED: "conversation-updated",

    ERROR: "error"
};

module.exports = {
    MESSAGE_TYPES, EVENTS
}