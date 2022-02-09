const Message = require('./../models/Message');

module.exports = {
    async create(dealId, userId, data){
        const msg = new Message(Object.assign({deal_id: dealId}, data));
        msg.user_id = userId;
        msg.deal_id = dealId;
        return await msg.save();
    },
    async findById(id, dealId){
        return await Message.findOne({_id: id, deal_id: dealId}).exec();
    },
    async findByDealId(dealId){
        return await Message.find({deal_id: dealId}).populate('user_id', 'name').exec();
    },
    async update(id, dealId, data){
        return await Message.findOneAndUpdate({_id: id, deal_id: dealId}, data, (err, doc) => {
            if(err){
                return null;
            }
            return doc;
        });
    }
}