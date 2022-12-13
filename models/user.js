
const getDB=require('../util/dataBase').getDB;
const mongodb=require('mongodb');
const ObjectId=mongodb.ObjectId;

class User{
    constructor(username,email,cart,id){
        this.name=username;
        this.email=email;
        this.cart=cart;
        this._id=id;
    }
    save(){
        const db=getDB();
        return db.collection('users')
        .insertOne(this)
        .then(result=>{console.log(result)})
        .catch(err=>console.log(err))
    }

    addToCart(product){
        const db=getDB();
        const cartProductIndex=this.cart.items.findIndex(cp=>{
            return cp.productId.toString() === product._id.tostring();
        });
        let newQuantity=1;
        const updateCartItems=[...this.cart.items];
        if(cartProductIndex>=0){
            newQuantity=this.cart.items[cartProductIndex].quantity+1;
            updateCartItems[cartProductIndex].quantity=newQuantity;
        }else{
            updateCartItems.push({
                productId:new ObjectId(product._id),
                quantity:newQuantity
            })
        }
        const updateCart={items:updateCartItems};
        return db.collection('users').updateOne(
            {_id:new ObjectId(this._id)},
            {$set:{cart:updateCart}}
            );
    }

    getCart(){
        const db=getDB();
        const productIds=this.cart.items.map(i=>{
            return i.productId;
        });
        return db.collection('products')
        .find({_id:{$in:productIds}})
        .toArray()
        .then(products=>{
            return products.map(p=>{
                return {
                    ...p,
                    qunatity:this.cart.items.find(i=>{
                        return i.productId.toString() === p._id.toString();
                    }).qunatity
                };
            })
        })
    }
    static findById(userId){
        const db=getDB();
        return db.collection('users').findOne({_id:new ObjectId(userId)})
        .then(result=>{
            console.log(result)
        })
        .catch(err=>console.log(err))

    }

}


// const Sequelize=require('sequelize');
// const sequelize=require('../util/dataBase');7
//  const User=sequelize.define('user',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true

//     },
//     userName:{
//         type:Sequelize.STRING,

//     },
//     email:{
//         type:Sequelize.STRING,
//         unique:true
//     }

// });
module.exports=User;