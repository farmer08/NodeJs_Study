let router = require('express').Router();

router.post('/login',(rep,res)=>{
    let a = b.c;//主动制造异常
    res.send("login")
    // try {
    //     let a = b.c;//主动制造异常
    //     res.send("login")
    // }catch{
    //     console.log('login 异常')
    //     res.send.send({
    //         code:-1,
    //         msg : 'login '+err.toString()
    //     })
    // }

});


router.post('/regist',(rep,res)=>{


    res.send("regist")
});


module.exports = router;