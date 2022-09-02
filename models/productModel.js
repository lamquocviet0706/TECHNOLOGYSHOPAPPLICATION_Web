const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    price: { type: Number },
    category: { type: String },
    image: { type: String },
    description: { type: String },
    available: { type: Boolean },
    published: {type:Date},
});

module.exports = mongoose.model('product', productSchema);