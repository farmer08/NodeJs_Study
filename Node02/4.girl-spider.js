let http=require("http")
let iconv=require("iconv-lite")
let cheerio=require("cheerio")
let fs=require("fs")
let path=require("path")



//1 先拿到目标网站的html内容

const baseUrl  = "http://www.27270.com/ent/meinvtupian/"
http.get(baseUrl,(res)=>{
    let data = [];
    res.on('data',chunk=>{
        // data += chunk.toString()
        data.push(chunk)
    })

    res.on('end',()=>{
        // console.log(data)
        //2 处理乱码
        let html = iconv.decode(Buffer.concat(data),'gbk')
        let imgData = extraDataFromHtml(html)
        // console.log(imgData)
        downloadImage(imgData)
    })

})

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
        http.get(imageSrc,res=>{
            const { statusCode } = res;
            let error;
            if (statusCode !== 200) {
                error = new Error('请求失败。\n' +
                    `状态码: ${statusCode}`);
            }
            if (error) {
                console.error(error.message);
                // 消耗响应数据以释放内存
                res.resume();
                return;
            }

            // if(error){
            //     console.error("下载异常："+imageSrc+","+error.toString())
            //     return
            // }
            let imgpath = path.join('imgs',imageAlt+path.extname(imageSrc))
            let writer =  fs.createWriteStream(imgpath)
            res.pipe(writer)
            if(index===(imageData.length-1)){
                console.log('download finish.')
            }
        }).on('error', (e) => {
            console.error(`错误: ${e.message}`);
        });
        // http.get(imageSrc,res=>{
        //     let imgpath = path.join('imgs',imageAlt+path.extname(imageSrc))
        //     let writer =  fs.createWriteStream(imgpath)
        //     res.pipe(writer)
        // })
    })
}

