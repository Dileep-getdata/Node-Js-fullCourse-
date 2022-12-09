
const Product = require('../models/product');

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
      const product=new Product(title,price,imageUrl,description);
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
// exports.getEditProduct = (req, res, next) => {
//   const editMode=req.query.edit;
//   if(!editMode){
//     return res.redirect('/');
//   }
//   const prodId=req.params.productId;
//   req.user.getProducts({where:{id:prodId}})  
//   .then(products=>{
//     const product=products[0];    
//     if(!product){
//       return res.redirect('/')
//     }
//       res.render('admin/add-product', {      
//       pageTitle: 'Edit Product',
//       path: '/admin/edit-product',
//       editing:editMode,
//       product:product
//   })
// })
//   .catch(()=>{return res.redirect('/')});  
   
// };
// // 


// // POST EDIT PAGE --> '/edit-product'
// exports.postEditProduct=(req,res,next)=>{  
//   const updateProductId=req.body.productId;  
//   const updatePrice=req.body.price;
//   const updateImage=req.body.imageUrl;
//   const updateTitle=req.body.title;
//   const updateDescription=req.body.description;
//   Product.findByPk(updateProductId)
//   .then(product=>{
//     product.title=updateTitle;
//     product.imageUrl=updateImage;
//     product.price=updatePrice;
//     product.description=updateDescription;
//     return product.save();
//   })
//   .then(result=>{
//     console.log('UPDATED Product');
//     res.redirect('/admin/products');
//   })
//   .catch(err=>console.log(err));  
// };
// // 


// // DELETE PRODUCT -->'/delete-product'
// exports.deleteProduct=(req,res,next)=>{
//   const prodId=req.body.productId;
//   const updatePrice=req.body.price;
//   const updateImage=req.body.imageUrl;
//   const updateTitle=req.body.title;
//   const updateDescription=req.body.description;
  
//   Product.findByPk(prodId)
//   .then((product)=>{
//     return product.destroy();    
//   })
//   .then(result=>{
//     console.log("DESTROYED Product");
//     res.redirect('/admin/products');
//   })
//   .catch((err)=>console.log(err));    
// }
// // 


// // GET METHOD -->'/products'
// exports.getProducts = (req, res, next) => {

//   req.user.getProducts()
//   .then((products)=>{
//     res.render('admin/products', {
//       prods: products,
//       pageTitle: 'Admin Products',
//       path: '/admin/products'
//     });
//   })
//   .catch((err)=>console.log(err));   
// };
// // 
