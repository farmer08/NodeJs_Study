let EventEmitter = require("events")

class  MyEmitter extends EventEmitter{
    
}

//监听事件

let myEmitter = new MyEmitter()
myEmitter.on('haha',(p)=>{
    console.log("hahaha:"+p.name)
    // console.log("hahaha"+JSON.stringify(p))
})
//触发事件
let person = {
        name:"张三"
    }
myEmitter.emit("haha",person)
// setTimeout(()=>{
//     let person = {
//         name:"张三"
//     }
//     myEmitter.emit("haha",person)
// },2000)