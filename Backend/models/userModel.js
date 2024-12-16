const { model, Schema, Types } = require('../connection');

const mySchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, reuired: true },
    city: { type: String, default: 'Unknown' },
    profile: { type: Types.ObjectId, ref: 'pages' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('user', mySchema);