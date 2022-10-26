const Product = require('../models/product');
const Cart=require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((product)=>{
    res.render('shop/product-list', {
      prods: product,
      pageTitle: 'All Products',
      path: '/products'
   
    });
  }).catch((err)=>console.log(err));
  
};

exports.getProduct = (req, res, next) => {
  const prodId=req.params.productId ;
  Product.findByPk(prodId)
  .then((product)=>{
    res.render('shop/product-details',{
      product:product,
      pageTitle:product.title,
      path:'/product'
    });
  }).catch((err)=>console.log(err));
 
  
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then((result)=>{
    res.render('shop/index', {
      prods: result,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch((err)=>console.log(err));
  // Product.fetchAll()
  // .then(([rows,fileData])=> {
  //   res.render('shop/index', {
  //     prods: rows,
  //     pageTitle: 'Shop',
  //     path: '/'
  //   });
  // })
  // .catch((err)=>
  //   console.log(err)
  // );
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.postCart=(req,res,next)=>{
  const prodId=req.body.productId;
 Product.findById(prodId,product=>{
  Cart.addProduct(prodId,product.price);
  res.redirect('/cart')
 })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
