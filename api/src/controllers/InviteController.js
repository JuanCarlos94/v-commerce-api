const service = require('../services/InviteService');
const AuthService = require('../services/AuthenticationService');

module.exports = {
    async create(req, res){
        const userId = await AuthService.extractUserIdFromToken(req.headers['authorization']);
        if(req.params.user_id !== userId || userId !== req.body.user){
            return res.status(403).json({msg: 'Access denied.'});
        }
        try{
            const invite = await service.create(req.params.user_id, req.body);
            return res.status(201).json({invite: invite});
        } catch(e){
            console.log(e);
            return res.status(500).json({msg: 'Creating error, try again!'});
        }
    },
    async findById(req, res){
        try{
            const invite = await service.findById(req.params.id, req.params.user_id);
            return res.status(200).json({invite: invite});
        } catch(e){
            return res.status(404).json({msg: 'Invite not found.'});
        }
    },
    async findByUser(req, res){
        try{
            const invite = await service.findByUser(req.params.user_id);
            return res.status(200).json(invite);
        } catch(e){
            return res.status(404).json({msg: 'No invites found.'});
        }
    },
    async update(req, res){
        try{
            const invite = await service.update(req.params.id, req.params.user_id, req.body);
            return res.status(200).json({invite: invite});
        } catch(e){
            return res.status(500).json({msg: 'Updating error, try again!'});
        }
    }
}