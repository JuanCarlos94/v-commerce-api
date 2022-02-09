const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InviteSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    user: {type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User'},
    user_invited: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Invite', InviteSchema);