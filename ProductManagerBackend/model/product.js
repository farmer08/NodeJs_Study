const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: [true, '商品名字不可以为空']
    },
    price: {
        type: String,
        require: [true, '商品价格不可以为空']
    },
    stoke: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    isOnSale: {
        type: Boolean,
        default: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, '商品分类不可以为空']
    },
    created: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('products', schema);