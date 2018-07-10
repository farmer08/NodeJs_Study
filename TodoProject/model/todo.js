const  mongoose = require('mongoose');
const schema = new mongoose.Schema({
    content:{
        type:String,
        unique:true,
        require:[true,'content 不能为空']
    },
    isDone:{
        type:Boolean,
        default:false//默认未完成
    },
    created:{
        type:Date,
        default:Date.now()//默认当前事件
    }
});
module.exports = mongoose.model('todos',schema);

