const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: { type: ObjectId },
    username: { type: String },
    password: { type: String },
    role: { type: Number },
});

module.exports = mongoose.model('user', userSchema);