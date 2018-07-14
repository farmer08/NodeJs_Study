const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: [true, '用户名不可以为空']
    },
    password: {
        type: String,
        require: [true, '密码不可以为空']
    },
    age: {
        type: Number,
        min: [0, '年龄不能小于0'],
        max: [120, '年龄不能超过120'],
        default: 10
    },
    role: {
        type: Number,
        default: 0//0表示一般商家，100表示超级管理员
    },
    create: {
        type: Date,
        default: Date.now() + 60 * 60 * 8//中国标准时间为东八区，需要UTC时间+8个小时
    }

});

module.exports = mongoose.model('user', schema);//user 为数据库的表名