const express = require('express');
const fetchNews = require('./crawler');

var xda = "https://www.xda-developers.com/page/2";

const app = express();

app.get('/', async (req,res)=>{
    const result = await fetchNews(xda);
    res.send(result);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);