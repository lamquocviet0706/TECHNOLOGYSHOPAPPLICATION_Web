const orderModel = require('../models/OrderModel');

exports.get = async function () {

    return await orderModel.find();
}
exports.addorder = async function (checkoutdata) {
    const order = new orderModel(checkoutdata);
    return await order.save();
}
exports.getorderbyuserid = async function (userid) {
    return await orderModel.find({ userid: userid })
};

exports.editStatusByOrderId = async function (id, status) {
    return await orderModel.update({ _id: id }, { $set: { status: status } })
};

exports.getStatisticalInNow = async function () {
    const now = Date.now();
    return await orderModel.find({
        "published": now
    })
}

exports.getStatisticalByDay = async function (day1, day2) {
    console.log(new Date(day1).getTime());
    try {
        const filters = {
            published: {
                $gte: day1,
                $lt: day2,
            },
        };

        return await orderModel.find({}).where(filters);
    } catch (e) {
        console.log(e)
    }

}
