module.exports = {
    ApiResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Request completed successfully."
            },
            data: {
                type: "object"
            }
        }
    },

    PaginationMeta: {
        type: "object",
        properties: {
            page: {
                type: "integer",
                example: 1
            },
            limit: {
                type: "integer",
                example: 20
            },
            total: {
                type: "integer",
                example: 120
            },
            totalPages: {
                type: "integer",
                example: 6
            },
            hasNextPage: {
                type: "boolean",
                example: true
            }
        }
    },

    CursorPagination: {
        type: "object",
        properties: {
            nextCursor: {
                type: "string",
                nullable: true,
                example: "685fd6d99c8e48b8d9f729d1"
            },
            hasMore: {
                type: "boolean",
                example: true
            }
        }
    }
};