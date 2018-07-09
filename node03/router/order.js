let express = require('express');
let router = express.Router();

router.use((req,res,next)=>{
    console.log('this is order router 中间件')
    next();
})


router.get('/list',(req,res)=>{
    res.send("获取订单接口")
});
router.post('/create',(req,res)=>{
    res.send("创建订单接口")
});

module.exports = router


