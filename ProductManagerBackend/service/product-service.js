const Product = require('../model/product');
const config = require('../config');

async function addProduct(product) {
    const res = await Product.create(product);
    return res
}

async function isIdExist(id) {
    const res = await Product.findOne({_id: id});
    if (!res) {
        throw Error(`id为【${id}】的数据不存在`);
    }

}

async function updateProduct(id, updateData) {
    await isIdExist(id)
    const res = await Product.updateOne({_id: id}, updateData);
    if (res.n < 1) {
        throw Error('更新失败');
    }
}

async function deleteProduct(id) {
    await isIdExist(id)
    const res = await Product.deleteOne({_id: id});
    if (res.n < 1) {
        throw Error('删除失败');
    }
}

async function getProductByPage(page = 1) {
    return await Product.find().skip((page - 1) * config.PageCount).limit(config.PageCount)
        .sort('created').select('-__v');
}

async function getProductById(id) {
    await isIdExist(id)
    return await Product.findOne({_id: id});
}

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductByPage
}

