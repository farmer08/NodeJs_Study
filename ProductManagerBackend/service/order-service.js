const Order = require('../model/order');
const pService = require('../service/product-service');
const Big = require('big.js');
const config = require('../config');

/**
 * 获取所有订单
 * @param page
 * @returns {Promise<*>}
 */
async function getAllOrder(page=1) {
    return await Order.find().skip((page-1)*config.PageCount).limit(config.PageCount)
        .sort('created').select('-__v');

}
/**
 * 删除订单，其实就是把订单的状态置为已取消
 * @param id
 * @returns {Promise<*>}
 */
async function deleteOder(id) {
    let result = await Order.updateOne({_id: id}, {status: "cancel"});
    return result;
}

/**
 * 添加一个订单 {productId: 'xxxxxxxx', count: 2}
 * @param order
 * @returns {Promise<void>}
 */
async function addOrder(order) {
    //根据order的商品id获取商品
    const product = await pService.getProductById(order.productId);
    //判断库存
    if (product.stoke < order.count) {
        throw Error('库存不足');
    }
    //给order字段赋值
    order.productName = product.name;
    order.productPrice = product.price;
    order.totalPrice = Big(order.productPrice).times(order.count);


    let result = await Order.create(order);
    //更新product的库存
    await pService.updateProduct(product._id, {stoke: product.stoke - order.count});
    return result;
}



module.exports = {
    addOrder,
    deleteOder,
    getAllOrder
}