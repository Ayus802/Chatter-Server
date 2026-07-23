module.exports = {
    BadRequest: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: false
            },
            message: {
                type: "string",
                example: "Bad Request"
            }
        }
    },

    Unauthorized: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: false
            },
            message: {
                type: "string",
                example: "Unauthorized"
            }
        }
    },

    Forbidden: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: false
            },
            message: {
                type: "string",
                example: "Forbidden"
            }
        }
    },

    NotFound: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: false
            },
            message: {
                type: "string",
                example: "Resource not found"
            }
        }
    },

    Conflict: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: false
            },
            message: {
                type: "string",
                example: "Resource already exists"
            }
        }
    },

    InternalServerError: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: false
            },
            message: {
                type: "string",
                example: "Internal server error"
            }
        }
    }
};