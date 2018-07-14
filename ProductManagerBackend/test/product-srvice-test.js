require('../db')
const Productservice = require('../service/product-service');

async function testAddProduct() {
    const pData = [
        {
            name: "外星人T990",
            price: "19999.9",
            stock: 120,
            description: "这是一台性能超级强劲的电脑，打LOL，DOTA2，吃鸡都不在话下。",
            category: "5b46a7eeb0bf5a233ce5a1f0"
        },
        {
            name: "联想E450",
            price: "4000.1",
            stock: 1000,
            description: "这是一台适用于办公，影音，娱乐的电脑。",
            category: "5b46a7eeb0bf5a233ce5a1f0"
        },
        {
            name: "智能手电筒",
            price: "200",
            stock: 2000,
            description: "这是一个智能化的手电筒，能够感受白天黑夜，自动打开，还能自动发点。",
            category: "5b46a762dd1c8136b425f303"
        },
        {
            name: "海尔智能冰箱",
            price: "1000",
            stock: 800,
            description: "这是一个无噪音，省电，功率小的智能冰箱，支持远程控制。",
            category: "5b46a762dd1c8136b425f303"
        },
        {
            name: "韩国风长腿裤子",
            price: "300",
            stock: 1800,
            description: "这是一个来自于韩国著名设计师的作品，为年轻人量身定做的。",
            category: "5b46a7eeb0bf5a233ce5a1f2"
        },
        {
            name: "Mac Pro 2018",
            price: "29999.9",
            stock: 10,
            description: "Apple Mac Pro,you know that",
            category: "5b46a7eeb0bf5a233ce5a1f0"
        },
        {
            name: "MD-AMG 45",
            price: "1200000",
            stock: 10,
            description: "奔驰AMG-45,你懂的",
            category: "5b46a7eeb0bf5a233ce5a1f0"
        },
    ]
    const result = await Productservice.addProduct(pData)
    console.log(result)
}
async function testUpdate() {
    await Productservice.updateProduct('5b48bdc35b7df52b5dbea7fb',{stoke:"30",price:"1200000"})
}
async function testFind() {
    const result = await Productservice.getProductById('5b48bbb4b40aad2af7afa157');
    console.log(result);
}
async function testFindByPage() {
    await Productservice.getProductByPage(2);
}
async function testDelete() {
    const result = await Productservice.deleteProduct('5b48bbb4b40aad2af7afa155');
    console.log(result);
}
testFindByPage(2);
// testFind();
// testUpdate();
// testAddProduct
// testDelete()