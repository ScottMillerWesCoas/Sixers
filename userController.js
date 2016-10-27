'use strict'
var mongoose = require('mongoose'); 
var User = require('./userModel'); 
var Player = require('./playerModel'); 
var path =require('path');
var scraper = require('./scraper');  
var fs = require('fs'); 

var dataArr = scraper.getData();

mongoose.connect('mongodb://localhost/db'); 

var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error')); 
db.once('open', function(){
    console.log('Connected to DB!!!!');
}); 

var userController = {}; 


userController.createUser = function(req,res){
    var newUser = {}; 
    newUser.num = req.body.num; 
    newUser.username = req.body.username; 
        User.create(newUser, function(err, user){
            if (err) throw err; 
            else console.log('user', user.username);    
        });
        res.redirect('./SixersFunStats.html');  
}; 

userController.addPlayer = function(req,res){
    console.log('inside addPlayer'); 
    var newPlayer = {}; 
    newPlayer.name = req.body.name; 
    newPlayer.ppg = req.body.ppg; 
    newPlayer.rpg = req.body.rpg; 
    newPlayer.apg = req.body.apg;
    newPlayer.pic = req.body.pic;  
        Player.create(newPlayer, function(err, user){
            if (err) throw err; 
            else console.log('user', user);    
        });
        res.redirect('./SixersFunStats.html');  
}; 
   

userController.sendData = function(req, res){
         Player.find({}, function(err, players){
          // console.log('players in DB:', players);    
            res.send(players); 
         });
}; 

userController.sendRealData  = function(req, res){
    setTimeout(function(){
          //console.log('SEND REAL DATA****', dataArr);
           res.send(dataArr);  
    }, 500); 

}; 
userController.updateData = function(req, res){
    var query = { 'name': req.body.name};
    var options = {multi: true};  
    var update={};
    update[req.body.stat]=req.body.newStat;
    console.log('update', update); 
    Player.update(
        query,
        {$set:update},
        function (err,success) {
            if(err) return handleError(err);
            console.log(success); 
}); 
    // Player.update(query, { $set: { name : req.body.newStat }}, options, function(err, user){
    //     if (err) console.log('ERROR:', err); 
    //     console.log('updated player', user); 
    // }  ); 
    res.redirect('./Sixers/SixersFunStats.html'); 
}; 

userController.deletePlayer = function(req, res){
    console.log('got rem', req.body); 
    Player.remove({name: req.body.delName}, function(err) {
        if (!err) {
            console.log('removed', req.body.delName); 
        }
        else {
            console.log("ERR: ", err); 
        }
    });
    res.redirect('./SixersFunStats.html');  
}; 

userController.verifyUser = function(req, res){
    console.log('in verifyUser', req.body); 
    User.findOne({username: req.body.username}, "username num", function(err, user){
        if (user){
            console.log('found user!', user); 
            if (req.body.num === user.num.toString()){
                console.log('found a match!!!'); 
                res.redirect('./SixersFunStats.html'); 
            } else {
                console.log('no num?'); 
            }

        }
        else res.redirect('./welcome.html'); 
    }); 
}; 


module.exports = userController; 


