let ctypto = require('crypto')

let md5 = ctypto.createHash("md5")
let data = "msd加密"

 md5.update(data)
let result =md5.digest("hex")
// console.log(result)



//AES
let key = "123456"
let password = "baby"
const ciper = ctypto.createCipher("aes192",key)
let cipResult = ciper.update(password,"utf-8","hex")
cipResult+= ciper.final("hex")
console.log("cipResult:"+cipResult)

//ciper 前面调用final之后不可以再次调用final，会报异常
// let cipResult2 = ciper.final("hex")
// console.log("cipResult2:"+cipResult2)