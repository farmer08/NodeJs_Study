let http = require("http")
let iconv = require("iconv-lite")
let cheerio = require("cheerio")
let fs = require("fs")
let path = require("path")

//使用event模块重构爬虫
let EventEmitter = require('events')

class GrilEmitter extends EventEmitter {
    getHtml() {
        const baseUrl = "http://www.27270.com/ent/meinvtupian/"
        http.get(baseUrl, (res) => {
            let data = [];
            res.on('data', chunk => {
                data.push(chunk)
            })

            res.on('end', () => {
                // console.log(data)
                //2 处理乱码
                let html = iconv.decode(Buffer.concat(data), 'gbk')

                //3 解码完毕，事件通知
                this.emit('getHtmlFinish', html)

            })

        })
    }

    extraDataFromHtml(html) {

        let $ = cheerio.load(html)
        let arr = $('div.MeinvTuPianBox>ul>li>a>i>img').toArray()

        let imgData = []
        for (let i = 0; i < arr.length; i++) {
            let obj = arr[i];
            // console.log(obj)
            let src = $(obj).attr('src')
            let alt = $(obj).attr('alt')

            // console.log('src:${src} title:${alt}')
            imgData.push({
                src,
                alt
            })
        }
        // ，事件通知
        this.emit('extraDataFinish', imgData)

    }

    downloadImage(imageData) {
        imageData.forEach(imgObj => {
            http.get(imgObj.src, res => {
                let imgpath = path.join('imgs', imgObj.alt + path.extname(imgObj.src))
                res.pipe(fs.createWriteStream(imgpath))
            })
        })
    }

    //初始化监听器的注册
    start() {
        this.on('getHtmlFinish', (html) => {
            this.extraDataFromHtml(html)
        })

        this.on('extraDataFinish', (imgData) => {
            this.downloadImage(imgData)
        })
        this.getHtml()
    }
}


//使用

let grilSpider = new GrilEmitter()
grilSpider.start()