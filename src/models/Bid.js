const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BidSchema = Schema({
    user_id: {type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true},
    deal_id: {type: mongoose.SchemaTypes.ObjectId, ref: 'Deal', required: true},
    accepted: {type: Boolean, default: false},
    value: {type: mongoose.SchemaTypes.Decimal128, required: true},
    description: {type: String}
});

BidSchema.methods.toJSON = function(){
    let obj = this.toObject();
    obj.value = parseFloat(obj.value.toString());
    return obj;
}

module.exports = mongoose.model('Bid', BidSchema);