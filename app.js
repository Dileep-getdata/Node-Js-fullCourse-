const express = require('express');
const app=express();
const bodyprase = require('body-parser');
const path=require('path');
const sequelize=require('./util/dataBase');
const Product=require('./models/product');
const User=require('./models/user');

app.use(bodyprase.urlencoded({ extended: false }));

// error page
const errorController = require('./controller/error');


// Import Router
const adminRouter=require('./router/admin');
const shopRouter=require('./router/shop');
// Initailising ejs ,directly render to views folder
app.set('view engine','ejs');
app.set('views','views')
// Setting static file for css
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user=user;
        next();
    })
    .catch(err=> console.log(err));
})

app.use('/admin',adminRouter);
app.use(shopRouter);

app.use(errorController.get404);

// Sequelize relatio association
Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product);

sequelize
.sync()
.then(result=>{
   return User.findByPk(1);
}).then(user=>{
    if(!user){
        return User.create({userName:'Tester1',email:'tester1@gmail.com'})
    }
    return user;
})
.then((user)=>{
    console.log(user);
    app.listen(3000);
})
.catch((err)=>console.log(err));
