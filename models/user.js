const Sequelize=require('sequelize');

const sequelize=require('../util/dataBase');

const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true

    },
    userName:{
        type:Sequelize.STRING,

    },
    email:{
        type:Sequelize.STRING,
        unique:true
    }

});
module.exports=User;