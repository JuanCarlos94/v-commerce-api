const User = require('./../models/User');

module.exports = {
    async create(data){
        const user = User(data);
        user.setPassword(data.password);
        const created = await user.save();
        return created;
    },
    async findById(id){
        return await User.findOne({id: id}).exec();
    },
    async findByLogin(login){
        return await User.findOne({login: login}).exec();
    },
    async update(id, data){
        const user = this.findById(id);
        return await user.update(data);
    },
    async findByEmail(email){
        return await User.findOne({email: email}).exec();
    }
}