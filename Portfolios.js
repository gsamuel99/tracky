var express = require('express'); 
var request = require('request');
var mysql = require('mysql');
var bodyParser = require("body-parser");

var app = express();  
app.use(express.static(".")); 

app.listen(8080, function(){    
    console.log('Server Started...')
});

//I hate quay

function getsearchterm(SearchURL,cb,data) {

    request({url: SearchURL, method:"get"}, function(err,res,body){
        if(cb) {
            cb(err, JSON.parse(body))
        }
        
    });
}

var counter = 0;
var apinum = 0;
app.get("/searchlist", function (req, resp){
    apikey = ['4914ER72DROICJLG','Q4CFZAGYPRRD9GRI','XZTDJ07EAQK567OH','FGCCJ0BEM65D8K34','716QGRRMABZUDE87','WAI4B5EWWE6FLWQX','YCLTK7E9NR4THMFF','UL7XW4GHCHZI2LTZ','HH3TFTFAY00CP354','CQZGBZ02N3KH8XD3'];
    counter += 1;
    
    if (counter == 6){
        counter = 0;
        apinum += 1;
    if (apinum == 5){
        apinum = 0;
    }
    }
    
    console.log(apinum);
    console.log(apikey[apinum]);
    var searchterm = req.query.searchterm;
    var SearchURL = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords='+ searchterm + '&apikey=' + apikey[apinum];
    console.log(SearchURL)
    getsearchterm(SearchURL, function(err,data){
        console.log(counter);
        if (data.Note == 'Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency. Thank you!'){
            console.log("Thanks");
            }
        resp.jsonp(data);
    });
});

