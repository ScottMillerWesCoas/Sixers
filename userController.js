'use strict'
var mongoose = require('mongoose'); 
var User = require('./userModel'); 
var Player = require('./playerModel'); 
var path =require('path');
var scraper = require('./scraper');  
var fs = require('fs'); 

var dataArr = scraper.getData(); //Initialize scrape immediately to avoid async issues

mongoose.connect('mongodb://localhost/db'); 

var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error')); 
db.once('open', function(){
    // console.log('Successfully connected to DB via mongoose...');
}); 

var userController = {}; 

userController.addPlayer = function(req,res){
  //Using bodyparser in server.js, we collect details from user request, add to database with Player schema, then refresh page to show new data
  var newPlayer = {}; 
  newPlayer.name = req.body.name; 
  newPlayer.ppg = req.body.ppg; 
  newPlayer.rpg = req.body.rpg; 
  newPlayer.apg = req.body.apg;
  newPlayer.pic = req.body.pic;  
  Player.create(newPlayer, function(err, user){
    if (err) throw err;   
  });
  res.redirect('./SixersFunStats.html');  
}; 
   
userController.sendData = function(req, res){
  //Data collected from MongoDB, sent to funStats.js
  Player.find({}, function(err, players){
    // console.log('players in DB:', players);    
    res.send(players); 
 });
}; 

userController.sendRealData  = function(req, res){
  //Make sure scraper has ample time to collect all data from various sources if user immediately goes to scraper page
  setTimeout(function(){
    res.send(dataArr);  
  }, 200); 
}; 

userController.updateData = function(req, res){
  //search DB for player name entered by user using Player schema, update data in DB based on user input, refresh page to show updated data
  var query = { 'name': req.body.name};
  var options = {multi: true};  
  var update={};
  update[req.body.stat]=req.body.newStat;
  Player.update(
    query,
    {$set:update},
    function (err,success) {
      if(err) return handleError(err);
      //console.log(success); 
  }); 
  res.redirect('./SixersFunStats.html'); 
}; 

userController.deletePlayer = function(req, res){
  //search DB for player name entered by user using Player schema, delete player in DB, refresh page to show updated data
  Player.remove({name: req.body.delName}, function(err) {
    if (!err) {
        //console.log('removed', req.body.delName); 
    }
    else {
        console.log("ERR: ", err); 
    }
  });
  res.redirect('./SixersFunStats.html');  
}; 


module.exports = userController; 

