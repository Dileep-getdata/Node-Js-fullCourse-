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
  const product = new Product(null,title, imageUrl, description, price);
  Product.create({
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description})
  .then(()=>{
    res.redirect('/');
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
  Product.findById(prodId,product=>{
    if(!product){
        return res.redirect('/')
    }
    res.render('admin/add-product', {      
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing:editMode,
      product:product
  })
 
  });
};

exports.postEditProduct=(req,res,next)=>{
  
  const updateProductId=req.body.productId;  
  const updatePrice=req.body.price;
  const updateImage=req.body.imageUrl;
  const updateTitle=req.body.title;
  const updateDescription=req.body.description;
  const Updateproduct = new Product(updateProductId,updateTitle,updateImage,updateDescription,updatePrice);
  Updateproduct.save();
  res.redirect('/admin/products');
};

exports.deleteProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  const updatePrice=req.body.price;
  const updateImage=req.body.imageUrl;
  const updateTitle=req.body.title;
  const updateDescription=req.body.description;
  
  const product=new Product(prodId,updateTitle,updateImage,updateDescription,updatePrice);
  product.deleteById(prodId)
  .then(()=>{
    res.redirect('/admin/products');
  })
  .catch((err)=>console.log(err)); 
   
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then( ([rows,fileData])=> {
    res.render('admin/products', {
      prods: rows,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch((err)=>console.log(err));
 
};
