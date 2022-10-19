const express = require('express');
const app=express();
const bodyprase = require('body-parser');
const path=require('path');

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

app.use('/admin',adminRouter);
app.use(shopRouter);

app.use(errorController.get404);

app.listen(3000);