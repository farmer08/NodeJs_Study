//crud
let Todo = require('../model/todo');

//查询
async function getAllTodos() {
    return await Todo.find().select('-__v');
}

//增加todo {content:'testData'}
async function addTodo(todo) {
    //判断content是否已经存在
    let res = await Todo.findOne({content:todo.content});
    if(res){
        throw Error(`内容为:${todo.content}已经存在`);
    }
    console.log('time:'+Date.now())
    
    return await Todo.create(todo);
}
//判断id是否存在
async function isIdExist(id) {
    let cid = await Todo.findOne({_id:id});
    if(!cid){
        throw Error(`id为:${id}的内容不存在`);
    }
}

//更新
async function updateTodo(id,todo) {
    await isIdExist(id);

    let res = await Todo.updateOne({_id: id}, todo);
    if (res.n < 1) {
        //说明没有更新成功
        throw Error('更新失败');
    }
    console.log('更新成功：');
}

//删除
async function deleteTodo(todo) {
    await isIdExist(todo.id);
    let res = await Todo.deleteOne({_id: todo.id});
    // console.log(res);
    if (res.n < 1) {
        //说明没有删除成功
        throw Error('删除失败');
    }
    console.log('删除成功：');
}


module.exports = {
    getAllTodos,
    addTodo,
    updateTodo,
    deleteTodo
}