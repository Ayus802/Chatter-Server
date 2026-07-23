module.exports = {
    Message: {
        type: "object",

        properties: {
            id: {
                type: "string",
                example: "685fd6d99c8e48b8d9f729d1"
            },

            conversationId: {
                type: "string",
                example: "685fd6d99c8e48b8d9f729d2"
            },

            senderId: {
                $ref: "#/components/schemas/User"
            },

            content: {
                type: "string",
                example: "Hello Rahul!"
            },

            type: {
                type: "string",
                enum: [
                    "TEXT",
                    "IMAGE",
                    "VIDEO",
                    "FILE",
                    "AUDIO"
                ],
                example: "TEXT"
            },

            replyToMessageId: {
                type: "string",
                nullable: true,
                example: null
            },

            isEdited: {
                type: "boolean",
                example: false
            },

            editedAt: {
                type: "string",
                nullable: true,
                format: "date-time"
            },

            deletedAt: {
                type: "string",
                nullable: true,
                format: "date-time"
            },

            createdAt: {
                type: "string",
                format: "date-time"
            },

            updatedAt: {
                type: "string",
                format: "date-time"
            }
        }
    },

    SendMessageRequest: {
        type: "object",

        required: [
            "conversationId",
            "content",
            "type"
        ],

        properties: {
            conversationId: {
                type: "string",
                example: "685fd6d99c8e48b8d9f729d2"
            },

            content: {
                type: "string",
                example: "Hello Rahul!"
            },

            type: {
                type: "string",
                enum: [
                    "TEXT",
                    "IMAGE",
                    "VIDEO",
                    "FILE",
                    "AUDIO"
                ],
                example: "TEXT"
            },

            replyToMessageId: {
                type: "string",
                nullable: true
            }
        }
    },

    EditMessageRequest: {
        type: "object",

        required: [
            "content"
        ],

        properties: {
            content: {
                type: "string",
                example: "Updated message"
            }
        }
    },

    MessageResponse: {
        type: "object",

        properties: {
            success: {
                type: "boolean",
                example: true
            },

            message: {
                type: "string",
                example: "Message sent successfully."
            },

            data: {
                $ref: "#/components/schemas/Message"
            }
        }
    },

    MessageListResponse: {
        type: "object",

        properties: {
            success: {
                type: "boolean",
                example: true
            },

            message: {
                type: "string",
                example: "Messages fetched successfully."
            },

            data: {
                type: "array",

                items: {
                    $ref: "#/components/schemas/Message"
                }
            },

            meta: {
                $ref: "#/components/schemas/CursorPagination"
            }
        }
    }
};