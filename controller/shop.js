const Product = require('../models/product');
const Cart=require('../models/cart');
const Order=require('../models/order');

// const item_per_page=2;

// // <<<<<<<<----  GET ALL PRODUCTS -->'/getAllProduct'---- >>>>>>>
// // 
exports.getAllProducts=(req,res,next)=>{
  Product.find()
  .then(response=>{
    res.json({result:response});
  }).catch(err=>console.log(err));
} 
// // ==============================================================



// // <<<<<<<<<-----GET PRODUCTS PAGE -->'/products' ------->>>>>>>
// // 
exports.getProducts = (req, res, next) => {
  const page = req.query.page ;   
  Product.find({    
    limit:item_per_page,
    offset:page*item_per_page
  })
  .then(product=>{
    res.json({result:product})
  })
  .catch(err=>console.log(err));
};
// // ===================================================================


    
// // <<<<<<<<<-----GET EACH PRODUCT DETAILS -->'/product/:productId'------->>>>>>>
// // 
exports.getProduct = (req, res, next) => {
  const prodId=req.params.productId ;
  Product.findById(prodId)
  .then((product)=>{
    res.render('shop/product-details',{
      product:product,
      pageTitle:product.title,
      path:'/product'
    });
  }).catch((err)=>console.log(err)); 
  
};
// // ===========================================================


// //----------------- GET INDEX PAGE '/'
exports.getIndex = (req, res, next) => {
  const page=req.query.page;
  console.log(page);
  Product.find()   
  .then((result)=>{
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
// // ========================================================




// // -----------------------CART--------------------
// // 
// // GET CART -->'/cart'
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
// // 

// // POST CART DATA -->'/cart'
exports.postCart=(req,res,next)=>{
    const prodId=req.body.productId;
    Product.findById(prodId).then(product=>{
      return req.user.addToCart(product)
    }).then(result=>{
      console.log(result);
    })

}

// exports.postCart=(req,res,next)=>{
//   const prodId=req.body.productId;
//   let newQuantity=1;
//   console.log('Product ID:'+prodId)
//   let fetchCart;

//   req.user.getCart()
//   .then(cart=>{
//      fetchCart=cart;
//     cart.getProducts({where:{id:prodId}})
//     .then(products=>{
//       let product;
//       if(products.length>0){
//         product=products[0];
//       }      
//       if(product){
//         const oldQuantity=product.cartItem.quantity;
//         newQuantity=oldQuantity+1;
//         return product
//       }
//       return Product.findByPk(prodId)
//     })

//     .then(product=>{
//         return fetchCart.addProduct(product,{through:{quantity:newQuantity}})
//     })
//       .catch(err=>console.log(err))   
//   })

//   .then(()=>{
//     res.status(200).json({success:true,message:'Successfully added to cart'})
//   })
//   .catch((err)=>{
//     res.status(500).json({success:false,message:'Error occured'})
//   }); 
// }
// // 
// // 
// // DELETE ITEM FROM CART -->'/cart-delete-item'
exports.postCartDelete=(req,res,next)=>{
  if(!req.body.productId){
    res.status(400).json({success:false,message:'Error at sending product ID'})
  }
  const prodId=req.body.productId
  req.user
  .deleteCartItems(prodId)
  
  .then(()=>{
    res.redirect('/cart')
    res.status(200).json({success:true,message:'Successfully removes item from cart'})
  })
  .catch(()=>{
    res.status(500).json({success:false,message:'Error at removeing item from cart'})
  })
} 


// exports.postCartDelete=(req,res,next)=>{
//   if(!req.body.productId){
//     res.status(400).json({success:false,message:'Error at sending product ID'})
//   }
//   const prodId=req.body.productId
//   req.user.getCart()
//   .then((cart)=>{
//     return cart.getProducts({where:{id:prodId}})
//   })
//   .then(products=>{
//     const product=products[0];
//     return product.cartItem.destroy();
//   })
//   .then(()=>{
//     // res.redirect('/cart')
//     res.status(200).json({success:true,message:'Successfully removes item from cart'})
//   })
//   .catch(()=>{
//     res.status(500).json({success:false,message:'Error at removeing item from cart'})
//   })
// } 
// // 
// // =========================CART END=========================




// // ------------------------ORDER PAGE-------------------------
// // 
// // GET THE ORDERS PAGE -->'/orders'
exports.getOrders = (req, res, next) => {
  // {include: ['products']}
  // req.user.getOrders({include:['products']})

  req.user.getOrders()
  .then(orders=>{        
      res.json({orders,success:true});  
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders:orders
    });
  })
  .catch(err=>console.log(err)); 
};
// // 
// // 
// // POST DATA TO ORDER FROM CART PAGE -->'/create-order'
exports.postOrder=(req,res,next)=>{
    
    req.user.addOrder()    
    .then(result=>{      
      res.status(200).json({success:true,message:'Successfully added to order'});
    })
    .catch(err=>{
      res.status(500).json({success:false,message:'Error  adding to order'});
    });
  }

// exports.postOrder=(req,res,next)=>{
//   let fetchCart;
//   req.user.getCart()
//   .then(cart=>{
//     fetchCart=cart;
//     return cart.getProducts();
//   })
//   .then(products=>{
//     return req.user.createOrder()
//     .then(order=>{
//       order.addProducts(products.map(product=>{
//          product.orderItem={quantity:product.cartItem.quantity};
//         return product;
//       }))
//     })
//     .catch(err=>console.log(err))
//   })
//   .then(result=>{
//     return fetchCart.setProducts(null);
//   })
//   .then(result=>{
    
//     res.status(200).json({success:true,message:'Successfully added to order'});
//   })
//   .catch(err=>{
//     res.status(500).json({success:false,message:'Error  adding to order'});
//   });
// }
// // 
// // 
// // =========================ORDER END=========================






// // exports.getCheckout = (req, res, next) => {
// //   res.render('shop/checkout', {
// //     path: '/checkout',
// //     pageTitle: 'Checkout'
// //   });
// // };
