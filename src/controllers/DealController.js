const DealService = require('./../services/DealService');
const BidService = require('./../services/BidService');
const AuthService = require('./../services/AuthenticationService');

module.exports = {
    findById: async function (req, res) {
        try {
            const deal = await DealService.findById(req.params.id);
            return res.status(200).json({
                deal: deal
            });
        } catch (e) {
            return res.status(404).json({
                msg: 'Deal not found.'
            });
        }
    },
    search: async function (req, res) {
        const userId = await AuthService.extractUserIdFromToken(req.headers['authorization']);
        const deals = await DealService.search(req.query, userId);
        return res.status(200).json(deals);
    },
    listByUser: async function (req, res) {
        const _id = await AuthService.extractUserIdFromToken(req.headers['authorization']);
        if(!_id) {
            return res.status(401).json({msg: 'Access denied.'})
        }
        const deals = await DealService.listByUserId(_id);
        return res.status(200).json(deals);
    },
    create: async function (req, res) {
        const userId = await AuthService.extractUserIdFromToken(req.headers['authorization']);
        if (!userId) {
            return res.status(401).json({
                msg: 'Access denied.'
            });
        }
        try {
            const deal = await DealService.create(userId, req.body);
            return res.status(201).json({
                deal: deal
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                msg: 'Internal error, try again.'
            });
        }
    },
    update: async function (req, res) {
        const userId = await AuthService.extractUserIdFromToken(req.headers['authorization']);
        if (!userId) {
            return res.status(403).json({
                msg: 'Access denied.'
            });
        }
        const updated = await DealService.update(req.params.id, userId, req.body);
        if (!updated) {
            return res.status(404).json({
                msg: 'Error when updating, try again!'
            });
        }
        return res.status(200).json(updated);
    },
    async listByDealWhereUserBid(req, res){
        const userId = await AuthService.extractUserIdFromToken(req.headers['authorization']);
        let bids = await BidService.listByUserOwner(userId);
        let deals = [];
        for(const bid of bids){
            let deal = await DealService.findById(bid.deal_id);
            deals.push(deal);
        }
        return res.status(200).json(deals);
    }
}