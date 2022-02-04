const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user_id: {type: mongoose.SchemaTypes.ObjectId, required: true},
    deal_id: {type: mongoose.SchemaTypes.ObjectId, required: true},
    title: {type: String},
    message: {type: String}
});

MessageSchema.methods.toJSON = function(){
    let obj = this.toObject();
    delete obj.user_id;
    delete obj.deal_id;
    delete obj.__v;
    return obj;
}

module.exports = mongoose.model('Message', MessageSchema);