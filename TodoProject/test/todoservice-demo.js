require('../db')

let todoService = require('../service/todo');


async function testGetAllTodos() {
    let todos = await todoService.getAllTodos();
    console.log(todos);
}


async function testAddTodo() {
    let todo = {
        content: '今天学什么'
    };

    let result = await todoService.addTodo(todo);
    console.log(result);
}


async function testUpdate() {
    let id = {
        id: '5b440f5a9d7e2209e86a81e5'
    }
    let todo = {
        content: '今天学Hyperleger'
    };
    let res = todoService.updateTodo(id, todo);
    console.log(res)
}

async function testDelete() {
    let todo = {
        id: '5b440f5a9d7e2209e86a81e5',
    };
    todoService.deleteTodo(todo);
}

// testUpdate();
// testAddTodo();
// testGetAllTodos();
testDelete();


