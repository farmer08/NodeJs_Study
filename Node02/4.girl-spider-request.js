let http=require("http")
let iconv=require("iconv-lite")
let cheerio=require("cheerio")
let fs=require("fs")
let path=require("path")
let request = require("request")




//1 先拿到目标网站的html内容

const baseUrl  = "http://www.27270.com/ent/meinvtupian/"

request(baseUrl, (error, response, body)=>{
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    if(error){
        console.log('error:', error); // Print the error if one occurred
        return
    }
    // console.log('body:', body);

    // let html = iconv.decode(Buffer.concat(body),'gbk')
    let imgData = extraDataFromHtml(body)
    // console.log(imgData)
    downloadImage(imgData)

});


//3提取数据
function extraDataFromHtml(html) {

    let $ = cheerio.load(html)
    let arr = $('div.MeinvTuPianBox>ul>li>a>i>img').toArray()

    let imgData = []
    for (let i = 0;i<arr.length;i++){
        let obj = arr[i];
        // console.log(obj)
        let src = $(obj).attr('src')
        let alt = $(obj).attr('alt')
        // console.log(`src:${src} title:${alt}`)//注意这里模版取数据的引号是··  也就是～～的那个符号，不是单引号
        imgData.push({
            src,
            alt
        })
    } 

    return imgData
}

//4 下载图片
function  downloadImage(imageData) {
    
    
    imageData.forEach((imgObj,index)=>{
        const imageSrc = imgObj.src
        const imageAlt= imgObj.alt

        request
            .get(imageSrc)
            .on('error', function(err) {
                console.log(err)
            })
            .pipe(fs.createWriteStream(path.join('imgs',index+path.extname(imageSrc))))
        if(index===(imageData.length-1)){
            console.log('download finish.')
        }
    })
}

