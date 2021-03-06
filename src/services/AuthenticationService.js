const jwt = require('jsonwebtoken');
const UserService = require('./../services/UserService');

module.exports = {
    extractUserIdFromToken: async function(token){
        const id = await jwt.verify(this.removeBearerName(token), process.env.SECRET, async (err, decoded) => {
            if(err) {
                console.error(err);
                return null;
            }
            return decoded._id;
        });
        return id;
    },
    generateAuthToken: async function(user){
        const _id = user._id;
        const payload = {_id};
        const token = await jwt.sign(payload, process.env.SECRET, {
            expiresIn: process.env.AUTHTOKEN_EXPIRES
        });
        return token;
    },
    getUserByToken: async function(token){
        const _id = await this.extractUserIdFromToken(token);
        const user = await UserService.findById(_id);
        return user;
    },
    removeBearerName: function(token) {
        if(!token){
            return null;
        }
        return token.slice(7);
    }
}