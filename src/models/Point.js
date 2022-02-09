const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointSchema = new Schema({
    type: {
        type: String,
        enum: ['Point']
    },
    coordinates: {
        type: [Number]
    }
})

module.exports = PointSchema;