require('../db')
let userSevice = require('../service/user-service');

async function testGetUserInfo() {
    let result = await userSevice.getUserInfo('nodejs');
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
        role: 100
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

async function testUpdateUerRole() {
    let params = {
        username: 'bitcoin',
        role: '100'
    }
    let loginData = await userSevice.updateRoleUser(params);
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
testUpdateUerRole();
// testLogin();
// testDeleteRegist();
// testUserRegist();
// testGetUserInfo();