const fs = require('fs');
const request = require('request');
//오늘 추가한 내용 cheerio
const cio  = require('cheerio');
var LIST = require('./urlList.json');
var DATA = LIST.list

function yaya() {
};
function obj(site, body) {
    this.site = site;
    this.body = body;
}

yaya.prototype = {
    request : function(site,cb){
        request(site, function(error,response, body){
            var TotalData = new obj(site, body);
            console.log(TotalData)
            cb(TotalData);
        })
    },
    Push : function(array){
        for(var k in array){
            this.request(array[k], function(result){
                fs.appendFile('./total.txt', JSON.stringify(result),function(err){
                    if(err) throw err;
                    console.log('site success',result)
                })
            })
        }
    }
}

var g = new yaya();
var Result = g.Push(DATA)