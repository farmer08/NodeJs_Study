require('./db')

let redis = require('redis');
let client = redis.createClient();
let util = require('util');
let getAsync = util.promisify(client.get).bind(client);
let lrangeAsync = util.promisify(client.lrange).bind(client);
let llenAsync = util.promisify(client.llen).bind(client);


client.on('error', err => {
    console.log('redis connect is fail:' + err.toString());
});

async function testList() {
    // client.set('aaa','bbb');
    // let res = await getAsync('aaa');
    // client.rpush('list','a');
    // client.rpush('list','c');
    // client.rpush('list','d');
    // client.rpush('list','e');
    // let res = await lrangeAsync('list',0,-1);
    let res = await llenAsync('list');
    console.log(res);
}

// testList();

let key = 'todos';
let todo = require('./model/todo')

async function prepareData() {

    let todos = await todo.find();
    // console.log(todos)
    todos.forEach(it => {
        client.rpush(key, JSON.stringify(it));
    });

}

// prepareData();


async function getProductsFromRedisByPage() {
    let todolens = await llenAsync(key);
    if(todolens>0){
        let list = await lrangeAsync(key,0,2);
        console.log(list)
    }else {
        console.log('todo lens is 0')
    }
}

getProductsFromRedisByPage();



