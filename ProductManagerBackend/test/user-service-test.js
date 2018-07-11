require('../db')
let userSevice = require('../service/user-service');

async function testGetUserInfo() {
    let result = await userSevice.getUserInfo('bitcoin');
    console.log(result);

}


/**
 * 测试注册方法
 * @returns {Promise<void>}
 */
async function testUserRegist() {
    let user = {
        username: 'nodejs',
        password: '123456',
        age: 10,
        role: 1000
    }
    let result = await userSevice.registerUser(user)
    console.log(result);

}


async function testLogin() {
    let user = {
        username: 'nodejs',
        password: '123456'
    }
    let loginData = await userSevice.loginUser(user);
    console.log(loginData)
}

/**
 * 测试删除方法
 * @returns {Promise<void>}
 */
async function testDeleteRegist() {
    let result = await userSevice.deleteUser('eos')
    console.log(result);

}
// testLogin();
// testDeleteRegist();
// testUserRegist();
testGetUserInfo();