'use strict';
const fs = require('fs'); 
const cheerio = require('cheerio');
const request = require('request');


const scrapeController = {
  getData: (req, res) => {
    let dataArr = [], picArr = [], articleArr = [], testObj = {}; 

    //Get current articles posted on LibertyBallers.com - collect both headlines and links to article pages
    request('http://www.libertyballers.com/', (error, response, html) => {
      if (error){
        res.writeHead(400, "text/html");
        res.send(error); 
      }
      let $ = cheerio.load(html);

      $('.m-hero-block__body h2').map(function(i, bqQ) {
        const output = cheerio(bqQ);
        articleArr.push({ text: output.children('a').text(), href: output.children('a').attr('href')});
        //article headlines and links to article pages collected as objects in array
      }); 
    }); //close func scraping LibertyBallers.com

    //Get currents stats and player pictures from NBA.com
    request('http://www.nba.com/sixers/stats/averages', (error, response, html) => {
      if (error){
        res.writeHead(400, "text/html");
        res.send(error); 
       }
      let $ = cheerio.load(html);
      //collect only text from rows in table in var t
      var t = $('tr *').contents().map(function(el) {
      return (this.type === 'text') ? $(this).text() : '';
      }).get();

      $('.player-name__inner-wrapper').map(function(i, bqQ) {
        const output = cheerio(bqQ);
        picArr.push(output.children('img').attr('src'));
        //push player pic img src link data into array
      }); 

      //remove dots and empty spaces from collected data array
      for (var i = 0; i < t.length; i++){
        if (t[i] === '•') t.splice(i-3, 5, '\n'); 
        }
      for (i = 0; i < t.length; i++){
        if (t[i] === '') t.splice(i, 1); 
      }
      //remove unnecessary additional data after player stats
      t = t.slice(0, 280); 


      for (var j = 0; j < t.length; j++){
        if (t[j].indexOf('Jahlil') > -1 || t[j].indexOf('Nerlens') > -1 || t[j].indexOf('Robert') > -1 || t[j].indexOf('Nik') > -1 || t[j].indexOf('McConn') > -1 || t[j].indexOf('Hollis') > -1 || t[j].indexOf('Joel') > -1 || t[j].indexOf('Ersan') > -1 || t[j].indexOf('Holmes') > -1 || t[j].indexOf('Luwaw') > -1 || t[j].indexOf('Saric') > -1 || t[j].indexOf('Sergio') > -1 || t[j].indexOf('Gerald') > -1){
          //loop through array, looking for player name, which is followed by all relevant stats
          var obj = {}; 
          obj.name = t[j]; 
          obj.number = t[j+1]; 
          obj.position = t[j+2]; 
          obj.games = t[j+3]; 
          obj.points = t[j+4]; 
          obj.PPG = parseFloat(t[j+4] / parseInt(obj.games)).toFixed(1); 
          obj.fgPct = t[j+6];
          obj.threePtPct = t[j+7];
          obj.reb = t[j+11];
          obj.ast = t[j+12];
          obj.stl = t[j+13];
          //collect all relevant stats in new obj for each player, push into array
          dataArr.push(obj);
        }

        else if (dataArr.length === 11){
          //once player data collected look for and remove any duplicates
          dataArr.forEach(function(el, i){
            //don't look through picture array
            if (!(Array.isArray(el))){
              if(testObj[el.name] === undefined) testObj[el.name] = 1; 
              else if (testObj[el.name] === 1) {
                dataArr.splice(i, 1);     
              }
            }
          }); 

          dataArr.push(picArr.slice(0, 12));
          dataArr.push(articleArr);
        }//close conditional of all players having been collected
      }//close looping through all collected data
   


    
    }); //close scraping NBA.com
    return dataArr; //send all collected data back to realStats.js
  } //CLOSES GETDATA
};  //Closes SCRAPECONTROLLER; 


module.exports = scrapeController;