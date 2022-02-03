const User = require('./../models/User');

module.exports = {
    async create(data){
        const user = User(data);
        user.setPassword(data.password);
        const created = await user.save();
        return created;
    },
    async findById(id){
        return await User.findById(id).exec();
    },
    async findByLogin(login){
        return await User.findOne({login: login}).exec();
    },
    async update(id, data){
        return User.findByIdAndUpdate(id, data, {new: true}, (err, user) => {
            if(err) {
                console.log(err);
                return null;
            }
            return user;
        });
    }
}