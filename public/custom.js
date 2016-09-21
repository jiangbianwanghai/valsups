$(document).ready(function(){

  //提交按钮触发
  $("#add").on("click", function(){
    var total = parseInt($('#total').val());
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
          var elp = '<table class="table"><thead><tr><th>期</th><th>本息</th><th>本金</th><th>利息</th><th>剩余本金</th></tr></thead><tbody>';
          for(var p in data.res.elp.period){
            elp += '<tr><td>'+p+'</td><td>'+data.res.elp.period[p]['pa']+'</td><td>'+data.res.elp.period[p]['pp']+'</td><td>'+data.res.elp.period[p]['ip']+'</td><td>'+data.res.elp.period[p]['bo']+'</td></tr>';
          }
          elp += '</tbody></table><div style="font-size:12px;" align="right">* 数据仅供参考</div>';
          $('.elp').html(elp);
          //epp
          var epp = '<table class="table"><thead><tr><th>期</th><th>本息</th><th>本金</th><th>利息</th><th>剩余本金</th></tr></thead><tbody>';
          for(var p in data.res.epp.period){
            epp += '<tr><td>'+p+'</td><td>'+data.res.epp.period[p]['pa']+'</td><td>'+data.res.epp.period[p]['pp']+'</td><td>'+data.res.epp.period[p]['ip']+'</td><td>'+data.res.epp.period[p]['bo']+'</td></tr>';
          }
          epp += '</tbody></table><div style="font-size:12px;" align="right">* 数据仅供参考</div>';
          $('.epp').html(epp);
          $('#myModal').modal();
          $('#myModalLabel').append(' 贷款：'+total.toFixed(2)+' 万');
        }
      },
      error: function(xhr, type){
        alert('Ajax error!');
      }
    });
    return false;
  });

  $('#elp-tab').click(function(){
    $('#elp-tab').parent().addClass('active');
    $('#epp-tab').parent().removeClass('active');
    $('.elp').show();
    $('.epp').hide();
  });
  $('#epp-tab').click(function(){
    $('#epp-tab').parent().addClass('active');
    $('#elp-tab').parent().removeClass('active');
    $('.epp').show();
    $('.elp').hide();
  });

});
