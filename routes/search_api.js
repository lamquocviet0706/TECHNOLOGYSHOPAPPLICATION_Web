var express = require('express');
var router = express.Router();
const productController = require('../controllers/product');
const categoryController = require('../controllers/category');
const upload = require('../middle/upload');
const authen = require('../middle/authen');
const { validationResult, check } = require('express-validator');
const { response } = require('../app');


router.get('/search', async function(req, res, next) {
    try {
      const text = req.params;
    
        if(text){
            const product = await productController.search(text);
            res.json(product);
        }
        else{
            
            const products = await productController.get();
            res.json(products);
        }
      
    } catch (error) {
      
    }
    
    });
    router.get('/products', async function(req, res, next) {
      console.log("Dong 31 search_api")
        try {
          const products = await productController.get();
          
          res.json(products);
        
        } catch (error) {
          console.log('Get product list :' ,error);
        }
      });




module.exports = router;