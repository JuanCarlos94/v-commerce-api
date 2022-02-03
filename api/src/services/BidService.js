const Bid = require('./../models/Bid');

module.exports = {
    async findById(dealId, id){
        return await Bid.findOne({_id: id, deal_id: dealId}).exec();
    },
    async findByDealId(dealId){
        return await Bid.find({deal_id: dealId}).exec();
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
    }
}