var request = require('request-promise-native');
var cheerio = require('cheerio');
var URL = require('url-parse');

const fetchNews = (uri)=>{
    var options = {
        uri: uri,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    var last_bit = uri.split('.').pop();
    var next_uri = "";
    if(last_bit === 'com' || last_bit === 'com/'){
        next_uri = 'https://www.xda-developers.com/page/2';
    }else{
        var pieces = uri.split('/');
        var current_num = pieces.pop();
        if(current_num === ''){
            current_num = pieces.pop();
        }
        current_num = parseInt(current_num);
        var next_num = current_num+1;
        //console.log('current num: ' + current_num);
        //console.log('next num: ' + next_num);
        next_uri = 'https://www.xda-developers.com/page/' + next_num.toString();
        //console.log('next uri: ' + next_uri);
    }
    const result = request(options).then(($)=>{
        console.log("Page title:  " + $('title').text());
        var items = $('div.thumb_hover');
        var news = [];
        for(var i = 0; i < items.length; i++){
            var att = items[i].children[1].children[1].attribs;
            if(att.class){
                continue;
            }
            var news_item = {
                image:att["data-cfsrc"],
                title:att.alt
            }
            news.push(news_item);
        }
        var result = {
            payload:news,
            next:next_uri
        };
        return result;
    }).catch((err)=>{
        console.log("Error: " + err);
    });

    return result;
}

module.exports = fetchNews;
