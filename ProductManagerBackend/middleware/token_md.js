const crypto = require('lxj-crypto');
const config = require('../config');
const userService = require('../service/user-service');
//用来判断当前的用户是否是合法的认证用户

//1从header中取出用户的token，如果没有直接拒绝

//2对token进行安全性校验
function isExcluedUrl(url) {

    const excluedUrls = [
        /.*\/user\/register/,
        /.*\/user\/login/
    ]

    let isExclued = false;
    excluedUrls.forEach(it => {
        if (it.test(url)) {
            isExclued = true;
        }
    });
    return isExclued;
}

module.exports = async (req, res, next) => {

    //过滤不需要拦截的请求（登录注册...）
    if (!isExcluedUrl(req.url)) {
        console.log(req.url)
        //从请求头里取出token
        let token = req.get('token');
        if (!token) {
            throw Error('缺少token');
        }
        //校验解密

        let tokenData;
        try {
            tokenData = JSON.parse(crypto.aesDecrypt(token, config.TokenKey));
        } catch (e) {
            throw Error('token不合法');
        }
        //判断是否过期
        if (tokenData.expire < Date.now()) {
            throw Error('token已经过期，请重新登录');
        }
        //根据token获取到用户的信息
        let userInfo = await userService.getUserInfo(tokenData.username);
        req.user = userInfo;// 给req对象安装一个user的变量，目的是给后面的中间件来用
    }
    next();
};