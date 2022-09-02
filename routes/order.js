; var express = require('express');
var router = express.Router();
const orderController = require("../controllers/order")
const socketAPI = require('../socketIO/socket_api')
router.get('/lichsumuahang', async function (req, res, next) {
    const orders = await orderController.get();
    res.render('lichsumuahang', { orders: orders });

});

router.get('/thongke', async function (req, res, next) {
    const now = Date.now();
    const statistical = await orderController.getStatisticalInNow();
    if (statistical.length > 0) {
        res.render('thongke', { statistical: statistical, day1: now, day2: now });
    } else {
        res.render('thongke', { statistical: "Khong co data", day1: now, day2: now });
    }
});

router.post('/thongkebangngay', async function (req, res, next) {
    const { day1, day2 } = req.body;
    const statistical = await orderController.getStatisticalByDay(day1, day2);
    if (statistical.length > 0) {
        res.render('thongke', { statistical: statistical, day1: day1, day2: day2 });
    } else {
        res.render('thongke', { statistical: "Khong co data", day1: day1, day2: day2 });
    }

});

router.get('/chitietdonhang/:id', async function (req, res, next) {
    const ordersid = req.params.id
    const orders = await orderController.get();
    const order = orders?.filter(i => i._id == ordersid)[0] || {}
    const products = order.productArr

    res.render('chi-tiet-don-hang', { products });

});

router.post("/addOrder", async (req, res) => {
    const { checkOutData } = req.body
    console.log(checkOutData)
    try {
        const result = await orderController.checkoutdata(checkOutData)
        if (result) {
            res.json({ ...result, success: true })
        } else {
            res.json({ ...result, success: false })
        }
    } catch (e) {

        res.json({ e, success: false })
        console.log(e)
    }

});

router.get('/getorderbyuserid/:userid', async function (req, res, next) {
    const { userid } = req.params
    console.log(userid, "dong7")
    const orders = await orderController.getorderbyuserid(userid);
    
    if (orders) {
        res.json(orders);
    } else {
        res.json(null)
    }
    

});

router.post('/editStatusOrder/:order_id/:status', async function (req, res, next) {
    const { order_id, status } = req.params
    console.log('param', req.params)
    const orders = await orderController.updateStatusByOrderId(order_id, status);
    socketAPI.sendNofication('Sua trang thai don hang')
    if (orders) {
        res.json(orders);
    } else {
        res.json(null)
    }


});
module.exports = router;