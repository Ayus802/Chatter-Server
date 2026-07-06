const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.3",

        info: {
            title: "Chat Application API",
            version: "1.0.0",
            description:
                "REST API documentation for Chat Application Backend."
        },

        servers: [
            {
                url: "http://localhost:8080/api/v1",
                description: "Development Server"
            }
        ],

        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },

        security: [
            {
                BearerAuth: []
            }
        ]
    },

    apis: [
        "./router/*.js"
    ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec
};