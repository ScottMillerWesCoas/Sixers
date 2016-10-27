
 $(document).ready(function(){
    $('#realStats').click(function(){
        window.location = './SixersRealStats.html'; 
    }); 
    setTimeout(function(){
         $('h1:first').removeClass('shimmer');
         $('h1:first').text('Add New Sixer!').css({'font-family':'Montserrat', 'font-weight':'bolder', 'color': 'red'}); 
         $('h1:eq(1)').removeClass('shimmer');
         $('h1:eq(1)').text('Update Info!').css({'font-family':'Montserrat', 'font-weight':'bolder', 'color': 'red'});   
    }, 4000); 
    $.ajax({
        url: "/data", 
        dataType: 'json',
        success: function(result){
            var dataTable = result;
            dataTable.forEach(function(el, i){
                $('#outer').prepend("<div class='datacell' id=" + i + "><h2>" + el.name + "</h2><p class='stats'>PPG: " + el.ppg + "</p><p class='stats'>RPG: " + el.rpg + "</p><p class='stats'>APG: " + el.apg + "</p><p><img src=" + el.pic +  " height='20%'></p></div>"); 
                }); 
                $('.datacell').each(function(i, el){
                    //$(el).on('click', clicked); 
                }); 
            // $('.square').each(function(i,el){
            // $(el).attr('id',i);
            // $(el).find('h1').text(dataTable[i].username); 
            // $(el).append('<p></p>'); 
            // $(el).find('p').text(dataTable[i].num).css({'color':'red', 'text-align':'center'});
            // $(el).on('click', clicked); 
            // }); 
 

    function clicked(e){
        var target = $(e.currentTarget); 
        var index = target.attr('id'); 
        dataTable[index].num++; 
        target.css({'background-color': 'blue', 'color': 'white', 'border': '2px solid black', 'border-radius': '15px'}); 
        target.find('p').text(dataTable[index].num);
   // $('.table').find('#added').append(dataTable[index].name + ' ' +  dataTable[index].num +'<br>'); 
       // $('.table').find('#name').append(dataTable[index].name); 
    //localStorage.setItem('dataTable', JSON.stringify(dataTable));  
        }
    }
// }); 
}); 




});

