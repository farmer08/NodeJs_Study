let cheerio = require('cheerio')

let html  = '<div><h2>哈哈</h2>' +
    '<ul>' +
    '<li><a href="http://www.baidu.com">跳转到百度</a></li>' +
    '<li><a href="http://www.sina.com.cn">新浪</a></li>' +
    '<li><a href="http://www.goolge.com">google</a></li>' +
    '<li><a href="http://www.163.com">网易</a></li>' +
    '</ul>' +
    '<a href="http://www.baidu.com">跳转到百度</a></div>>'
let $ = cheerio.load(html)

// console.log($('h2').text())
console.log($('div>a').text())
console.log($('div>a').attr('href'))