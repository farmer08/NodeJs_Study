let Catagoty = require('../model/category');
let config = require('../config');

/**
 * 添加分类
 * @param category
 * @returns {Promise<void>}
 */
async function addCategory(category) {
    return await Catagoty.create(category);
}

/**
 * 判断id所属的分类是否存在
 * @param id
 * @returns {Promise<void>}
 */
async function isIdExist(id) {
    let res = await Catagoty.findOne({_id: id});
    if (!res) {
        throw Error(`id为【${id}】的商品不存在`);
    }
}

/**
 * 删除一个分类
 * @param id
 * @returns {Promise<void>}
 */
async function deleteCategory(id) {
    await isIdExist(id);
    let res = await Catagoty.deleteOne({_id: id});
    if (res.n < 1) {
        throw Error('删除失败');
    }
}

/**
 * 更新分类
 * @param id
 * @param data
 * @returns {Promise<void>}
 */
async function updateCategory(id, data) {
    await isIdExist(id)

    let res = await Catagoty.updateOne({_id: id}, data);
    if (res.n < 1) {
        throw Error('更新失败');
    }
}

async function findCategoryByPage(page = 1) {
    return await Catagoty.find()
        .skip((page - 1) * config.PageCount).limit(config.PageCount).sort('created').select('-__v');
}

module.exports = {
    addCategory,
    updateCategory,
    deleteCategory,
    findCategoryByPage
}