var express = require("express");
var router = express.Router();
const categoriesController = require("../controllers/category");
const authen = require("../middle/authen");
/* hiển thị trang danh sách categories */
router.get("/", [authen.checkLogin],async function(req, res, next) {
    const categories = await categoriesController.getAllCategories();
    res.render("danhmuc", { categories: categories });
});

// thực hiện thêm mới category
router.post("/", [authen.checkLogin],async function(req, res, next) {
    const { body } = req;
    console.log(body.name + "  body inser");
    await categoriesController.insert(body);
    // console.log(body.available);
    res.redirect("/danhmuc");
});

// thực hiện xóa categories
router.delete("/:id",async function(req, res, next) {
    const { params } = req;
    await categoriesController.delete(params.id);
    res.json({ result: true });
});

// lấy thông chi tiết category
router.get("/:id/edit",async function(req, res, next) {
    const { id } = req.params;

    const category =await categoriesController.getOneCategory(id);
    res.render("chi-tiet-danh-muc", { category: category });
});

// sửa thông tin category
router.post("/:id/edit",async function(req, res, next) {
    let { params, body } = req;

    body = {...body, id: params.id };
    // console.log(body);
    await categoriesController.update(body);
    res.redirect("/danhmuc");
});

module.exports = router;