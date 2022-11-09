const express = require('express');
const app=express();
const bodyprase = require('body-parser');
const path=require('path');
const sequelize=require('./util/dataBase');
const Product=require('./models/product');
const User=require('./models/user');
const Cart=require('./models/cart');
const CartItem=require('./models/cart-items');
const Order=require('./models/order');
const OrderItem=require('./models/order-items');

const cors=require('cors');

app.use(bodyprase.json());

// error page
const errorController = require('./controller/error');

app.use(cors());
// Import Router
const adminRouter=require('./router/admin');
const shopRouter=require('./router/shop');
// Initailising ejs ,directly render to views folder
app.set('view engine','ejs');
app.set('views','views')
// Setting static file for css
app.use(express.static(path.join(__dirname, 'public')));

// Fixing the user
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

Cart.belongsTo(User);
User.hasOne(Cart);

Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through:OrderItem});


sequelize
// .sync({force:true})
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

    return user.createCart();  
   
})
.then(cart=>{
    app.listen(2100);
})
.catch((err)=>console.log(err));
