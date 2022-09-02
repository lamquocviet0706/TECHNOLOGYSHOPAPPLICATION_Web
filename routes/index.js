var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user');
const authen = require('../middle/authen');
const { validationResult, check } = require('express-validator');

/* CRUD
C:post
R:get
U:put
D:delete
*/
//kiểm tra đăng nhập
router.get('/', [authen.checkLogin], function (req, res, next) {
  res.redirect('/danhsachsp');
});

router.get('/dangnhap', function (req, res, next) {
  res.render('dangnhap');
});

//thực hiện đăng nhập
router.post('/dangnhap', async function (req, res, next) {

  

  const { username, password } = req.body;
  const checklogin = await userController.login(username, password);
  if (checklogin) {
    const token = jwt.sign(
      { id: checklogin.id, username: checklogin.username },
      process.env.JWT_SECRET_KEY
    );
    req.session.token = token;
    res.redirect('/danhsachsp');

  } else {
    res.render('dangnhap', { err: 'username or password wrong' });

  }
});


router.get('/dangxuat', function (req, res, next) {
  req.session.destroy(function (err) {
    res.redirect('/')

  })
});
//đăng ký
router.post('/dangky', async function (req, res, next) {
  const { username, password, confirm_password } = req.body;
  const user = await userController.register(username, password, confirm_password);
  if (user) {
    res.json({ status: true, user });
  } else {
    res.json({ status: false, user });

  }
});

// router.get('/thongke', function (req, res, next) {
//   res.render('thongke');
// });
router.get('/nguoidung', function (req, res, next) {
  res.render('nguoidung');
});
// router.get('/lichsumuahang', function (req, res, next) {
//   res.render('lichsumuahang');
// });


router.get('/trangchu', function (req, res, next) {
  res.render('trangchu');
});
router.get('/chi-tiet-don-hang', function (req, res, next) {
  res.render('chi-tiet-don-hang');
});

router.post('/test-validation', async function (req, res, next) {
  await check('username').trim().isLength({min:6})
  .withMessage('Username length invalid').run(req);
  await check('password').trim().isLength({min:6})
  .withMessage('Password length invalid').bail().not().isIn(['password']).
  withMessage('Password not allowed').run(req);
  await check('password_confirmation').custom(
    (value,{req})=>{
      if(value !==req.body.password){
        throw new Error('Password confirmation not match');
      }
      return true;
    }
  ).run(req); 
  const result = validationResult(req);
  
  if (!result.isEmpty) {
    res.status(400).json({ status:false, error:result.array() });
  } else {
    res.json({ status: true });

  }
});




module.exports = router;
