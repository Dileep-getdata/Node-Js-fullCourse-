const getDB=require('../util/dataBase').getDB;

class Product{
  constructor(title,price,imageUrl,description){
    this.title=title;
    this.price=price;
    this.imageUrl=imageUrl;
    this.description=description;
  }
  save(){
    const db=getDB();
   return db.collection('products')
    .insertOne(this)
    .then(result=>{
      console.log(result);
    })
    .catch(err=>{
      console.log(err);
    })

  }
}

module.exports=Product;
// const Sequelize=require('sequelize');

// const sequelize=require('../util/dataBase');

// const Product=sequelize.define('product',{
//   id:{
//     type:Sequelize.INTEGER,
//     autoIncrement:true,
//     primaryKey:true,
//     allowNull:false
//   },
//   title:Sequelize.STRING,
//   price:{
//     type:Sequelize.DOUBLE,
//     // allowNull:false
//   },
//   imageUrl:{
//     type:Sequelize.STRING,
//     // allowNull:false
//   },
//   description:{
//     type:Sequelize.STRING,
//     // allowNull:false
//   }
// });

// module.exports=Product;