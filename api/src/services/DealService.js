const Deal = require('./../models/Deal');

module.exports = {
    async create(userId, data){
        const deal = new Deal(data);
        deal.setUserId(userId);
        return await deal.save();
    },
    async findById(userId, id){
        const deal = await Deal.findOne({_id: id, 'user._id': userId}).exec();
        return deal;
    },
    async update(dealId, userId, data){
        return await Deal.findOneAndUpdate({_id: dealId, 'user._id': userId}, {...data, ...{user: {_id: userId}}}, {new: true}, (err, obj) => {
            if(err){
                return null;
            }
            return obj;
        });
    },
    async search(params){
        return await Deal.find({type: params.type, 'location.lat': params.lat, 'location.lng': params.lng}).exec();
    }
}