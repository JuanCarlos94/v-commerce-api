
const {checkSchema, isLatLong} = require('express-validator');

module.exports = {
    create: function(){
        return checkSchema({
            name: {
                isLength: {
                    errorMessage: 'Name informed is invalid.',
                    options: {min: 5, max: 30}
                }
            },
            email: {
                isEmail: {
                    errorMessage: 'Email informed is invalid.'
                }
            },
            login: {
                isLength: {
                    errorMessage: 'Login invalid.',
                    options: {min: 5, max: 20}
                }
            },
            password: {
                isLength: {
                  errorMessage: 'Password must have between 6 and 8 characters',
                  options: { min: 6, max: 8 },
                }
            }
        })
    }
}