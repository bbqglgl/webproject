const { Schema, model } = require('mongoose');
const mongooseAutoInc = require('mongoose-auto-increment');
const tipSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    good: {
        type: Number,
        default: 0,
    },
    writerId:{type:Number, default:0},
    media:[{path:String}],
    location: {
        type: { type: String },
        coordinates: []
    }
});

tipSchema.plugin(mongooseAutoInc.plugin, 'tip');

tipSchema.index({ location: "2dsphere" });
const tipModel = model('tip', tipSchema);

module.exports = tipModel;