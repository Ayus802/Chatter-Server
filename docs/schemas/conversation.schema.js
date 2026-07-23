module.exports = {
    Conversation: {
        type: "object",
        properties: {
            id: {
                type: "string",
                example: "685fd6d99c8e48b8d9f729d1"
            },

            type: {
                type: "string",
                enum: ["DIRECT", "GROUP"],
                example: "DIRECT"
            },

            name: {
                type: "string",
                nullable: true,
                example: null
            },

            avatarUrl: {
                type: "string",
                nullable: true,
                example: null
            },

            createdBy: {
                type: "string",
                example: "685fd6d99c8e48b8d9f729d2"
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

    Participant: {
        type: "object",
        properties: {
            id: {
                type: "string",
                example: "685fd6d99c8e48b8d9f729d3"
            },

            userId: {
                $ref: "#/components/schemas/User"
            },

            role: {
                type: "string",
                enum: ["ADMIN", "MEMBER"],
                example: "MEMBER"
            },

            joinedAt: {
                type: "string",
                format: "date-time"
            }
        }
    },

    CreateConversationRequest: {
        type: "object",
        required: [
            "type",
            "participants"
        ],

        properties: {
            type: {
                type: "string",
                enum: ["DIRECT", "GROUP"],
                example: "DIRECT"
            },

            name: {
                type: "string",
                nullable: true,
                example: "Backend Team"
            },

            participants: {
                type: "array",

                items: {
                    type: "string"
                },

                example: [
                    "685fd6d99c8e48b8d9f729d2"
                ]
            }
        }
    },

    ConversationResponse: {
        type: "object",

        properties: {
            success: {
                type: "boolean",
                example: true
            },

            message: {
                type: "string",
                example: "Conversation fetched successfully."
            },

            data: {
                type: "object",

                properties: {
                    conversation: {
                        $ref: "#/components/schemas/Conversation"
                    },

                    participants: {
                        type: "array",

                        items: {
                            $ref: "#/components/schemas/Participant"
                        }
                    }
                }
            }
        }
    },

    ConversationListResponse: {
        type: "object",

        properties: {
            success: {
                type: "boolean",
                example: true
            },

            message: {
                type: "string",
                example: "Conversations fetched successfully."
            },

            data: {
                type: "array",

                items: {
                    $ref: "#/components/schemas/Conversation"
                }
            },

            meta: {
                $ref: "#/components/schemas/PaginationMeta"
            }
        }
    }
};