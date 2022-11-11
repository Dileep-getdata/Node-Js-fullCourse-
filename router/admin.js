const express=require('express');

const router=express.Router();
const adminController = require('../controller/admin'); 

// /admin/add-product => GET
router.get('/addproduct', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/addproduct', adminController.postAddProduct);

router.get('/edit-product/:productId',adminController.getEditProduct);

router.post('/edit-product',adminController.postEditProduct);

router.post('/delete-product',adminController.deleteProduct);

module.exports=router