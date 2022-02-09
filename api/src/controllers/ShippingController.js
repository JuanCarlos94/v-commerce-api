const ShippingService = require('./../services/ShippingService');
const AuthService = require('./../services/AuthenticationService');
const DealService = require('./../services/DealService');
const UserService = require('./../services/UserService');

module.exports = {
    async calculateByDeal(req, res){
        let user;
        try{
            user = await AuthService.getUserByToken(req.headers['authorization']);
        } catch(e){
            return res.status(404).json({msg: 'User not found.'});
        }

        let deal;
        try{
            deal = await DealService.findById(req.params.deal_id);
        } catch(e){
            return res.status(404).json({msg: 'Deal not found.'});
        }
        try{
            const shipping = ShippingService.calculateShippingByDealAndUser(deal, user);
            return res.status(200).json(shipping);
        } catch(e){
            console.log(e);
            return res.status(500).json({msg: 'Internal error, try again!'});
        }
    },
    async calculateByDealAndUser(req, res){
        let user;
        try{
            user = await UserService.findById(req.body.user_id);
        } catch(e){
            return res.status(404).json({msg: 'User not found.'});
        }
        let deal;
        try{
            deal = await DealService.findById(req.params.deal_id);
        }catch(e){
            return res.status(404).json({msg: 'Deal not found.'});
        }
        try{
            const shipping = ShippingService.calculateShippingByDealAndUser(deal, user);
            return res.status(200).json(shipping);
        } catch(e){
            return res.status(500).json({msg: 'Internal error, try again!'});
        }
        
    }
}