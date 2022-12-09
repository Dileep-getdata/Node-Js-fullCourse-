// const Sequelize=require('sequelize');

// const sequelize=new Sequelize(process.env.DB_name,process.env.DB_USERNAME,process.env.DB_PASS,{
//     dialect:'mysql',
//     host:process.env.DB_HOST,
// });

// module.exports=sequelize;

const mongoDB=require('mongodb');
const MongoClient=mongoDB.MongoClient;

let _db;

exports.mongoConnect = callback=>{
    
    MongoClient.connect(        
'mongodb+srv://dileeept:Z1eyJ2W1wbda7piO@expensive-tracker.pnvtj0e.mongodb.net/?retryWrites=true&w=majority'    ).then((client)=>{
        console.log('Connected!');
        _db=client.db();
        callback();

    }).catch(err=>console.log(err));
}

exports.getDB=()=>{
    if(_db){
        return _db;
    }
    throw "No database data"
}

