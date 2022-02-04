const MessageService = require('./../services/MessageService');
const AuthService = require('./../services/AuthenticationService');

module.exports = {
    async create(req, res){
        const userId = await AuthService.extractUserIdFromToken(req.headers['authorization']);
        const msg = await MessageService.create(req.params.deal_id, userId, req.body);
        return res.status(201).json({message: msg});
    },
    async findById(req, res){
        const msg = await MessageService.findById(req.params.id, req.params.deal_id);
        return res.status(200).json({message: msg});
    },
    async findByDealId(req, res){
        const msgs = await MessageService.findByDealId(req.params.deal_id);
        return res.status(200).json(msgs);
    },
    async update(req, res){
        const msg = await MessageService.update(req.params.id, req.params.deal_id, req.body);
        return res.status(200).json({message: msg});
    }
}