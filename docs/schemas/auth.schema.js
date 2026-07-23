module.exports = {
    RegisterRequest: {
        type: "object",
        required: ["username", "email", "password"],
        properties: {
            username: {
                type: "string",
                example: "ayush"
            },
            email: {
                type: "string",
                format: "email",
                example: "ayush@gmail.com"
            },
            password: {
                type: "string",
                format: "password",
                example: "Password@123"
            }
        }
    },

    LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email: {
                type: "string",
                format: "email",
                example: "ayush@gmail.com"
            },
            password: {
                type: "string",
                format: "password",
                example: "Password@123"
            }
        }
    },

    AccessToken: {
        type: "object",
        properties: {
            accessToken: {
                type: "string",
                example:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            }
        }
    },

    LoginResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Login successful."
            },
            data: {
                $ref: "#/components/schemas/AccessToken"
            }
        }
    },

    RegisterResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "User registered successfully."
            },
            data: {
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
                    email: {
                        type: "string",
                        example: "ayush@gmail.com"
                    }
                }
            }
        }
    },

    RefreshTokenResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Access token refreshed successfully."
            },
            data: {
                $ref: "#/components/schemas/AccessToken"
            }
        }
    },

    LogoutResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Logged out successfully."
            }
        }
    }
};