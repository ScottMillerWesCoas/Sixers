
$(document).ready(function(){
    //Head to real-time data scrape sixers page 
  $('#changeStats').click(function(){
    window.location = '../views/SixersFunStats.html'; 
  }); 
   //AJAX CALL engages Scraper.js via server then userController, which pulls stats, articles and pictures from the web
  $.ajax({
    url: "/realData", 
    success: function(result){
      var dataTable = result;
      dataTable.forEach(function(el, i){
        if (Array.isArray(el)){ 
          if (el[0][0] === 'h') { //pics are in nested array where each item is a string that starts with 'h' [['h']]
            el.forEach(function(inel){
              $('#top').prepend("<img src=" + inel + " width='8%'>");   
            });  
          } else { //article links are objects in an array nested in the larger array - [[{}]]
            el.forEach(function(inel){
              $('#top2').append("<a target='blank' style='margin-left: 3%' href=" + inel.href + ">" + inel.text +"</a>");   
            }); 
          }
        } else { //player info are objects in the larger array - [{}]
          $('#outer').prepend("<div class='datacell' id=" + i + "><h2>" + el.name + "</h2><p class='stats'>Position: " + el.position + "</p><p class='stats'>Games Played: " + el.games + "</p><p class='stats'>Points: " + el.points + "</p><p class='stats'>PPG: " + el.PPG + "</p><p class='stats'>FG%: " + el.fgPct + "</p><p class='stats'>3Pt%: " + el.threePtPct + "</p><p class='stats'>REBS: " + el.reb + "</p><p class='stats'>AST: " + el.ast + "</p><p class='stats'>STL: " + el.stl + "</p></div>"); 
        }    
      }); //close forEach on retrieved 2D array
    } //close success function
  }); //close AJAX call
});



