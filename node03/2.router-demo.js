let orderRouter = require('./router/order')
let userRouter = require('./router/user')

let express = require('express');
let app = express();


// app.use((req, res, next) => {
//
//     let urlPath = req.url;
//     console.log('中间件函数:'+urlPath);
//     // res.send('第一个中间件函数');
//     next()
//
//     // if (urlPath.startsWith('/user')) {
//     //     console.log('中间件函数拦截');
//     // } else {
//     //     next();
//     // }
//
// //判断请求头有没有带有token参数,带的就是登录的用户，反之没有登录就拦截
//
//     // let token = req.get('token');
//     // if(token){
//     //     //登录用户，放行
//     //     next();
//     // }else{
//     //     //拦截
//     //     res.send({
//     //         code:-1,
//     //         msg:'未登录'
//     //     })
//     // }
//
//
// })

// app.use((req, res, next) => {
//     console.log('第二个中间件函数拦截');
//     next();
// });

//打印每次请求消耗的中间件
// app.use((req, res, next) => {
//     console.time('aaa');
//     next();
//     console.timeEnd('aaa');
// });
app.use('/order', orderRouter);
app.use('/user', userRouter);

//注册错误处理中间件函数,只会捕获程序中未处理的异常
app.use((err,req, res, next) => {
    console.log('程序异常：'+err.toString());
    res.send({
        code:-1,
        msg : err.toString()
    })

});
app.listen(3000)