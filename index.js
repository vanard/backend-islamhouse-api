const https = require('https');
const http = require('http')
const express = require('express');
const app = express();
const server = http.Server(app);

_URL_ARTICLES = 'https://api.islamhouse.com/v1/ZsCcWofw9MdkYGT1/main/articles/id/id/1/25/json';
_URL_FATWA = 'https://api.islamhouse.com/v1/ZsCcWofw9MdkYGT1/main/fatwa/id/id/1/25/json/';

const callApiHttpArticles = (callback) => {
    https.get(_URL_ARTICLES, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });
    
    resp.on('end', () => {
        return callback(data);
    });
    
    }).on("error", (err) => {
       
    console.log("Error: " + err.message);
    });
}

const callApiHttpFatwa = (callback) => {
    https.get(_URL_FATWA, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });
    
    resp.on('end', () => {
        return callback(data);
    });
    
    }).on("error", (err) => {
       
    console.log("Error: " + err.message);
    });
}

app.get('/articles', (req,res) => {
    callApiHttpArticles((resp) => {
        res.write(resp);
        res.end();
    });
});

app.get('/fatwa', (req,res) => {
    callApiHttpFatwa((resp) => {
        res.write(resp);
        res.end();
    });
});

app.get('/', (req,res) => {
    callApiHttpArticles((resp) => {
        res.write("Server is Running");
        res.end();
    });
});

const port = process.env.PORT || 1234;
server.listen(port, () => console.log(`Listening on port ${port}`));