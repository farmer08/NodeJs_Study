
function testDataNow() {
    let stime = Date.now()
    console.log("stime:"+stime);

    let time2 = new Date().toLocaleString()
    console.log('time2:'+time2);
}
testDataNow();