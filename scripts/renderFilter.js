function renderFilteredProjects() {
    fetch(basePath + "../archive/data.json")
    .then(response => response.json())
    .then(data => {
        const projectContainer = document.getElementById('filtered-projects');
        projectContainer.style.visibility = 'hidden'; // 🚀 防止加载时闪烁
        projectContainer.innerHTML = ''; // 清空旧内容

        const urlParams = new URLSearchParams(window.location.search);
        const selectedFilters = urlParams.get("filter") ? urlParams.get("filter").split(",") : [];

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

        projectContainer.innerHTML = filteredProjects;
        projectContainer.style.visibility = 'visible'; // 🚀 让内容显示

        // ✅ 更新 Checkbox 状态（避免 UI 不同步）
        $('.category input[type="checkbox"]').each(function() {
            const category = $(this).attr('id').replace('c', '').trim();
            $(this).prop("checked", selectedFilters.includes(category));
        });
    })
    .catch(err => console.error("Error loading projects:", err));
}

// 🚀 监听 URL 变化，实时更新内容
window.addEventListener('popstate', renderFilteredProjects);

// 🚀 初始加载
document.addEventListener('DOMContentLoaded', renderFilteredProjects);