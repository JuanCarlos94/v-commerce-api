const DealService = require('./../services/DealService');
const AuthService = require('./../services/AuthenticationService');

module.exports = {
    findById: async function(req, res){
        const userId = await AuthService.extractUserIdFromToken(req.headers['authorization']);
        if(!userId){
            return res.status(401).json({msg: 'Access denied.'});
        }
        const deal = await DealService.findByIdAndUser(userId, req.params.id);
        if(!deal){
            return res.status(404).json({msg: 'Deal not found.'});
        }
        return res.status(200).json(deal);
    },
    search: async function(req, res){
        const deals = await DealService.search(req.query);
        return res.status(200).json(deals);
    },
    create: async function(req, res){
        const userId = await AuthService.extractUserIdFromToken(req.headers['authorization']);
        if(!userId) {
            return res.status(403).json({msg: 'Access denied.'})
        }
        const deal = await DealService.create(userId, req.body);
        return res.status(201).json(deal);
    },
    update: async function(req, res){
        const userId = await AuthService.extractUserIdFromToken(req.headers['authorization']);
        if(!userId){
            return res.status(403).json({msg: 'Access denied.'});
        }
        const updated = await DealService.update(req.params.id, userId, req.body);
        if(!updated){
            return res.status(404).json({msg: 'Error when updating, try again!'});
        }
        return res.status(200).json(updated);
    }
}