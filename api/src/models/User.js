const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const UserSchema = new Schema(
    {
        id: Number,
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        login: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        salt: {type: String, required: true},
        location: {
            lat: {type: Number},
            lng: {type: Number},
            address: {type: String},
            city: {type: String},
            state: {type: String},
            zip_code: {type: Number}
        }
    }
);

// Used to create an id as type int
UserSchema.pre('save', function(next){
    this.id = Date.now();
    next();
});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
}

UserSchema.methods.validPassword = function(password){
    var password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.password = password;
}

UserSchema.methods.toJSON = function(){
    var obj = this.toObject();
    delete obj._id;
    delete obj.salt;
    delete obj.__v;
    return obj;
}


module.exports = mongoose.model('User', UserSchema);