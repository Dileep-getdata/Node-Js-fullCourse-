const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const db=require('../util/dataBase');

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('INSERT INTO products(title,price,description,imageUrl) VALUES (?,?,?,?)',
    [this.title,this.price,this.description,this.imageUrl]);
    // getProductsFromFile(products => {
    //   if(this.id){        
    //     const existingIndex=products.findIndex(prodId=>prodId.id===this.id);
    //     const updateProduct=[...products];
    //     updateProduct[existingIndex]=this;  
    //     console.log('update')      
    //     fs.writeFile(p, JSON.stringify(updateProduct), err => {
    //       console.log(err);
    //     });

    //   }else{
    //     this.id=Math.random().toString();   
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(products), err => {
    //       console.log(err);
    //     });
    //     };
    //   });
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id){
   return db.execute('SELECT * FROM products WHERE products.Id = ?',[id]);
  }

  deleteById(id){
    return db.execute('DELETE FROM products WHERE products.Id = ?',[id]);
    // getProductsFromFile(products => {             
    //     const updateDeletion=products.filter(prodId=>prodId.id!==id);           
    //       fs.writeFile(p, JSON.stringify(updateDeletion), err => {
    //         console.log(err);          
    //       });
    // });
  };
        
    

};
