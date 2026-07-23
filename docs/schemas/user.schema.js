module.exports = {
    User: {
        type: "object",
        properties: {
            id: {
                type: "string",
                example: "685fd6d99c8e48b8d9f729d1"
            },

            username: {
                type: "string",
                example: "ayush"
            },

            displayName: {
                type: "string",
                example: "Ayush Gupta"
            },

            email: {
                type: "string",
                format: "email",
                example: "ayush@gmail.com"
            },

            bio: {
                type: "string",
                example: "Backend Developer"
            },

            avatarUrl: {
                type: "string",
                nullable: true,
                example: "https://res.cloudinary.com/demo/image/upload/avatar.png"
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

    UpdateUserRequest: {
        type: "object",
        properties: {
            displayName: {
                type: "string",
                example: "Ayush Gupta"
            },

            bio: {
                type: "string",
                example: "Building scalable backend systems."
            },

            avatarUrl: {
                type: "string",
                example: "https://res.cloudinary.com/demo/image/upload/avatar.png"
            }
        }
    },

    SearchUsersResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },

            message: {
                type: "string",
                example: "Users fetched successfully."
            },

            data: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/User"
                }
            }
        }
    }
};