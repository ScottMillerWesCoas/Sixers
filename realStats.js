
 $(document).ready(function(){
   $('#changeStats').click(function(){
    window.location = './SixersFunStats.html'; 
   }); 
    $.ajax({
        url: "/realData", 
        //dataType: 'json',
        success: function(result){
            var dataTable = result;
            console.log('DATA IN REALTABLE', dataTable); 
            dataTable.forEach(function(el, i){
                if (Array.isArray(el)){ 
                    el.forEach(function(inel){
                       $('#top').prepend("<img src=" + inel + " height='10%'>");   
                    });  
                }
                else {
                    $('#outer').prepend("<div class='datacell' id=" + i + "><h2>" + el.name + "</h2><p class='stats'>Position: " + el.position + "</p><p class='stats'>Games Played: " + el.games + "</p><p class='stats'>FG%: " + el.fgPct + "</p><p class='stats'>3Pt%: " + el.threePtPct + "</p><p class='stats'>REBS: " + el.reb + "</p><p class='stats'>AST: " + el.ast + "</p><p class='stats'>STL: " + el.stl + "</p></div>"); 
                //}
                }    
            }); 
    
        }
}); 

$('#popData').on('click', function(){
     console.log('get it goin!'); 

}); 



});

