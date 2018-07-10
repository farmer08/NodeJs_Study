require('./db');
require('express-async-errors')
let config = require('./config');
let morgan = require('morgan');
let todoRouter = require('./router/todo');
let bodyParser = require('body-parser');
let express = require('express');
let app = express();

app.use(morgan('combined'));//打印日志信息

// parse application/json
app.use(bodyParser.json())

//注册模块化的路由
app.use('/todo', todoRouter);
//注册异常处理中间件
app.use((err, req, res, next) => {
    res.send({
        code: -1,
        msg: err.toString()
    })
})

app.listen(config.PORT);