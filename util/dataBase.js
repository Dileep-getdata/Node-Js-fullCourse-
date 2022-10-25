const mysql=require('mysql2');
const pool=mysql.createPool({
host:'localhost',
user:'root',
database:'nodejs-course',
password:'VSsd@45337'
});

module.exports=pool.promise();