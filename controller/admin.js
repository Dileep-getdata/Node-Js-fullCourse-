
const Product = require('../models/product');
const mongodb=require('mongodb');
const { title } = require('process');
const ObjectId=mongodb.ObjectId;

// GET METHOD -->'/admin/addproduct'
exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/addproduct',
    editing:false
  });
};
// 


// POST METHOD -->'/admin/addproduct'
exports.postAddProduct = (req, res, next) => {
    const { title,imageUrl, price, description } = req.body;
    // console.log('title:---'+title);    
      const product=new Product({
        title:title,
        price:price,
        imageUrl:imageUrl,
        description:description,
        userId:req.user
      
      });
        product.save()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            res.json(err);
          }); 

};
// 


// // GET FOR EDIT PAGE -->'/edit-product/:productId'
exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId=req.params.productId;
  // req.user.getProducts({where:{id:prodId}})  
  Product.findById(prodId)
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
// // 


// // POST EDIT PAGE --> '/edit-product'
exports.postEditProduct=(req,res,next)=>{  
  const updateProductId=req.body.productId;  
  const updatePrice=req.body.price;
  const updateImage=req.body.imageUrl;
  const updateTitle=req.body.title;
  const updateDescription=req.body.description;

  Product.findById(updateProductId)
  .then(product=>{
    product.title=updateTitle;
    product.price=updatePrice;
    product.imageUrl=updateImage;
    product.description=updateDescription;
    return product.save()
  })
  .then(result=>{
    console.log('UPDATED Product');
    res.redirect('/admin/products');
  })
  .catch(err=>console.log(err));  
};
  // Product.findByPk(updateProductId)
  // .then(product=>{
  //   product.title=updateTitle;
  //   product.imageUrl=updateImage;
  //   product.price=updatePrice;
  //   product.description=updateDescription;
  //   return product.save();
  // })
 
// // 


// // DELETE PRODUCT -->'/delete-product'
exports.deleteProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  const updatePrice=req.body.price;
  const updateImage=req.body.imageUrl;
  const updateTitle=req.body.title;
  const updateDescription=req.body.description;
  
  // Product.findByPk(prodId)
  Product.findByIdAndRemove(prodId) //Mongoose inbuilt method for deleting by ID 'findByIdAndRemove'
  .then((product)=>{
    return product.destroy();    
  })
  .then(result=>{
    console.log("DESTROYED Product");
    res.redirect('/admin/products');
  })
  .catch((err)=>console.log(err));    
}
// // 


// // GET METHOD -->'/products'
exports.getProducts = (req, res, next) => {

  Product.find()
  // populate: It allows us to tell the mongoose populate certain field with all details information and not just ID, It also used for 'which we can add after find()'.

// Select: It allows us to which field we want to  select or un-select.
  // .select('title price -_id')
  // .populate('userId')
  .then((products)=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch((err)=>console.log(err));   
};
// // 
