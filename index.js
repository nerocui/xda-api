const express = require('express');
const fetchNews = require('./crawler');

var xda = "https://www.xda-developers.com/page/1";

const app = express();

app.get('/news', async (req,res)=>{
    const result = await fetchNews(xda,(result)=>{
        res.send(result);
    });
    
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);