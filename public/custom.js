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
        if (data.errors) {
          for(var p in data.errors.validator){
            if($('#add_'+ p +'_block').length) {
              $('#add_'+ p +'_block').text(data.errors.validator[p]);
            } else {
              $('#add_'+ p).parent().append('<span class="help-block" id="add_'+ p +'_block"><strong>'+ data.errors.validator[p] +'</strong></span>');
            }
          }
        } else {
          $('.help-block').remove();
          var tb = '<table class="table"><thead><tr><th>期</th><th>本息</th><th>本金</th><th>利息</th><th>剩余本金</th></tr></thead><tbody>';
          for(var p in data.res.period){
            tb += '<tr><td>'+p+'</td><td>'+data.res.period[p]['pa']+'</td><td>'+data.res.period[p]['pp']+'</td><td>'+data.res.period[p]['ip']+'</td><td>'+data.res.period[p]['bo']+'</td></tr>';
          }
          tb += '</tbody></table><div style="font-size:12px;" align="right">* 数据仅供参考</div>';
          $('.modal-body').html(tb);
          $('#myModal').modal();
        }
      },
      error: function(xhr, type){
        alert('Ajax error!');
      }
    });
    return false;
  });

});
