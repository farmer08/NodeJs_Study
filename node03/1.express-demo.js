let express = require('express');
let app = express();


// app.use(express.static('static'))//
app.use('/static', express.static('static'))//设置挂载文件
app.get('/', (rep, res) => {
    res.send('hello express,method is :' + rep.method);
});

app.post('/', (rep, res) => {
    res.send('hello express,method is :' + req.method);
});

app.put('/', (rep, res) => {
    res.send('hello express,method is :' + req.method);
});
app.delete('/', (rep, res) => {
    res.send('hello express,method is :' + req.method);
});
app.listen(3000);