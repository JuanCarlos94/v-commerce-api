const service = require('../services/InviteService');

module.exports = {
    async create(req, res){
        const invitation = await service.create(req.params.userId, req.body);
        return res.status(201).json({invite: invitaiton});
    },
    async findById(req, res){
        const invitation = await service.findById(req.params.id, req.params.user_id);
        if(!invitation){
            return res.status(404).json({msg: 'Invite not found.'});
        }
        return res.status(200).json({invite: invitation});
    },
    async findByUser(req, res){
        const invite = await service.findByUser(req.params.user_id);
        return res.status(200).json(invite);
    },
    async update(req, res){
        const invite = await service.update(req.params.id, req.params.user_id, req.body);
        if(!invite){
            return res.status(400).json({msg: 'Updating error, try again!'});
        }
        return res.status(200).json({invite: invite});
    }
}