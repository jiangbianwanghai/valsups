$(document).ready(function(){

  //提交按钮触发
  $("#add").on("click", function(){
    $.ajax({
      type: 'post',
      url: '/post',
      data:{
        'method': $('#method').val(),
        'year': $('#year').val(),
        'total': $('#total').val(),
        'rate': $('#rate').val(),
      },
      dataType: "json",
      /*headers: {
        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
      },*/
      success: function(data){
        /*if (data.errors) {
          for(var p in data.errors.validator){
            if($('#add_'+ p +'_block').length) {
              $('#add_'+ p +'_block').text(data.errors.validator[p]);
            } else {
              $('#add_'+ p).parent().append('<span class="help-block" id="add_'+ p +'_block"><strong>'+ data.errors.validator[p] +'</strong></span>');
            }
          }
        } else {
          $('.help-block').remove();
          alert('提交成功，返回:'+data.id);
        }*/
      },
      error: function(xhr, type){
        alert('Ajax error!');
      }
    });
    return false;
  });

});
