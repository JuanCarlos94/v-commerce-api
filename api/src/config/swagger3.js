const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: process.env.APP_NAME,
            version: process.env.APP_VERSION
        },
        servers: [{
            url: process.env.APP_HOST
        }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {

            }
        },
        security: [{
            bearerAuth: []
        }],
        paths: {
            "/authenticate": {
                post: {
                    tags: ["Authentication"],
                    summary: 'Authenticate user in application.',
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: true,
                                    properties: {
                                        login: {
                                            type: 'string',
                                            default: 'user'
                                        },
                                        password: {
                                            type: 'string',
                                            default: 'user123'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            default: 'OK',
                            content: {
                                "application/json": {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            token: {
                                                type: 'string',
                                                default: 'JWT-TOKEN'
                                            },
                                            user: {
                                                type: "object",
                                                required: true,
                                                properties: {
                                                    name: {
                                                        type: "string",
                                                        default: "User"
                                                    },
                                                    email: {
                                                        type: "string",
                                                        default: "user@mail.com"
                                                    },
                                                    login: {
                                                        type: "string",
                                                        default: "user"
                                                    },
                                                    password: {
                                                        type: "string",
                                                        default: "user123"
                                                    },
                                                    location: {
                                                        type: "object",
                                                        properties: {
                                                            lat: {
                                                                type: "number",
                                                                default: 0
                                                            },
                                                            lng: {
                                                                type: "number",
                                                                default: 0
                                                            },
                                                            address: {
                                                                type: "string",
                                                                default: "Address test"
                                                            },
                                                            city: {
                                                                type: "string",
                                                                default: "City test"
                                                            },
                                                            state: {
                                                                type: "string",
                                                                default: "XX"
                                                            },
                                                            zip_code: {
                                                                type: "number",
                                                                default: 0
                                                            }
                                                        }
                                                    },
                                                    _id: {
                                                        type: 'string'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'BAD REQUEST',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            msg: {
                                                type: 'string',
                                                default: 'Invalid credentials.'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/sso": {
                post: {
                    tags: ['Authentication'],
                    summary: 'Authenticate user in the application automatically.',
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    required: true,
                                    type: 'object',
                                    properties: {
                                        login: {
                                            type: 'string',
                                            default: 'user'
                                        },
                                        app_token: {
                                            type: 'string',
                                            default: 'APP_TOKEN'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'OK',
                            content: {
                                "application/json": {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            token: {
                                                type: 'string',
                                                default: 'JWT-TOKEN'
                                            },
                                            user: {
                                                type: "object",
                                                required: true,
                                                properties: {
                                                    name: {
                                                        type: "string",
                                                        default: "User"
                                                    },
                                                    email: {
                                                        type: "string",
                                                        default: "user@mail.com"
                                                    },
                                                    login: {
                                                        type: "string",
                                                        default: "user"
                                                    },
                                                    password: {
                                                        type: "string",
                                                        default: "user123"
                                                    },
                                                    location: {
                                                        type: "object",
                                                        properties: {
                                                            lat: {
                                                                type: "number",
                                                                default: 0
                                                            },
                                                            lng: {
                                                                type: "number",
                                                                default: 0
                                                            },
                                                            address: {
                                                                type: "string",
                                                                default: "Address test"
                                                            },
                                                            city: {
                                                                type: "string",
                                                                default: "City test"
                                                            },
                                                            state: {
                                                                type: "string",
                                                                default: "XX"
                                                            },
                                                            zip_code: {
                                                                type: "number",
                                                                default: 0
                                                            }
                                                        }
                                                    },
                                                    _id: {
                                                        type: 'string'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'BAD REQUEST',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            msg: {
                                                'type': 'string',
                                                default: 'Invalid credentials. / Invalid token.'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '404': {
                            description: 'NOT FOUND',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            msg: {
                                                type: 'string',
                                                default: 'User not found.'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/users": {
                post: {
                    tags: ['Users'],
                    summary: 'Create a new user.',
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        name: {
                                            type: "string",
                                            default: "User"
                                        },
                                        email: {
                                            type: "string",
                                            default: "user@mail.com"
                                        },
                                        login: {
                                            type: "string",
                                            default: "user"
                                        },
                                        password: {
                                            type: "string",
                                            default: "user123"
                                        },
                                        location: {
                                            type: "object",
                                            properties: {
                                                lat: {
                                                    type: "number",
                                                    default: 0
                                                },
                                                lng: {
                                                    type: "number",
                                                    default: 0
                                                },
                                                address: {
                                                    type: "string",
                                                    default: "Address test"
                                                },
                                                city: {
                                                    type: "string",
                                                    default: "City test"
                                                },
                                                state: {
                                                    type: "string",
                                                    default: "XX"
                                                },
                                                zip_code: {
                                                    type: "number",
                                                    default: 0
                                                }
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    },
                    responses: {
                        "201": {
                            description: "CREATED",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            user: {
                                                type: "object",
                                                required: true,
                                                properties: {
                                                    _id: {
                                                        type: 'string',
                                                        default: 'user_id'
                                                    },
                                                    name: {
                                                        type: "string",
                                                        default: "User"
                                                    },
                                                    email: {
                                                        type: "string",
                                                        default: "user@mail.com"
                                                    },
                                                    login: {
                                                        type: "string",
                                                        default: "user"
                                                    },
                                                    password: {
                                                        type: "string",
                                                        default: "user123"
                                                    },
                                                    location: {
                                                        type: "object",
                                                        properties: {
                                                            lat: {
                                                                type: "number",
                                                                default: 0
                                                            },
                                                            lng: {
                                                                type: "number",
                                                                default: 0
                                                            },
                                                            address: {
                                                                type: "string",
                                                                default: "Address test"
                                                            },
                                                            city: {
                                                                type: "string",
                                                                default: "City test"
                                                            },
                                                            state: {
                                                                type: "string",
                                                                default: "XX"
                                                            },
                                                            zip_code: {
                                                                type: "number",
                                                                default: 0
                                                            }
                                                        }
                                                    },
                                                    _id: {
                                                        type: 'string'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'BAD REQUEST',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            error: {
                                                type: 'object',
                                                properties: {
                                                    value: {
                                                        type: 'string'
                                                    },
                                                    msg: {
                                                        type: 'string'
                                                    },
                                                    param: {
                                                        type: 'string'
                                                    },
                                                    location: {
                                                        type: 'string'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/users/{id}": {
                get: {
                    tags: ['Users'],
                    summary: 'Get a user by ID.',
                    parameters: [{
                        name: 'id',
                        in: 'path',
                        required: true
                    }],
                    responses: {
                        "200": {
                            description: "OK"
                        }
                    }
                },
                put: {
                    tags: ['Users'],
                    summary: 'Update a user by ID.',
                    parameters: [{
                        name: 'id',
                        in: 'path',
                        required: true
                    }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        _id: {
                                            type: 'string',
                                            default: 'user_id'
                                        },
                                        name: {
                                            type: "string",
                                            default: "User 2"
                                        },
                                        email: {
                                            type: "string",
                                            default: "user2@mail.com"
                                        },
                                        login: {
                                            type: "string",
                                            default: "user 2"
                                        },
                                        password: {
                                            type: "string",
                                            default: "user1234"
                                        },
                                        location: {
                                            type: "object",
                                            properties: {
                                                lat: {
                                                    type: "number",
                                                    default: 10
                                                },
                                                lng: {
                                                    type: "number",
                                                    default: 10
                                                },
                                                address: {
                                                    type: "string",
                                                    default: "Address test 2"
                                                },
                                                city: {
                                                    type: "string",
                                                    default: "City test 2"
                                                },
                                                state: {
                                                    type: "string",
                                                    default: "YY"
                                                },
                                                zip_code: {
                                                    type: "number",
                                                    default: 10
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "OK",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            user: {
                                                type: "object",
                                                required: true,
                                                properties: {
                                                    name: {
                                                        type: "string",
                                                        default: "User"
                                                    },
                                                    email: {
                                                        type: "string",
                                                        default: "user@mail.com"
                                                    },
                                                    login: {
                                                        type: "string",
                                                        default: "user"
                                                    },
                                                    password: {
                                                        type: "string",
                                                        default: "user123"
                                                    },
                                                    location: {
                                                        type: "object",
                                                        properties: {
                                                            lat: {
                                                                type: "number",
                                                                default: 0
                                                            },
                                                            lng: {
                                                                type: "number",
                                                                default: 0
                                                            },
                                                            address: {
                                                                type: "string",
                                                                default: "Address test"
                                                            },
                                                            city: {
                                                                type: "string",
                                                                default: "City test"
                                                            },
                                                            state: {
                                                                type: "string",
                                                                default: "XX"
                                                            },
                                                            zip_code: {
                                                                type: "number",
                                                                default: 0
                                                            }
                                                        }
                                                    },
                                                    _id: {
                                                        type: 'string'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'BAD REQUEST',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            error: {
                                                type: 'object',
                                                properties: {
                                                    value: {
                                                        type: 'string'
                                                    },
                                                    msg: {
                                                        type: 'string'
                                                    },
                                                    param: {
                                                        type: 'string'
                                                    },
                                                    location: {
                                                        type: 'string'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/deals": {
                post: {
                    tags: ["Deals"],
                    summary: "Create a new deal.",
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        type: {
                                            type: 'string',
                                            default: 'ENUM(Venda, Troca, Desejo)'
                                        },
                                        value: {
                                            type: 'number'
                                        },
                                        description: {
                                            type: 'string'
                                        },
                                        trade_for: {
                                            type: 'string'
                                        },
                                        location: {
                                            type: "object",
                                            properties: {
                                                lat: {
                                                    type: "number",
                                                    default: 0
                                                },
                                                lng: {
                                                    type: "number",
                                                    default: 0
                                                },
                                                address: {
                                                    type: "string",
                                                    default: "Address test"
                                                },
                                                city: {
                                                    type: "string",
                                                    default: "City test"
                                                },
                                                state: {
                                                    type: "string",
                                                    default: "XX"
                                                },
                                                zip_code: {
                                                    type: "number",
                                                    default: 0
                                                }
                                            }
                                        },
                                        urgency: {
                                            type: 'object',
                                            properties: {
                                                type: {
                                                    type: 'string',
                                                    default: 'ENUM(Baixa, Média, Alta, Data)'
                                                },
                                                limit_date: {
                                                    type: Date,
                                                    default: 'Y-m-d'
                                                }
                                            }
                                        },
                                        photos: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    src: {
                                                        type: 'string'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'OK',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            type: {
                                                type: 'string',
                                                default: 'ENUM(Venda, Troca, Desejo)'
                                            },
                                            value: {
                                                type: 'number'
                                            },
                                            description: {
                                                type: 'string'
                                            },
                                            trade_for: {
                                                type: 'string'
                                            },
                                            urgency: {
                                                type: 'object',
                                                properties: {
                                                    type: {
                                                        type: 'string',
                                                        default: 'ENUM(Baixa, Média, Alta, Data)'
                                                    },
                                                    limit_date: {
                                                        type: Date,
                                                        default: 'Y-m-d'
                                                    }
                                                }
                                            },
                                            photos: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        src: {
                                                            type: 'string'
                                                        }
                                                    }
                                                }
                                            },
                                            user: {
                                                _id: {
                                                    type: 'string'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/deals/{id}": {
                get: {
                    tags: ['Deals'],
                    summary: 'Return a deal by ID.',
                    parameters: [{
                        name: 'id',
                        in: 'path',
                        type: 'string',
                        required: true
                    }],
                    responses: {
                        '200': {
                            description: 'OK'
                        },
                        '404': {
                            description: 'NOT FOUND'
                        },
                        '401': {
                            description: 'UNAUTHORIZED'
                        }
                    }
                },
                put: {
                    tags: ['Deals'],
                    summary: 'Update a deal by ID.',
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        type: {
                                            type: 'string',
                                            default: 'ENUM(Venda, Troca, Desejo)'
                                        },
                                        value: {
                                            type: 'number'
                                        },
                                        description: {
                                            type: 'string'
                                        },
                                        trade_for: {
                                            type: 'string'
                                        },
                                        location: {
                                            type: "object",
                                            properties: {
                                                lat: {
                                                    type: "number",
                                                    default: 0
                                                },
                                                lng: {
                                                    type: "number",
                                                    default: 0
                                                },
                                                address: {
                                                    type: "string",
                                                    default: "Address test"
                                                },
                                                city: {
                                                    type: "string",
                                                    default: "City test"
                                                },
                                                state: {
                                                    type: "string",
                                                    default: "XX"
                                                },
                                                zip_code: {
                                                    type: "number",
                                                    default: 0
                                                }
                                            }
                                        },
                                        urgency: {
                                            type: 'object',
                                            properties: {
                                                type: {
                                                    type: 'string',
                                                    default: 'ENUM(Baixa, Média, Alta, Data)'
                                                },
                                                limit_date: {
                                                    type: Date,
                                                    default: 'Y-m-d'
                                                }
                                            }
                                        },
                                        photos: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    src: {
                                                        type: 'string'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'OK'
                        },
                        '404': {
                            description: 'NOT FOUND'
                        },
                        '500': {
                            description: 'INTERNAL ERROR'
                        }
                    }
                }
            }
        }
    },
    apis: ["./src/routes/*.js"]
}

const swaggerConfig = swaggerJsDoc(options);

module.exports = swaggerConfig;