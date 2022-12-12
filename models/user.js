
const getDB=require('../util/dataBase').getDB;
const mongodb=require('mongodb');
const ObjectId=mongodb.ObjectId;

class User{
    constructor(username,email){
        this.name=username;
        this.email=email;
    }
    save(){
        const db=getDB();
        return db.collection('users')
        .insertOne(this)
        .then(result=>{console.log(result)})
        .catch(err=>console.log(err))
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