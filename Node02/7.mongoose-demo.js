let mongoose = require("mongoose")
let User = require('./model/user');

mongoose.connect("mongodb://127.0.0.1/test")


let db = mongoose.connection

db.on('error', err => {
    console.log(err)
});

db.once("open", () => {
    // console.log("connnet succsess")
    // testInsert();
    // testCRUD();
    highOrderQuery();
})


async function testInsert() {

    // let res = await User.create({
    //     name:'zs',
    //     age:20,
    // })

    let arr = [
        {
            name: 'zhaoliu', age: 70, address: '北京', fav: ['运动', '编码', '唱歌']
        },
        {
            name: 'sunqi', age: 60, address: '深圳', fav: ['运动', '编码', '睡觉']
        },
    ];
    let res = await User.create(arr);
    console.log(res)
}

async function testCRUD() {
    // let res = await  User.findOne({address:'深圳'});//查询，返回第一个匹配的数据
    // let res = await  User.find({address:'深圳'});//查询，返回所有匹配的数据
    // let res = await  User.find({});//查询所有数据

    // let res = await User.updateOne({_id:'5b41d69ec4a208de891e3720'},{address:'西安',age:30});//修改某一个数据
    let res = await User.deleteOne({_id: '5b42040a972d20e16a611cc6'});//删除某一条数据(但是当此_id不存在的时候执行结果并不报错，待考究)
    console.log(res)

}
//高级查询
async function highOrderQuery() {
    //根据条件来查询
    // let res  = await  User.find({age:{$gt:40}});//返回大于指定age的所有数据
    //数组查询
    // let res  = await  User.find({
    //     fav:'运动'
    // });

    // let res = await User.find().skip(0).limit(2);//skip跳过多少条数据，limit=pagesize
    // let res = await User.find().skip(0).limit(3).sort("-age");//根据sort排序，负的为倒序，不加负号为正序
    let res = await User.find().skip(0).limit(3).sort("-age").select("-fav");//select为查询条件，负的查询出的结果不包含fav字段，不加负号查询出的结果只包含fav字段和_id
    console.log(res)
}
