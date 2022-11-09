const path = require('path');

const express = require('express');
const Product=require('../models/product');

const shopController = require('../controller/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/product/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/create-order',shopController.postOrder);
// 
router.post('/addproducts',(req,res)=>{


    const { title,imageUrl, price, description } = req.body;
    console.log(title);    
        let userId=1;
        Product.create({
          title,
          imageUrl,
          price,
          description,
          userId
        
        })
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            res.json(err);
          });  
        
    
    });



router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

router.post('/cart-delete-item',shopController.postCartDelete)

module.exports = router;
