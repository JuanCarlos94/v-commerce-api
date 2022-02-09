const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PointSchema = require('./Point');

const ShippingSchema = new Schema({
    delivery: {
        from: {
            lat: {type: mongoose.Decimal128},
            lng: {type: mongoose.Decimal128},
            address: {type: String},
            city: {type: String},
            state: {type: String},
            zip_code: {type: mongoose.Decimal128},
            point: {
                type: PointSchema
            }
        },
        to: {
            lat: {type: mongoose.Decimal128},
            lng: {type: mongoose.Decimal128},
            address: {type: String},
            city: {type: String},
            state: {type: String},
            zip_code: {type: mongoose.Decimal128},
            point: {
                type: PointSchema
            }
        },
        value: {type: mongoose.SchemaTypes.Decimal128, required: true},
    },
    steps: [
        {
            location: {type: String},
            incoming_date: {type: Date},
            outcoming_date: {type: Date}
        }
    ]
});

ShippingSchema.methods.calculateShipping = function(){
    this.delivery.value = 100;
}

ShippingSchema.methods.addStep = function(step){
    if(this.steps.length === 0){
        this.steps = [];
    }
    this.steps.push(step);
}

ShippingSchema.methods.toJSON = function(){
    let obj = this.toObject();
    obj.delivery.value = parseFloat(obj.delivery.value.toString());
    obj.delivery.to.lng = parseFloat(obj.delivery.to.lng.toString());
    obj.delivery.to.lat = parseFloat(obj.delivery.to.lat.toString());
    obj.delivery.to.zip_code = parseFloat(obj.delivery.to.zip_code.toString());
    obj.delivery.from.lng = parseFloat(obj.delivery.from.lng.toString());
    obj.delivery.from.lat = parseFloat(obj.delivery.from.lat.toString());
    obj.delivery.from.zip_code = parseFloat(obj.delivery.from.zip_code.toString());
    delete obj.delivery.from.point;
    delete obj.delivery.to.point;
    return obj;
}

module.exports = mongoose.model('Shipping', ShippingSchema);