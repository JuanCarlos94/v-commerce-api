const Shipping = require('./../models/Shipping');

module.exports = {
    calculateShippingByDealAndUser(deal, user){
        const shipping = new Shipping();
        shipping.delivery.from = deal.location;
        shipping.delivery.to = user.location;
        shipping.calculateShipping();
        shipping.addStep({location: 'Send', incoming_date: Date.now(), outcoming_date: Date.now()});
        shipping.addStep({location: 'In transport', incoming_date: Date.now(), outcoming_date: Date.now()});
        shipping.addStep({location: 'Delivered', incoming_date: Date.now(), outcoming_date: Date.now()});
        return shipping;
    }
}