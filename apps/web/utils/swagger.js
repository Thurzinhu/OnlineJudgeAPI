const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'OnlineJudge API',
            version: '1.0.0',
            description: 'OnlineJudge API documentation.',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            security: [{
                bearerAuth: []
            }],
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'The user ID.'
                        },
                        firstName: {
                            type: 'string',
                            description: 'The user\'s first name.'
                        },
                        lastName: {
                            type: 'string',
                            description: 'The user\'s last name.'
                        },
                        email: {
                            type: 'string',
                            description: 'The user\'s email address.'
                        },
                        password: {
                            type: 'string',
                            description: 'The user\'s password.'
                        },
                        role: {
                            type: 'string',
                            enum: ['user', 'admin'],
                            description: 'The user\'s role.'
                        },
                        refreshToken: {
                            type: 'string',
                            description: 'The user\'s refresh token.'
                        }
                    },
                    required: ['firstName', 'lastName', 'email', 'password']
                },
                Problem: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'The problem ID.'
                        },
                        title: {
                            type: 'string',
                            description: 'The problem title.'
                        },
                        description: {
                            type: 'string',
                            description: 'The problem description.'
                        },
                        constraints: {
                            type: 'string',
                            description: 'The problem constraints.'
                        },
                        inputFiles: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            description: 'List of input file URLs or paths.'
                        },
                        solutionCode: {
                            type: 'string',
                            description: 'Code that solves the problem.'
                        },
                        author: {
                            type: 'string',
                            description: 'The ID of the user who created the problem.'
                        }
                    },
                    required: ['title', 'description', 'constraints', 'inputFiles', 'solutionCode', 'author']
                },
                Submission: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'The submission ID.'
                        },
                        user: {
                            type: 'string',
                            description: 'The ID of the user who made the submission.'
                        },
                        problem: {
                            type: 'string',
                            description: 'The ID of the problem to which the submission was made.'
                        },
                        code: {
                            type: 'string',
                            description: 'The code submitted by the user.'
                        },
                        language: {
                            type: 'string',
                            description: 'The programming language of the submitted code.'
                        },
                        status: {
                            type: 'string',
                            enum: ['Pending', 'Accepted', 'Rejected'],
                            description: 'The status of the submission.'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'The date and time when the submission was created.'
                        }
                    },
                    required: ['user', 'problem', 'code', 'language']
                }
            }
        },
    },
    apis: [path.join(__dirname, '../routes/*.js')],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/docs.json', (req, res) => {
        res.json(swaggerSpec);
    });
};

module.exports = setupSwagger;