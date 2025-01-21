import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Theralink API Documentation',
            version: '1.0.0',
            description: 'API documentation for Theralink Healthcare Platform'
        },
        servers: [
            {
                url: 'https://theralink-backend.onrender.com',
                description: 'Production server'
            },
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ]
    },
    apis: ['./src/routes/*.ts']
};
export const specs = swaggerJsdoc(options);

