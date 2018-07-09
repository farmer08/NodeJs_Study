let express = require('express');
let app = express();

//设置当前使用的模版引擎

app.set('views','./template');
app.set('view engine','jade');


app.get('/',(req,res)=>{
    //渲染index模版返回给用户
    res.render('index',{
        pagetitle:'标题',
        message:'文本'
    });
});



app.listen(3000)