$(document).ready(function(){

  $('#submit_item').on('click',function() {

    var item = $('#add_item');
    var todo = {item: item.val()};

    $.ajax({

      type:'POST',
      url:'/todo',
      data:todo,

      success: function(data){
        location.reload();
      }
    });
  });

  $('li').on('click',function(){

    var item = $(this).text().replace(/ /g, "-");

    $.ajax({

      type:'DELETE',
      url:'/todo/' + item,
      success: function(data){

        location.reload();
      }
    });
  });
});
