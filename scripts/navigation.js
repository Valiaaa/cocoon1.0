function bindNavigationEvents() {
  // 监听 checkbox 变化
  $('.category input[type="checkbox"]').on('change', function() {
      const selectedCategories = $('.category input[type="checkbox"]:checked').map(function() {
          return $(this).attr('id').replace('c', '').trim();
      }).get();

      // 🚀 如果没有选中的 checkbox，跳转回首页
      if (selectedCategories.length === 0) {
          window.location.href = "index.html";
      } else {
          setTimeout(() => {
              window.location.href = `filter.html?filter=${selectedCategories.join(",")}`;
          }, 100);
      }
  });

  // “全部” 按钮
  $('#all').on('click', function(){
      $('.category input[type="checkbox"]').prop("checked", true);
      const allCategories = $('.category input[type="checkbox"]').map(function() {
          return $(this).attr('id').replace('c', '').trim();
      }).get();
      window.location.href = `filter.html?filter=${allCategories.join(",")}`;
  });

  // “清除” 按钮（跳转回首页）
  $('#clear').on('click', function(){
      $('.category input[type="checkbox"]').prop("checked", false);
      window.location.href = "index.html";
  });

  // 🚀 确保刷新后仍然保持选中状态
  const urlParams = new URLSearchParams(window.location.search);
  const selectedFilters = urlParams.get("filter") ? urlParams.get("filter").split(",") : [];

  $('.category input[type="checkbox"]').each(function() {
      const category = $(this).attr('id').replace('c', '').trim();
      $(this).prop("checked", selectedFilters.includes(category));
  });
}

// 确保导航栏在加载后绑定事件
$(document).ready(function(){
  $('#navigation').load('components/navigation.html', function(){
      bindNavigationEvents();
  });
});