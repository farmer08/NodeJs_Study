let mongoose = require('mongoose');
let config = require('./config');

mongoose.connect(`mongodb://127.0.0.1/${config.DB}`);

let db = mongoose.connection;
db.on('err',(err)=>{
    console.error('db connection err：'+err.toString());
});

db.once('open',()=>{
   console.log('mongo db connection successfully');
});