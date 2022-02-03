const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PointSchema = require('./Point');

const DealSchema = new Schema(
    {
        type: {
            type: String, 
            enum: ['Venda', 'Troca', 'Desejo']
        },
        value: {
            type: mongoose.Decimal128,
            required: true
        },
        description: {
            type: String
        },
        trade_for: {
            type: String
        },
        location: {
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
        urgency: {
            type: {
                type: String, 
                enum: ['Baixa', 'Média', 'Alta']
            },
            limit_date:{
                type: Date
            }
        },
        photos: [
            {
                src: {type: String}
            }
        ],
        user: {
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    }
);

DealSchema.methods.setUserId = function(userId){
    this.user._id = userId;
}

DealSchema.methods.setPoint = function(){
    if(this.location.lat && this.location.lng){
        this.location.point = {type: 'Point', coordinates: [this.location.lng, this.location.lat]};
    }
}

DealSchema.methods.toJSON = function(){
    let obj = this.toObject();
    obj.value = parseFloat(obj.value.toString());
    obj.location.lng = parseFloat(obj.location.lng.toString());
    obj.location.lat = parseFloat(obj.location.lat.toString());
    obj.location.zip_code = parseFloat(obj.location.zip_code.toString());
    delete obj.location.point
    return obj;
}

module.exports = mongoose.model('Deal', DealSchema);