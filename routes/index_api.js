var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user');
const authen = require('../middle/authen');
const { validationResult, check } = require('express-validator');



router.post('/dangky', async function (req, res, next) {
    const { username, password, confirm_password } = req.body;
    const user = await userController.register(username, password, confirm_password);
    if (user) {
        res.json({ success: true, user });
    } else {
        res.json({ success: false });

    }
});


router.post('/dangnhap', async function (req, res, next) {

    const { username, password } = req.body;
    const checklogin = await userController.loginAPI(username, password);
    
    if (checklogin) {
        const token = jwt.sign(
            { id: checklogin.id, username: checklogin.username },
            process.env.JWT_SECRET_KEY
        );
        
        res.json({ success: true ,user:checklogin, token   });

    } else {
        res.json({ success: false });

    }
});

router.post('/dangxuat', function (req, res, next) {
    req.session.destroy(function (err) {
        if(err){
        res.json({ status: false });
    }else{
        res.json({ status: true });
    }
  
    })
  });

module.exports = router;
