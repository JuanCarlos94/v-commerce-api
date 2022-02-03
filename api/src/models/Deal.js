const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DealSchema = new Schema(
    {
        deal: {
            type: String, 
            enum: ['Venda', 'Troca', 'Desejo']
        },
        value: {
            type: Number,
            required: true
        },
        description: {
            type: String
        },
        trade_for: {
            type: String
        },
        location: {
            lat: {type: Schema.Types.Number},
            lng: {type: Number},
            address: {type: String},
            city: {type: String},
            state: {type: String},
            zip_code: {type: Number}
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

module.exports = mongoose.model('Deal', DealSchema);