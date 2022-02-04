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
            "/user": {
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
            "/user/{id}": {
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
            "/deal": {
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
                                            enum: ['Venda', 'Troca', 'Desejo']
                                        },
                                        value: {
                                            type: 'integer'
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
            "/deal/{id}": {
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
                    parameters: [{
                        name: 'id',
                        in: 'path',
                        required: true
                    }],
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
            },
            "/deal/search": {
                post: {
                    tags: ['Deals'],
                    summary: 'Return a list of deals by the params',
                    parameters: [{
                            name: 'type',
                            in: 'query',
                            schema: {
                                type: 'string',
                                enum: ['Venda', 'Troca', 'Desejo']
                            }
                        },
                        {
                            name: 'value_start',
                            in: 'query',
                            type: 'integer'
                        },
                        {
                            name: 'value_end',
                            in: 'query',
                            type: 'integer'
                        },
                        {
                            name: 'term',
                            in: 'query',
                            type: 'string'
                        },
                        {
                            name: 'lat',
                            in: 'query',
                            type: 'integer'
                        },
                        {
                            name: 'lng',
                            in: 'query',
                            type: 'integer'
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'OK'
                        }
                    }
                }
            },
            "/deal/{deal_id}/bid/{id}":{
                get: {
                    tags: ['Bids'],
                    summary: 'Get a bid by deal ID and ID.',
                    parameters: [
                        {
                            name: 'deal_id',
                            in: 'path',
                            required: true
                        },
                        {
                            name: 'id',
                            in: 'path',
                            required: true
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'OK'
                        },
                        '404': {
                            description: 'NOT FOUND'
                        }
                    }
                },
                put: {
                    tags: ['Bids'],
                    summary: 'Update a bid by ID.',
                    parameters: [
                        {
                            name: 'deal_id',
                            in: 'path',
                            type: 'string',
                            required: true
                        },
                        {
                            name: 'id',
                            in: 'path',
                            type: 'string',
                            required: true
                        }
                    ],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        user_id: {type: 'string'},
                                        accepted: {type: 'boolean', default: true},
                                        value: {type: 'integer'},
                                        description: {type: 'string'}
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'OK'
                        }
                    }
                }
            },
            "/deal/{deal_id}/bid":{
                post: {
                    tags: ['Bids'],
                    summary: 'Create a new bid.',
                    parameters: [
                        {
                            name: 'deal_id',
                            in: 'path',
                            required: true
                        }
                    ],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        user_id: {type: 'string'},
                                        accepted: {type: 'boolean'},
                                        value: {type: 'integer'},
                                        description: {type: 'string'}
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'CREATED'
                        }
                    }
                },
                get: {
                    tags: ['Bids'],
                    summary: 'Return a list of bids by deal_id.',
                    parameters: [
                        {
                            name: 'deal_id',
                            in: 'path',
                            required: true
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'OK'
                        }
                    }
                }
            },
            "/deal/{deal_id}/message/{id}": {
                get: {
                    tags: ['Messages'],
                    summary: 'Return a message by deal_id and id.',
                    parameters: [
                        {
                            name: 'deal_id',
                            in: 'path',
                            required: true,
                            type: 'string'
                        },
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            type: 'string'
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'OK'
                        }
                    }
                },
                put: {
                    tags: ['Messages'],
                    summary: 'Update a message by deal_id and id.',
                    parameters: [
                        {
                            name: 'deal_id',
                            in: 'path',
                            required: true,
                            type: 'string'
                        },
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            type: 'string'
                        }
                    ],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        user_id: {type: 'string'},
                                        title: {type: 'string'},
                                        message: {type: 'string'}
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'OK'
                        }
                    }
                }
            },
            "/deal/{deal_id}/message": {
                post: {
                    tags: ['Messages'],
                    summary: 'Create a new message.',
                    parameters: [
                        {
                            name: 'deal_id',
                            in: 'path',
                            required: true,
                            type: 'string'
                        }
                    ],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        user_id: {type: 'string'},
                                        title: {type: 'string'},
                                        message: {type: 'string'}
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '201': {
                            description: 'CREATED'
                        }
                    }
                },
                get: {
                    tags: ['Messages'],
                    summary: 'Return a list of messages by deal_id.',
                    parameters: [
                        {
                            name: 'deal_id',
                            in: 'path',
                            required: true,
                            type: 'string'
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'OK',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                title: {type: 'string'},
                                                user_id: {type: 'string'},
                                                message: {type: 'string'}
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
    apis: ["./src/routes/*.js"]
}

const swaggerConfig = swaggerJsDoc(options);

module.exports = swaggerConfig;