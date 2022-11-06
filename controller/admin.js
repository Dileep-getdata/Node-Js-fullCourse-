const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  console.log('details:::'+req.body);
  const product = new Product(null,title, imageUrl, description, price);
  req.user.createProduct({
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description

  })
  
  .then(()=>{
    console.log('CREATED PRODUCT');
    res.redirect('/admin/products');
  })
  .catch((err)=>console.log(err))
  // product.save().
  // then(()=>{
  //   res.redirect('/');
  // }).
  // catch();
 
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId=req.params.productId;
  req.user.getProducts({where:{id:prodId}})
  
  .then(products=>{
    const product=products[0];
    
    if(!product){
      return res.redirect('/')
    }
      res.render('admin/add-product', {      
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing:editMode,
      product:product
  })
})
  .catch(()=>{return res.redirect('/')});
  
   
};

exports.postEditProduct=(req,res,next)=>{
  
  const updateProductId=req.body.productId;  
  const updatePrice=req.body.price;
  const updateImage=req.body.imageUrl;
  const updateTitle=req.body.title;
  const updateDescription=req.body.description;
  Product.findByPk(updateProductId)
  .then(product=>{
    product.title=updateTitle;
    product.imageUrl=updateImage;
    product.price=updatePrice;
    product.description=updateDescription;
    return product.save();
  })
  .then(result=>{
    console.log('UPDATED Product');
    res.redirect('/admin/products');
  })
  .catch(err=>console.log(err));
  
};

exports.deleteProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  const updatePrice=req.body.price;
  const updateImage=req.body.imageUrl;
  const updateTitle=req.body.title;
  const updateDescription=req.body.description;
  
  Product.findByPk(prodId)
  .then((product)=>{
    return product.destroy();
    
  })
  .then(result=>{
    console.log("DESTROYED Product");
    res.redirect('/admin/products');
  })
  .catch((err)=>console.log(err)); 
   
}

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  .then((products)=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch((err)=>console.log(err));  
 
};
