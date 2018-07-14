require('../db')

let CategoryService = require('../service/category-service');

async function testAddCategory() {
    let catagory = [
        {name: '电脑'},
        {name: '家电'},
        {name: '手机'},
        {name: '服装'},
        {name: '汽车'},
        {name: '美妆'},
        {name: '水果'},
        {name: '交通工具'}
    ]
    let res = await CategoryService.addCategory(catagory);
    console.log(res)
}

async function testUpdate() {
    let updateDate = {
        name: '饮料'
    }
    await CategoryService.updateCategory('5b488fc6d279c323108852aa', updateDate);
}

async function testFind() {
    let res = await CategoryService.findCategoryByPage(2);
    console.log(res)
}

async function testDelete() {
    await CategoryService.deleteCategory('5b488fc6d279c323108852aa');
}

// testDelete();
// testAddCategory();
testFind();
// testUpdate();
