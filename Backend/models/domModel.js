const { model, Schema, } = require('../connection');

const mySchema = new Schema({
    user: String,
    dom: String,
    title: String,
    Link: { type: String, unique: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('domData', mySchema);