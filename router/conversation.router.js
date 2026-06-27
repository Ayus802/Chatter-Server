const Router = require('express')
const { authMiddleware } = require('../middleware/auth.middleware')
const { createConversationController, getConversationsController, getConversationByIdController } = require('../controller/conversation.contoller')

const router = Router()

router.post('/', authMiddleware, createConversationController)
router.get('/', authMiddleware, getConversationsController)
router.get('/:conversationId', authMiddleware, getConversationByIdController)