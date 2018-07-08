let EventEmitter = require('events');
let request = require('request');
let iconv = require('iconv-lite');
let cheerio = require('cheerio');
let fs = require('fs');
let path = require('path');
/**
 * 抓取指定网页的图片
 */
const startLoadHtml = 'startLoadHtml';
const getHtmlFinish = 'getHtmlFinish';
const downloadImage = 'downloadImage';
const exraFileName = 'imgs';//存储图片的文件夹名称
const baseUrl = 'http://www.27270.com/ent/meinvtupian/';//抓取的网页地址

class MyEventEmitter extends EventEmitter {
    //拿到需要抓取的网页的数据
    getHtml() {
        var options = {
            url: baseUrl,
            encoding: null,
        }

        request(options, (error, response, body) => {
            //print statusCode
            console.log('statusCode', response && response.statusCode);
            if (error) {
                //print error message
                console.log('error', error.message);
                return
            }
            //讲拿到的html代码转码
            let html = iconv.decode(body, 'gb2312');

            // console.log(html)
            this.emit(getHtmlFinish, html);

        });
    }

    //获取到转码后的页面的img数据，也就是需要抓取的图片的信息
    getImageCode(html) {
        let $ = cheerio.load(html);
        let array = $('div.MeinvTuPianBox>ul>li>a>i>img').toArray();
        let imgData = [];
        for (let i = 0; i < array.length; i++) {
            let imgObj = array[i];
            let src = $(imgObj).attr('src');
            let alt = $(imgObj).attr('alt');
            // console.log(`src: ${src} alt:${alt}`)
            imgData.push({
                src, alt
            })
        }
        myEventEmitter.emit(downloadImage, imgData);
    }

    //注册获取到图片地址后的下载事件
    downloadImg(imgData) {
        imgData.forEach((imgObj, index) => {
            // console.log(imgObj.src)
            request(imgObj.src)
                .pipe(fs.createWriteStream(path.join(exraFileName, imgObj.alt + path.extname(imgObj.src))));
            if (index === (imgData.length - 1)) {
                console.log('download finish...');
            }
        })
    }

    start() {
        this.getHtml();
        this.on(getHtmlFinish, (html) => {
            this.getImageCode(html);
        })

        this.on(downloadImage, (downloadImage) => {
            this.downloadImg(downloadImage);
        });
    }
}

let myEventEmitter = new MyEventEmitter();
myEventEmitter.start();


// myEventEmitter.on(startLoadHtml, () => {
//
//     var options = {
//         url: baseUrl,
//         encoding: null,
//     }
//
//     request(options, (error, response, body) => {
//         //print statusCode
//         console.log('statusCode', response && response.statusCode);
//         if (error) {
//             //print error message
//             console.log('error', error.message);
//             return
//         }
//         let html = iconv.decode(body, 'gb2312');
//
//         // console.log(html)
//         myEventEmitter.emit(getHtmlFinish, html);
//
//     });
// })
//注册获取到转码后的网页的事件
// myEventEmitter.on(getHtmlFinish, (html) => {
//     let $ = cheerio.load(html);
//     let array = $('div.MeinvTuPianBox>ul>li>a>i>img').toArray();
//     let imgData = [];
//     for (let i = 0; i < array.length; i++) {
//         let imgObj = array[i];
//         let src = $(imgObj).attr('src');
//         let alt = $(imgObj).attr('alt');
//         // console.log(`src: ${src} alt:${alt}`)
//         imgData.push({
//             src, alt
//         })
//     }
//     myEventEmitter.emit(downloadImage, imgData);
//     // return imgData
// })


