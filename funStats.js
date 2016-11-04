
 $(document).ready(function(){
    //Re-directs user to fun fake stats sixers page
    $('#realStats').click(function(){
        window.location = './SixersRealStats.html'; 
    }); 
    //Below removes CSS3 shimmer animation from text after a few seconds and replaces with simple color
    setTimeout(function(){
         $('h1:first').removeClass('shimmer');
         $('h1:first').text('Add a New Sixer!').css({'font-family': 'Montserrat','font-weight':'300','font-size':'3em','margin':'20px auto','padding': '0 40px', 'color': 'red'}); 
         $('h1:eq(1)').removeClass('shimmer');
         $('h1:eq(1)').text('Update Stats!').css({'font-family': 'Montserrat','font-weight':'300','font-size':'3em','margin':'20px auto','padding': '0 40px', 'color': 'red'});   
    }, 4000); 
    //AJAX call fetches any and all existing player data from database, forEach displays data
    $.ajax({
        url: "/data", 
        dataType: 'json',
        success: function(result){
            var dataTable = result;
            dataTable.forEach(function(el, i){
                $('#outer').prepend("<div class='datacell' id=" + i + "><h2>" + el.name + "</h2><p class='stats'>PPG: " + el.ppg + "</p><p class='stats'>RPG: " + el.rpg + "</p><p class='stats'>APG: " + el.apg + "</p><p><img src=" + el.pic +  " height='20%'></p></div>"); 
                });   
        }
    }); //Closes AJAX CALL 
});

