const BidService = require('./../services/BidService');
const AuthService = require('./../services/AuthenticationService');

module.exports = {
    async create(req, res){
        const userId = await AuthService.extractUserIdFromToken(req.headers['authorization']);
        if(userId !== req.body.user_id){
            return res.status(403).json({msg: 'Access denied.'});
        }
        const bid = await BidService.create(req.params.deal_id, req.body);
        return res.status(201).json(bid);
    },
    async findById(req, res){
        const bid = await BidService.findById(req.params.deal_id, req.params.id);
        if(!bid){
            return res.status(404).json({msg: 'Bid not found.'});
        }
        return res.status(200).json({bid: bid});
    },
    async findByDealId(req, res){
        const bid = await BidService.findByDealId(req.params.deal_id);
        if(!bid){
            return res.status(404).json({msg: 'Bid not found.'});
        }
        return res.status(200).json({bid: bid});
    },
    async update(req, res){
        try{
            const userId = await AuthService.extractUserIdFromToken(req.headers['authorization']);
            const bid = await BidService.update(userId, req.params.deal_id, req.params.id, req.body);
            return res.status(200).json({bid});
        } catch(e){
            return res.status(400).json({msg: 'Bid not found!'});
        }
    }
}