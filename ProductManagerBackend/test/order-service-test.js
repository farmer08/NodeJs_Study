require('../db')
const oService = require('../service/order-service');

async function testAddOrder() {

    const order = {
        productId: '5b48bdc35b7df52b5dbea7fa',
        count: 2
    }
    const res = await oService.addOrder(order);
    console.log(res)
}

async function deleteOder() {
    const res = await oService.deleteOder('5b4993923085a53596f390af')
    console.log(res)

}
async function getAllOrder() {

    let res = await oService.getAllOrder(1);
    console.log(res)

}
// getAllOrder()
// testAddOrder();
// deleteOder()
