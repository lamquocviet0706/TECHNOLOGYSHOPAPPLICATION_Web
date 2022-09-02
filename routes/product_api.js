var express = require('express');
var router = express.Router();
const productController = require('../controllers/product');
const categoryController = require('../controllers/category');
const upload = require('../middle/upload');
const authen = require('../middle/authen');
const { validationResult, check } = require('express-validator');
const socketAPI = require('../socketIO/socket_api')


//hiện trang dssp
router.get('/getAllProducts', async function(req, res, next) {
  try {
    const products = await productController.get();
    if(products) 
    {
      const data = {data: products, success: true}
      res.json(data)
    }
    else 
    {
      const data = {success: false}
      res.json(data)
    }
  
  } catch (error) {
    console.log('Get product list :' ,error);
  }
});
  

  router.get('/getone/:id', async function(req, res, next) {
    try {
      const {id} = req.params;
      const product = await productController.getOne(id);
    // const categories = await categoryController.getAllCategories();
  
      res.json(product);
    } catch (error) {
      console.log('Get One product :',error);
    }
    
    });
    router.get('/getByCat/:category', async function(req, res, next) {
      try {
        const {category} = req.params;
        
        const product = await productController.getByCat(category);
      // const categories = await categoryController.getAllCategories();
    
        res.json(product);
      } catch (error) {
        console.log('Get category :',error); res.json(error);
      }
      });


      router.get('/socket', async function(req, res, next) {
        const {msg} = req.body
        socketAPI.sendNofication(msg)
       res.status(200).json({status: true});
      });

    router.get('/socket_test', async function(req, res, next) {
    res.render('socket')
    });

  module.exports = router;