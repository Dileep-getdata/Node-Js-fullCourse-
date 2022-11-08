const Product = require('../models/product');
const Cart=require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((product)=>{
    res.json({product,success:true});
    // res.render('shop/product-list', {
    //   prods: product,
    //   pageTitle: 'All Products',
    //   path: '/products'
   
    
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
  req.user.getCart()
  .then(cart=>{
    cart.getProducts()
    .then(products=>{
      res.json({products,success:true})
      // res.render('shop/cart', {
      //   path: '/cart',
      //   pageTitle: 'Your Cart',
      //   products:products
      // });
    })
    .catch(err=>console.log(err))
  })
  .catch(err=>console.log(err))
  
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.postCart=(req,res,next)=>{
  const prodId=req.body.productId;
  let newQuantity=1;
  console.log('Product ID:'+prodId)
  let fetchCart;

  req.user.getCart()
  .then(cart=>{
     fetchCart=cart;
    cart.getProducts({where:{id:prodId}})
    .then(products=>{
      let product;
      if(products.length>0){
        product=products[0];
      }      
      if(product){
        const oldQuantity=product.cartItem.quantity;
        newQuantity=oldQuantity+1;
        return product
      }
      return Product.findByPk(prodId)
    })
    .then(product=>{
        return fetchCart.addProduct(product,{through:{quantity:newQuantity}})
    })
      .catch(err=>console.log(err))    
    
  })
  .then(()=>{
    res.status(200).json({success:true,message:'Successfully added to cart'})
  })
  .catch((err)=>{
    res.status(500).json({success:false,message:'Error occured'})
  });
 
}

exports.postCartDelete=(req,res,next)=>{
  const prodId=req.body.productId
  req.user.getCart()
  .then((cart)=>{
    return cart.getProducts({where:{id:prodId}})
  })
  .then(products=>{
    const product=products[0];
    return product.cartItem.destroy();
  })
  .then(()=>{
    // res.redirect('/cart')
    res.status(200).json({success:true,message:'Successfully removes item from cart'})
  })
  .catch(err=>console.log(err))
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
