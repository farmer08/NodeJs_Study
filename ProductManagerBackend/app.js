require('express-async-errors');//必须放在最前面
let morgan = require('morgan');
require('./db')
let bodyParser = require('body-parser');
let express = require('express');
let config = require('./config/index');

let app = express();

//注册日志中间件
app.use(morgan('combined'));
//注册bodyParser中间件,HTTP请求体解析中间件
app.use(bodyParser.json());


//注册自定义的中间件
app.use(require('./middleware/res_md'));


//注册路由
app.use('/user', require('./router/user'));

//注册处理异常的中间件
app.use((err, req, res, next) => {
    res.fail(err.toString());
});


app.listen(config.PORT);