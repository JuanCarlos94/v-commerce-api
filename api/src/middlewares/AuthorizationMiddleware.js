const jwt = require('jsonwebtoken');
const AuthService = require('./../services/AuthenticationService');

module.exports = function hasAuthorization() {
    return async function (req, res, next) {
        const token = AuthService.removeBearerName(req.headers['authorization']);
        if(!token) {
            return res.status(400).json({msg: 'Invalid token.'});
        }
        return await jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(401).json({
                    msg: 'Token invalid.'
                });
            }
            return next();
        });
    }
}

