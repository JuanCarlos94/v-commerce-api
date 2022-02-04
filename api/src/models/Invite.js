const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InviteSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    user: {type: mongoose.SchemaTypes.Decimal128, required: true},
    user_invited: {type: mongoose.SchemaTypes.Decimal128, required: true}
});

module.exports = mongoose.model('Invite', InviteSchema);