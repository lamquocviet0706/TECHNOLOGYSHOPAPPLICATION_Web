const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
    id: { type: ObjectId },
    address: { type: String },
    namekh: {type: String},
    totalmoney: { type: Number },
    productQuantity: { type: Number },
    productArr:{type: Array},
    published:{type:Date},
    userid:{type: ObjectId},
    status: {type: String}
});

module.exports = mongoose.model('order', orderSchema);