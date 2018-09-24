$(document).ready(function(){

  $('#submit_item').on('click',function() {

    var item = $('#add_item');
    var todo = {item: item.val(),completed:false};

    $.ajax({

      type:'POST',
      url:'/todo',
      data:todo,

      success: function(data){
        location.reload();
      }
    });
  });

  $('#remove').on('click',function(){

    var item = event.target.parentNode.getAttribute('id').replace(/ /g,"-");

    $.ajax({

      type:'DELETE',
      url:'/todo/' + item,
      success: function(data){

        location.reload();
      }
    });
  });

  $('#completed').on('click',function(){

    var item = event.target.parentNode.getAttribute('id').replace(/ /g,"-");
    $.ajax({

      type: 'POST',
      url: '/todo/complete/' + item,
      success: function(data){

        location.reload();
      }
    });
  });

  $('#un_completed').on('click',function(){

    var item = event.target.parentNode.getAttribute('id').replace(/ /g,"-");
    $.ajax({

      type: 'POST',
      url: '/todo/uncomplete/' + item,
      success: function(data){
        location.reload();
      }
    });
  });
});
