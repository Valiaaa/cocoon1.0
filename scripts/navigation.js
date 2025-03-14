function bindNavigationEvents() {
    $('#all').click(function(){
      $('.category input[type="checkbox"]').prop("checked", true);
      $('.main').hide();
      $('.filter h2').css("display","inline-block");
    });
  
    $('#clear').click(function(){
      $('.category input[type="checkbox"]').prop("checked", false);
      $('.main').show();
      $('.filter h2').hide();
    });
  
    $('.category input[type="checkbox"]').change(function(){
      if ($('.category input[type="checkbox"]:checked').length) {
        $('.main').hide();
        $('.filter h2').hide().filter(function(){
          let classes = $(this).attr("class").split(" ");
          return classes.some(cls => $('#' + cls + 'c').is(':checked'));
        }).css("display","inline-block");
      } else {
        $('.main').show();
        $('.filter h2').hide();
      }
    });
  }
  
  $(document).ready(function(){
    // 如果导航已经加载，则绑定事件
    if($('#navigation').children().length > 0){
      bindNavigationEvents();
    }
  });  