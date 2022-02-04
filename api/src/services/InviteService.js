const Invite = require('../models/Invite');

module.exports = {
    async create(data){
        const invitation = new Invite(data);
        return await invitation.save();
    },
    async findById(id, userId){
        const invitation = await Invite.findOne({_id: id, user: userId}).exec();
        if(!invitation){
            return null;
        }
        return invitation;
    },
    async findByUser(userId){
        return await Invite.find({user: userId}).exec();
    },
    async update(id, userId, data){
        return await Invite.findOneAndUpdate({_id: id, user: userId}, data, {new: true}, (err, doc) => {
            if(err){
                console.log(err);
                return null;
            }
            return doc;
        });
    }
}