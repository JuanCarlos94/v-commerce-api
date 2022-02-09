const Bid = require('./../models/Bid');
const Deal = require('./../models/Deal');

module.exports = {
    async findById(dealId, id){
        return await Bid.findOne({_id: id, deal_id: dealId}).exec();
    },
    async findByDealId(dealId){
        return await Bid.find({deal_id: dealId}).populate('user_id', 'name').exec();
    },
    async findByDealAndUserId(dealId, userId){
        return await Bid.findOne({deal_id: dealId, user_id: userId}).exec();
    },
    async create(dealId, data){
        const bid = new Bid(Object.assign({deal_id: dealId}, data));
        return await bid.save();
    },
    async update(userId, dealId, id, data){
        return await Bid.findOneAndUpdate({_id: id, deal_id: dealId, user_id: userId}, data, {new: true}, (err, doc) => {
            if(err) {
                console.log(err)
                return null;
            }
            return doc;
        });
    },
    async accept(userId, dealId, id, data){
        const deal = await Deal.findOne({'user._id': userId, _id: dealId}).exec();
        if(!deal){
            throw "You don't have access to this deal.";
        }
        await deal.update({closed: true});
        const bid = await Bid.findOne({_id: id, deal_id: dealId}).exec();
        if(!bid){
            throw "You don't have access to this bid.";
        }
        return await Bid.findOneAndUpdate({_id: id, deal_id: dealId}, {accepted: true}, {new: true}, (err, doc) => {
            if(err) {
                console.log(err)
                return null;
            }
            return doc;
        });
    },
    async listByUserOwner(userId){
        const bids = await Bid.find({user_id: userId}).exec();
        return bids;
    }
}