const fs = require('fs');
const path = require('path');


const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports=class Cart{
    static addProduct(id,productPrice){
        // fetching data from cart
        fs.readFile(p,(err,fileContent)=>{
            let cart={product:[],totalPrice:0};
            if(!err){
                cart=JSON.parse(fileContent);
            }
                // find exisitng in cart
            const existingProductIdex=cart.product.findIndex(prod=>prod.id===id);
            const exisitngProduct=cart.product[existingProductIdex];
            console.log(existingProductIdex);
            let updateProduct;

            // Add new product to cart
            if(exisitngProduct){
                updateProduct={...exisitngProduct};
                updateProduct.qty=updateProduct.qty+1;
                cart.product=[...cart.product];
                cart.product[existingProductIdex]=updateProduct;
            }else{
                updateProduct={id:id,qty:1};
                cart.product=[...cart.product,updateProduct];
            }
            cart.totalPrice=cart.totalPrice+ +productPrice;
            fs.writeFile(p,JSON.stringify(cart),err=>{
                console.log(err);
            })
            
        });

        
        
    }
}