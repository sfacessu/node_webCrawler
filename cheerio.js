var fs = require('fs');
var request = require('request');
var io = require('cheerio');
var URL = require('./Url/url');
var urlList = URL.list

for(var l in urlList){
    req(urlList[l], function(err,result1){
        // console.log('1 : ', err || result);
        cio(result1, function(result2){
            if(result2.length === 0){
                console.log('result : NULL!');
                return 0;
            }
            else{
                console.log('success : ',result2);
                // fs.appendFile('./result/a.txt', JSON.stringify(result));
                fs.appendFile('./result/a.txt', result2)
            }   
        })
    })
}

// #1
function req(url,cb){
    request(url, function(err, res, body){
        if(err){
            cb(err);
        }
        cb(null,body);
    })
}
// #2
function cio(body,cb){
    //html 파일을 받아서 추추하기
    var total = [];
    var $ = io.load(body)
    var pt =[['script', 'src'], ['a', 'href'], ['iframe', 'src']]

    for(var k in pt){
        // console.log(pt[k]);
        var fuck = $(pt[k][0]).attr(pt[k][1]);
        // console.log(fuck === undefined)
        if(fuck !== undefined){
            if(fuck.indexOf('http') === 0){
                fuck = '['+pt[k][0]+' , '+pt[k][1]+'] : '+fuck + '\n'
                total.push(fuck);
            console.log(' : ',total)
            }
        }
    }
    cb(total)
}
