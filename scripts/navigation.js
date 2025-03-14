function bindNavigationEvents() {
  $('.category input[type="checkbox"]').off('change').on('change', filterProjects);

  $('#all').off('click').on('click', function(){
    $('.category input[type="checkbox"]').prop("checked", true);
    filterProjects();
  });

  $('#clear').off('click').on('click', function(){
    $('.category input[type="checkbox"]').prop("checked", false);
    filterProjects();
  });
}

function filterProjects() {
  const categories = $('.category input[type="checkbox"]:checked').map(function(){
    return $(this).attr('id').replace('c', '').trim();
  }).get();

  if (categories.length > 0) {
    $('.project').hide().filter(function(){
      return categories.some(category => $(this).hasClass(category));
    }).show();
  } else {
    $('.project').show();
  }
}

$(document).ready(function(){
  $('#navigation').load('components/navigation.html', function(){
    bindNavigationEvents();
  });
});