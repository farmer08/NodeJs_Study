const  mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'分类名字不可以为空']
    },
    created:{
        type:Date,
        default:Date.now()
    },
});
module.exports = mongoose.model('categorys',schema);