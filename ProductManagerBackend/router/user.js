let router = require('express').Router();
let userService = require('../service/user-service');
/**
 * 获取用户信息
 */
router.get('/', async (req, res) => {
    let result = await userService.getUserInfo(req.query.username);
    console.log(result)
    res.success(result)

});
router.post('/login', async (req, res) => {
    let token = await userService.loginUser(req.body);
    res.send({
        token
    })

});
router.post('/register',async (req,res)=>{
    // console.log(req.body)
    let user = await userService.registerUser(req.body);
    res.success(user)
});

router.delete('/:username',async (req,res)=>{
    await userService.deleteUser(req.params.username)
    res.success()
});


module.exports = router
