var express = require("express");
var router = express.Router();
const productController = require("../controllers/product");
const categoriesController = require("../controllers/category");
const upload = require("../middle/upload");
const authen = require("../middle/authen");
const { validationResult, check } = require("express-validator");
const socketAPI = require('../socketIO/socket_api')
//hiện trang dssp
router.get("/", async function (req, res, next) {
  const products = await productController.get();
  const categories = await categoriesController.getAllCategories();
  res.render("danhsachsp", { products: products, categories: categories });
});

//thêm mới sp
router.post("/", [authen.checkLogin], async function (req, res, next) {
  await check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is not empty")
    .bail()
    .isLength({ min: 6, max: 50 })
    .withMessage("Name min 6 max 50")
    .bail()
    .run(req);

  const result = validationResult(req);

  if (!result.isEmpty) {
    res.status(400).json({ status: false, error: result.array() });
  } else {
    const { body } = req;
    console.log("dong 36", body);
    await productController.insert(body);
    socketAPI.sendNofication('Them Moi 1 san pham')
    res.status(200).json({ status: true }); 
  }
});

//xóa sp
router.delete("/:id", [authen.checkLogin], async function (req, res, next) {
  const { params } = req;
  await productController.delete(params.id);
  socketAPI.sendNofication('Xoa 1 San Pham')
  res.json({ result: true });
});

//chi tiết sp
router.get("/:id/edit", [authen.checkLogin], async function (req, res, next) {
  const { id } = req.params;
  const product = await productController.getOne(id);
  const categories = await categoriesController.getAllCategories();
  socketAPI.sendNofication('Sua 1 San Pham')
  res.render("suasp", { product: product, categories: categories });
});

//cập nhật chi tiết sp
router.post(
  "/:id/edit",
  [upload.single("image")],
  async function (req, res, next) {
  
    let { params, body, file } = req;
    if (file) {
      const image = "http:// 10.82.74.63:3000/images/" + file.filename;
      body = { ...body, image };
    }
    body = { ...body, _id: params.id };
    await productController.update(body);
    socketAPI.sendNofication('Sua 1 San Pham')
    res.redirect("/danhsachsp");
  }
);

router.get("/:id/view", [authen.checkLogin], function (req, res, next) {
  res.render("chitietsp");
});

//cập nhật chi tiết sp
router.put("/:id/view", [authen.checkLogin], function (req, res, next) {
  //later
});

module.exports = router;
