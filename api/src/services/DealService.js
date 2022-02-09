const Deal = require('./../models/Deal');
const mongoose = require('mongoose');

module.exports = {
    async create(userId, data){
        const deal = new Deal(data);
        if(data.urgency.limit_date && data.urgency.limit_date.includes('/')){
            deal.urgency.limit_date = this.formatDate(data.urgency.limit_date);
        }
        deal.value = parseFloat(data.value.replace('.', '').replace(',', "."));
        deal.setUserId(userId);
        deal.setPoint();
        return await deal.save();
    },
    formatDate(val){
        const l = val.split('/');
        return l[2] + '-' + l[1] + '-' + l[0];
    },
    async findByIdAndUser(userId, id){
        const deal = await Deal.findOne({_id: id, 'user._id': userId}).exec();
        return deal;
    },
    async findById(id){
        return await Deal.findById(id).exec();
    },
    async update(dealId, userId, data){
        return await Deal.findOneAndUpdate({_id: dealId, 'user._id': userId}, {...data, ...{user: {_id: userId}}}, {new: true}, (err, obj) => {
            if(err){
                return null;
            }
            return obj;
        });
    },
    async listByUserId(id){
        return await Deal.find({'user._id': id}).exec();
    },
    async search(params, userId){
        let query = {closed: false, 'user._id': {$ne: userId}};
        query = params.type ? Object.assign({type: params.type}, query) : query;
        if(params.value_start && params.value_end){
            query = Object.assign({value: {$gte: params.value_start, $lte: params.value_end}}, query)
        } else if(params.value_start) {
            query = Object.assign({value: {$gte: params.value_start}}, query);
        } else if(params.value_end){
            query = Object.assign({value: {$lte: params.value_end}}, query);
        }

        if(params.term){
            let regex = new RegExp(params.term, 'i');
            query = Object.assign({$and: [{$or: [{trade_for: regex}, {description: regex}]}]}, query);
        }

        return await Deal.find(query);
    }
}