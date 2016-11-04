var express = require('express'); 
var app = express(); 
var bodyParser = require('body-parser'); 
var path = require('path'); 
var cookieParser = require('cookie-parser'); 
var userController = require('./userController');
var scraper = require('./scraper');  
var fs = require('fs'); 

app.use(express.static(path.join(__dirname, './'))); 

app.use(bodyParser.urlencoded({extended: true})); 
app.use(cookieParser()); 


//Send user to NBA.com/twitter/LibertyBallers.com scrape page
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, './SixersRealStats.html')); 
});

app.get('/FunSixers', function(req, res){
  res.sendFile(path.join(__dirname, './SixersFunStats.html')); 
}); 

app.get('/Sixers', function(req, res){
  res.sendFile(path.join(__dirname, './SixersRealStats.html')); 
}); 

app.get('/RealSixers', function(req, res){
  res.sendFile(path.join(__dirname, './SixersRealStats.html')); 
});   


//Routes when user modifies Sixers dream team from SixersFunStats.html
app.post('/addPlayer', userController.addPlayer); 
app.post('/update', userController.updateData); 
app.post('/remove', userController.deletePlayer); 
app.get('/data', userController.sendData); 

//Route when user wants to see real-time tweets/pics/stats on SixersRealStats.html
app.get('/realData', userController.sendRealData); 


app.listen(3076, function(){
    console.log('you listenin\' on port 3076, obviously...'); 
}); 

module.exports = app; 