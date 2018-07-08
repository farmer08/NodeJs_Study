function add(x,y) {
    return x+y;

}
function multi(x,y) {
    return x*y;

}


const APP_NAME ='NODEJS-DEMO'
module.exports = {
    name : APP_NAME,
    add : add,//当key和value一样的时候，es6允许只写一个（下面multi的写法）
    multi
}