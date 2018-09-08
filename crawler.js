var request = require('request-promise-native');
var cheerio = require('cheerio');
var URL = require('url-parse');
var cloudscraper = require('cloudscraper');

const fetchNews = (uri, done)=>{
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
    cloudscraper.get(uri, function(err, res, body){
        if(err){
            console.log("Error: " + err);
        }
        const $ = cheerio.load(body);
        console.log("Page title:  " + $('title').text());
        var items = $('div.thumb_hover');
        var news = [];
        for(var i = 0; i < items.length; i++){
            var att = items[i].children[1].children[1].attribs;
            const item_url = items[i].children[1].attribs.href;
            if(att.class){
                continue;
            }
            var news_item = {
                image:att.src,
                title:att.alt,
                link:item_url
            }
            news.push(news_item);
        }
        var result = {
            payload:news,
            next:next_uri
        };
        done(result);
    });
}

module.exports = fetchNews;
