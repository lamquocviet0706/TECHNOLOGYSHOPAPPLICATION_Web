var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/nguoidung', async function(req, res, next) {
  const users = await userController.get();
  let newuser =[]
  if(users?.length>0){
     newuser = users.map(i=>{
      if(i.role === 1 )
      return {...i._doc,role:"quản trị viên"}
      else{
        return {...i._doc,role:"người dùng"}
      }
    })
console.log("dong21",newuser)
  }
    res.render('nguoidung',{users:newuser});
    
  });
router.post('/switch-role/:id', async function(req, res, next) {
  const {params} = req;
     await userController.switchrole(params.id);
    
      res.json({"status":true});
    });
module.exports = router;
