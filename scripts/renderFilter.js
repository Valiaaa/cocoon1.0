document.addEventListener('DOMContentLoaded', function() {
    fetch(basePath + "../archive/data.json")
    .then(response => response.json())
    .then(data => {
        const projectContainer = document.getElementById('filtered-projects');
        projectContainer.style.visibility = 'hidden'; // 🚀 先隐藏，防止加载时闪烁
        projectContainer.innerHTML = ''; // 清空旧内容

        // 获取 URL 里的 filter 参数
        const urlParams = new URLSearchParams(window.location.search);
        const selectedFilters = urlParams.get("filter") ? urlParams.get("filter").split(",") : [];

        // 🟢 遍历所有作品，创建 HTML 结构
        let filteredProjects = '';
        data.projects.forEach(project => {
            const folderName = project.title.toLowerCase().replace(/ /g, "_");
            const projectLink = `archive/${folderName}/${folderName}.html`;
            const projectCover = `archive/${folderName}/cover1.jpg`;

            const matchesFilter = selectedFilters.length === 0 || selectedFilters.some(filter => project.categories.includes(filter));

            if (matchesFilter) {
                filteredProjects += `
                <div class="project ${project.categories.join(" ")}">
                    <a href="${projectLink}">
                        <img src="${projectCover}" alt="${project.title}">
                    </a>
                </div>
                `;
            }
        });

        // 🚀 一次性插入所有作品（减少 DOM 操作，提高性能）
        projectContainer.innerHTML = filteredProjects;
        projectContainer.style.visibility = 'visible'; // 🚀 让内容显示，减少闪烁

        // 🟢 更新 Checkbox 状态（确保在作品加载后执行）
        $('.category input[type="checkbox"]').each(function() {
            const category = $(this).attr('id').replace('c', '').trim();
            $(this).prop("checked", selectedFilters.includes(category));
        });

        // 绑定导航事件
        bindNavigationEvents();
    })
    .catch(err => console.error("Error loading projects:", err));
});