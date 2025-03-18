function renderProjects() {
    fetch(basePath + "../archive/data.json")
    .then(response => response.json())
    .then(data => {
        const projectContainer = document.getElementById('filtered-projects');
        projectContainer.innerHTML = ''; // 清空旧内容

        data.projects.forEach(project => {
            const folderName = project.title.toLowerCase().replace(/ /g, "_");
            const projectLink = `archive/${folderName}/${folderName}.html`;
            const projectCover = `archive/${folderName}/cover1.jpg`;

            // 项目拥有的分类
            const projectClasses = project.categories.map(c => c.toLowerCase()).join(" ");

            // 默认添加 hidden 类
            const projectBlock = `
                <div class="work ${projectClasses} hidden">
                    <a href="${projectLink}">
                        <img src="${projectCover}" alt="${project.title}">
                    </a>
                </div>
            `;

            projectContainer.innerHTML += projectBlock;
        });

        // 根据 URL 设置默认筛选项
        applyFiltersFromURL();
    })
    .catch(err => console.error("Error loading projects:", err));
}

// 解析 URL，激活对应分类
function applyFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedFilters = urlParams.get("filter") ? urlParams.get("filter").split(",") : [];

    // 如果是 'all'，显示所有 work
    if (selectedFilters.includes("all") || selectedFilters.length === 0) {
        document.querySelectorAll('.work').forEach(work => work.classList.remove('hidden'));
    } else {
        // 先隐藏所有 work
        document.querySelectorAll('.work').forEach(work => work.classList.add('hidden'));

        // 仅显示匹配筛选条件的 work
        selectedFilters.forEach(filter => {
            document.querySelectorAll(`.${filter}`).forEach(work => work.classList.remove('hidden'));
        });
    }

    // ✅ 更新 Checkbox 选中状态
    document.querySelectorAll('.category input[type="checkbox"]').forEach(input => {
        const category = input.id.replace('c', '').trim();
        input.checked = selectedFilters.includes(category);
    });
}

// 🚀 监听 URL 变化，实时更新内容
window.addEventListener('popstate', applyFiltersFromURL);

// 🚀 初始加载
document.addEventListener('DOMContentLoaded', renderProjects);