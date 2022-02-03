const userService = require('./../services/UserService');
const authService = require('./../services/AuthenticationService');
const {validationResult} = require('express-validator');

module.exports = {
    async create(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error: errors.array()});
        }
        const user = await userService.create(req.body);
        return res.status(201).json({user: user});
    },
    async findById(req, res){
        const userId = await authService.extractUserIdFromToken(req.params.id);
        const user = await userService.findById(userId);
        return res.status(200).json({user: user});
    },
    async update(req, res){
        const userId = await authService.extractUserIdFromToken(req.params.id);
        const user = await userService.update(userId, req.body);
        if(!user){
            return res.status(400).json({msg: 'User not found.'});
        }
        return res.status(200).json({user: user});
    }
}