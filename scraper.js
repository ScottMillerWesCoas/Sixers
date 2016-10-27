'use strict';
const fs = require('fs'); 
const cheerio = require('cheerio');
const request = require('request');

const scrapeController = {
  getData: (req, res, next) => {
    // res.header('Access-Control-Allow-Origin', '*'); 
    let arr = [], newArr = [], lastArr = [], picArr = [], testObj = {}; 

request('http://www.nba.com/sixers/stats/', (error, response, html) => {
  if (error){
    res.writeHead(400, "text/html");
    res.send(error); 
}
let $ = cheerio.load(html);

var t = $('tr *').contents().map(function(el) {
return (this.type === 'text') ? $(this).text() : '';
}).get();


$('.player-name__inner-wrapper').map(function(i, bqQ) {
const output = cheerio(bqQ);
picArr.push(output.children('img').attr('src'));
}); 
// console.log('got', newArr + ' *************** '); 


//console.log(t);
for (var i = 0; i < t.length; i++){
if (t[i] === '•') t.splice(i-3, 5, '\n'); 
}
for (i = 0; i < t.length; i++){
if (t[i] === '') t.splice(i, 1); 
}

t = t.slice(0, 280); 
var res = t.join(' '); 

for (var j = 0; j < t.length; j++){
if (t[j].indexOf('Jahlil') > -1 || t[j].indexOf('Nerlens') > -1 || t[j].indexOf('Robert') > -1 || t[j].indexOf('Nik') > -1 || t[j].indexOf('McConn') > -1 || t[j].indexOf('Hollis') > -1 || t[j].indexOf('Joel') > -1 || t[j].indexOf('Jerami') > -1 || t[j].indexOf('Holmes') > -1 || t[j].indexOf('Luwaw') > -1 || t[j].indexOf('Saric') > -1 || t[j].indexOf('Sergio') > -1 || t[j].indexOf('Gerald') > -1){
var obj = {}; 
obj.name = t[j]; 
obj.number = t[j+1]; 
obj.position = t[j+2]; 
obj.games = t[j+3]; 
obj.fgPct = t[j+6];
obj.threePtPct = t[j+7];
obj.reb = t[j+11];
obj.ast = t[j+12];
obj.stl = t[j+13];
//console.log('OBJ', obj); 
lastArr.push(obj); 
}
else if (lastArr.length === 14){
lastArr.pop();

lastArr.push(picArr.slice(0, 12)); 
}
}
   


    
        });

    return lastArr; 
    }, //CLOSES GETDATA


    sayHello: function(){
        return 'hello there!'; 
    }

//Below closes SCRAPECONTROLLER; 
};


module.exports = scrapeController;