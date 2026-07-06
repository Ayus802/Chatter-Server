

const schemas = {
    auth: require('./schemas/auth.schema'),
    user: require('./schemas/user.schema'),
    message: require('./schemas/message.schema'),
    conversation: require('./schemas/conversation.schema')
}

module.exports = {
    ...schemas
}