const { Schema, model } = require('mongoose');
const mongooseAutoInc = require('mongoose-auto-increment');
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    goods:[{ tipsId: Number }],
    status: { type: Number, default: 1 },
    date: { type: Date, default: Date.now },
});

userSchema.plugin(mongooseAutoInc.plugin, 'user');
const userModel = model('user', userSchema);

module.exports = userModel;