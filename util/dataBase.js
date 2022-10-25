const Sequelize=require('sequelize');
const sequelize=new Sequelize('nodejs-course','root','VSsd@45337',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;

