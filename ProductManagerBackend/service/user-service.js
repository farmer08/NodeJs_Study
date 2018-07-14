let User = require('../model/user');
let crypto = require('lxj-crypto');
let config = require('../config')

/**
 * 查询用户信息
 * @param username
 * @returns {Promise<*>}
 */
async function getUserInfo(username) {
    // console.log('params :' + username);
    //查询用户的信息，返回不包含password和__v字段
    let result = await User.findOne({username: username}).select("-__v -password");
    if (!result) {
        throw  Error(`用户名为${user.username}的用户不存在`);
    }
    // console.log('service:' + result)
    return result;
}

async function isUserExist(username) {
    let res = await User.findOne({username: username});
    if (!res) {
        throw Error(`用户名为${username}的用户不存在`)
    }
}

/**
 * 更新用户的role
 * @param username
 * @returns {Promise<void>}
 */
async function updateRoleUser(params) {
    await  isUserExist(params.username);
    // res: {n:1, mModify:1, ok: 1}
    let result = await User.updateOne({username: params.username}, {role: params.role});
    console.log('updateRoleUser result:' + result)
    if (result.n < 1) {
        throw  Error('更新失败');
    }
    return `更新${params.username}的role成功`;
}

/**
 * 删除用户
 * @param username
 * @returns {Promise<void>}
 */
async function deleteUser(username) {
    console.log("delete params:" + username)
    await  isUserExist(username);
    // res: {n:1, mModify:1, ok: 1}
    let result = await User.deleteOne({username: username});
    console.log('delete result:' + result)
    if (result.n < 1) {
        throw  Error('删除失败');
    }
    return `删除${username}成功`;
}

/**
 * 登录
 * @param user
 * @returns {Promise<void>}
 */
async function loginUser(user) {
    console.log("username:" + user.username)
    console.log("password:" + user.password)
    //1 首先对密码加密，数据库不存储明文密码

    user.password = crypto.sha1Hmac(user.password, user.username);


    //2根据用户名和密码去数据查询用户是否存在

    let dbuser = await User.findOne({username: user.username, password: user.password})
    if (!dbuser) {
        throw Error('用户名或者密码错误')
    }
    //3生成token返回给用户
    let token = {
        username: user.username,
        expire: Date.now() + 60 * 60 * 8 + config.TokenExpire
    }
    return crypto.aesEncrypt(JSON.stringify(token), config.TokenKey);//注意JSON不是Json

}

/**
 * 注册
 * @param user:{username:xxxx,password:xxxx,age:10,role:0}
 * @returns {Promise<user|*>}
 */
async function registerUser(user) {
    let result = await User.findOne({username: user.username});
    if (result) {
        throw Error(`用户名为${user.username}的用户已经存在`);
    }
    //密码加密的操作
    user.password = crypto.sha1Hmac(user.password, user.username);
    user.role = 0;//默认为商家用户
    // user.create = new Date().toLocaleString();
    user.create = Date.now() + 60 * 60 * 8;//中国标准时间为东八区，需要UTC时间+8个小时

    // 存库操作
    let createResult = await User.create(user);
    if (createResult) {
        createResult.password = '';//注册成功返回数据里面不包含password
        return "注册成功";
    } else {
        return "注册失败";
    }
}


module.exports = {
    registerUser,
    getUserInfo,
    deleteUser,
    loginUser,
    updateRoleUser
}