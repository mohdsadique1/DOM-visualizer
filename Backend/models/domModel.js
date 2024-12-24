const { model, Schema, Types } = require('../connection');

const mySchema = new Schema({
    user: { type: Types.ObjectId, ref: 'user' },
    code: { type: String, default: '' },
    title: { type: String, require: true },
    url: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('domData', mySchema);