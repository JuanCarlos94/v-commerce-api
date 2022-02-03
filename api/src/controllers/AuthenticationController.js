const AuthService = require('./../services/AuthenticationService');
const UserService = require('./../services/UserService');

module.exports = {
    authenticate: async function(req, res){
        const user = await UserService.findByLogin(req.body.login);
        if(!user){
            return res.status(400).json({msg: 'Invalid credentials.'});
        }
        if(!user.validPassword(req.body.password)){
            return res.status(400).json({msg: 'Invalid credentials.'});
        }
        const token = await AuthService.generateAuthToken(user);
        return res.status(200).json({
            token: token,
            user: user
        });
    },
    sso: async function(req, res){
        const userId = await AuthService.extractUserIdFromToken(req.body.app_token);
        if(!userId){
            return res.status(400).json({msg: 'Invalid token.'});
        }
        const user = await UserService.findById(userId);
        if(!user){
            return res.status(404).json({msg: 'User not found.'});
        }
        if(user.login !== req.body.login){
            return res.status(400).json('Invalid credentials.');
        }
        return res.status(200).json({
            token: req.body.app_token,
            user: user
        });
    }
}