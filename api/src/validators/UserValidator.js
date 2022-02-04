const UserService = require('./../services/UserService');

module.exports = {
    name: {
        isLength: {
            errorMessage: 'Name informed is invalid.',
            options: {
                min: 2,
                max: 40
            }
        }
    },
    email: {
        isEmail: {
            errorMessage: 'Email informed is invalid.'
        }
    },
    login: {
        isLength: {
            errorMessage: 'Login must have 2-20 length.',
            options: {
                min: 2,
                max: 20
            }
        }
    },
    password: {
        isLength: {
            errorMessage: 'Password must have between 6 and 8 characters',
            options: {
                min: 6,
                max: 8
            },
        }
    },
    'location.address': {
        isLength: {
            errorMessage: 'Address must be less than 40 characters long.',
            options: {
                max: 40
            },
        },
        notEmpty: {
            errorMessage: 'Address cannot be empty.'
        }
    },
    'location.city': {
        isLength: {
            errorMessage: 'City must be less than 30 characters long.',
            options: {
                max: 30
            },
        },
        notEmpty: {
            errorMessage: 'City cannot be empty.'
        }
    },
    'location.state': {
        isLength: {
            errorMessage: 'State must be less than 30 characters long.',
            options: {
                length: 30
            },
        },
        notEmpty: {
            errorMessage: 'State cannot be empty.'
        }
    },
    'location.zip_code': {
        isInt: {
            errorMessage: 'zip_code must be integer.'
        },
        optional: {
            options: {
                nullable: true
            }
        },
        isLength: {
            options: {min: 8, max: 8},
            errorMessage: 'zip_code size is invalid.'
        }
    },
    'location.lat': {
        isDecimal: {
            errorMessage: 'lat must be double.'
        },
        optional: {
            options: {
                nullable: true
            }
        }
    },
    'location.lng': {
        isDecimal: {
            errorMessage: 'lng must be double.'
        },
        optional: {
            options: {
                nullable: true
            }
        }
    }
}