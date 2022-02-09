const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user_id: {type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true},
    deal_id: {type: mongoose.SchemaTypes.ObjectId, ref: 'Deal', required: true},
    title: {type: String},
    message: {type: String}
});


module.exports = mongoose.model('Message', MessageSchema);