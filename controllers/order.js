const orderService = require("../services/order");

exports.checkoutdata = async function (checkoutdata) {
    return await orderService.addorder(checkoutdata);
}
exports.get = async function () {
    return await orderService.get();
}

exports.getorderbyuserid = async function (userid) {
    return await orderService.getorderbyuserid(userid);
}

exports.updateStatusByOrderId = async function (id, status) {
    return await orderService.editStatusByOrderId(id, status);
}

exports.getStatisticalInNow = async function () {
    return await orderService.getStatisticalInNow();
}
exports.getStatisticalByDay = async function (day1, day2) {
    console.log(await orderService.getStatisticalByDay(day1, day2))
    return await orderService.getStatisticalByDay(day1, day2);
}
