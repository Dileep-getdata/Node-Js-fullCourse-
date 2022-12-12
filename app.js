const express = require('express');

// ---> Middleware:-  (Middleware is software that lies between an operating system and the applications running on it.
//  Essentially functioning as hidden translation layer, 
// middleware enables communication and data management for distributed applications.)

const app=express();
// 

const dotenv=require('dotenv');
dotenv.config();

const path=require('path');
// const sequelize=require('./util/dataBase');


// import from Models
const Product=require('./models/product');
const User=require('./models/user');
// const Cart=require('./models/cart');
// const CartItem=require('./models/cart-items');
// const Order=require('./models/order');
// const OrderItem=require('./models/order-items');
// 


//---> cors:- (Cross-Origin Resource Sharing (CORS) is an HTTP-header based 
// mechanism that allows a server to indicate any origins (domain, scheme, or port) 
// other than its own from which a browser should permit loading resources.)

const cors=require('cors');
app.use(cors());
// 

// Bodyparser
const bodyprase = require('body-parser');
app.use(bodyprase.json());
// 

// error page
const errorController = require('./controller/error');
app.use(errorController.get404);
// 



// Import Router
const adminRouter=require('./router/admin');
// const shopRouter=require('./router/shop');
app.use('/admin',adminRouter);
// app.use(shopRouter);
// 

// Initailising ejs ,directly render to views folder
app.set('view engine','ejs');
app.set('views','views');
// 

// Setting static file for css
app.use(express.static(path.join(__dirname, 'public')));
// 

// Fixing the user
app.use((req,res,next)=>{
    User.findById(1)
    .then(user=>{
        req.user=user;
        next();
    })
    .catch(err=> console.log(err));
})


// 

// // Front end response
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,`public/${req.url}`));
})
// // 




// // Sequelize relatio association
// Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
// User.hasMany(Product);

// Cart.belongsTo(User);
// User.hasOne(Cart);

// Cart.belongsToMany(Product,{through:CartItem});
// Product.belongsToMany(Cart,{through:CartItem});

// Order.belongsTo(User);
// User.hasMany(Order);

// Order.belongsToMany(Product,{through:OrderItem});
// Product.belongsToMany(Order,{through:OrderItem});
// // 


// //---> sync():- is used to synchronize your Sequelize model with your database tables. 
// // The synchronization happens at the table level. 
// // When your table doesn't exist the sync() method will generate and run a CREATE TABLE statement for you.

// sequelize
// // .sync({force:true})
// .sync()
// .then(result=>{
//    return User.findByPk(1);
// }).then(user=>{
//     if(!user){
//         return User.create({userName:'Tester1',email:'tester1@gmail.com'})
//     }
//     return user;
// })
// .then((user)=>{
//     return user.createCart();    
// })
// .then(cart=>{
//     app.listen(2100);
// })
// .catch((err)=>console.log(err));
// // 

// MongoDB
const mongoConnect=require('./util/dataBase').mongoConnect;
console.log(mongoConnect);
mongoConnect(client=>{
    
    console.log(client);
    app.listen(2100);
})
