const UserService = require('./../services/UserService');
const authService = require('./../services/AuthenticationService');
const {validationResult} = require('express-validator');

module.exports = {
    async create(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({msg: errors.array()});
        }
        let user = await UserService.findByEmail(req.body.email);
        if(user){
            return res.status(400).json({msg: "Email already registered."});
        }
        user = await UserService.findByLogin(req.body.login);
        if(user){
            return res.status(400).json({msg: "Login already registered."});
        }
        try{
            const user = await UserService.create(req.body);
            return res.status(201).json({user: user});
        } catch(e){
            return res.status(500).json({msg: 'Internal error, try again!'});
        }
    },
    async findById(req, res){
        const _id = await authService.extractUserIdFromToken(req.headers['authorization']);
        let user = null;
        if(req.params.id && req.params.id !== '{id}'){
            if(_id !== req.params.id){
                return res.status(403).json({msg: 'Access denied.'});
            }
            user = await UserService.findById(req.params.id);
        } else{
            user = await UserService.findById(_id);
        }
        return res.status(200).json({user: user});
    },
    async update(req, res){
        const _id = await authService.extractUserIdFromToken(req.params.id);
        let user = await UserService.findByEmail(req.body.email);
        if(user && user._id !== _id){
            return res.status(400).json({msg: "Email already registered."});
        }
        user = await UserService.findByLogin(req.body.login);
        if(user && user._id !== _id){
            return res.status(400).json({msg: "Login already registered."});
        }
        user = await UserService.update(_id, req.body);
        if(!user){
            return res.status(400).json({msg: 'User not found.'});
        }
        return res.status(200).json({user: user});
    }
}