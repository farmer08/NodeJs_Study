let router = require('express').Router();
let todoService = require('../service/todo');
//
router.get('/list',async (req,res)=>{
    let todos = await todoService.getAllTodos();
    // console.log(req.body);
    res.send({
        code:1,
        data:todos
    });
});

router.post('/create',async(req,res)=>{
    let result = await todoService.addTodo(req.body);
    // console.log(req.body);
    res.send({
        code:0,
        data:result
    });
});
router.put('/update/:id',async(req,res)=>{
    // console.log(req.params.id);
    await todoService.updateTodo(req.params.id,req.body);
    res.send({
        code:0,
        data:'update successful'
    });
});
router.delete('/delete',async(req,res)=>{
    await todoService.deleteTodo(req.body);
    res.send({
        code:0,
        data:'delete successful'
    });
});

module.exports = router;