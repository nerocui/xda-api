var request = require('request-promise-native');
var cheerio = require('cheerio');
var URL = require('url-parse');

var xda = "https://www.xda-developers.com";

const fetchNews = (uri)=>{
    var options = {
        uri: uri,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    request(options).then(($)=>{
        console.log("Page title:  " + $('title').text());
    }).catch((err)=>{
        console.log("Error: " + err);
    });

}
