// 🛠 1. 动态获取当前 JS 文件的路径
function getScriptBasePath() {
    let scriptSrc = document.currentScript ? document.currentScript.src : "";
    return scriptSrc.substring(0, scriptSrc.lastIndexOf("/") + 1);
}

const basePath = getScriptBasePath();
console.log("📂 Detected JS Base Path:", basePath);

// 🛠 2. 动态加载 navigation.html 并绑定事件
document.addEventListener("DOMContentLoaded", function () {
    const navContainer = document.getElementById("navigation");
    if (navContainer) {
        $(navContainer).load(basePath + "../components/navigation.html", function () {
            console.log("✅ Navigation loaded.");
            bindNavigationEvents();
        });
    } else {
        console.error("❌ Navigation container not found!");
    }

    // 5. 移动端汉堡菜单交互
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener("click", function () {
            this.classList.toggle("expanded");
            document.getElementById("navigation").classList.toggle("expanded");
        });
    }

    document.addEventListener("click", function(e) {
        const nav = document.getElementById("navigation");
        const hamburgerMenu = document.querySelector(".hamburger-menu");
    
        if (nav.classList.contains("expanded")) {
            const clickInsideNav = nav.contains(e.target);
            const clickHamburger = hamburgerMenu.contains(e.target);
    
            if (!clickInsideNav && !clickHamburger) {
                // 如果点击了导航之外的区域，自动关闭菜单
                nav.classList.remove("expanded");
                hamburgerMenu.classList.remove("expanded");
            }
        }
    });
});

// 🚩 3. 合并后的导航栏交互事件绑定
function bindNavigationEvents() {
    const currentPage = window.location.pathname.split('/').pop();
    const checkboxes = document.querySelectorAll(".category input[type='checkbox']");
    const allButton = document.getElementById("all");
    const clearButton = document.getElementById("clear");

    // checkbox状态变化处理
    document.querySelector('.category').addEventListener('change', function(e) {
        if (e.target.type === 'checkbox') {
            const selectedCategories = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.id.replace('c', '').trim());

            if (currentPage === 'filter.html') {
                applyFilter();
            } else {
                const targetPage = selectedCategories.length ? 
                    basePath + "../filter.html?filter=" + selectedCategories.join(",") : 
                    basePath + "../index.html";

                window.location.href = targetPage;
            }
        }
    });

    // "All" 按钮点击事件（自动跳转或筛选）
    if (allButton) {
        allButton.addEventListener("click", function () {
            checkboxes.forEach(cb => cb.checked = true);
            
            if (currentPage === 'filter.html') {
                applyFilter();
            } else {
                // 跳转到filter页面，并附带所有分类
                const allCategories = Array.from(checkboxes)
                    .map(cb => cb.id.replace('c', '').trim());

                window.location.href = basePath + "../filter.html?filter=" + allCategories.join(",");
            }
        });
    }

    // "Clear" 按钮跳回首页
    if (clearButton) {
        clearButton.addEventListener("click", function () {
            window.location.href = basePath + "../index.html";
        });
    }

    // 页面加载时，根据 URL 参数恢复复选框状态并执行初始筛选
    const urlParams = new URLSearchParams(window.location.search);
    const selectedFilters = urlParams.get("filter") ? urlParams.get("filter").split(",") : [];
    checkboxes.forEach(cb => {
        const category = cb.id.replace('c', '').trim();
        cb.checked = selectedFilters.includes(category);
    });

    if (currentPage === 'filter.html') applyFilter();
}

// ✨ applyFilter 函数，用于动态显示/隐藏项目
function applyFilter() {
    const checkboxes = document.querySelectorAll(".category input[type='checkbox']");
    const selectedCategories = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.id.replace('c', '').trim());

    const allWorks = document.querySelectorAll('.work');

    if (selectedCategories.length === 0 || selectedCategories.includes('all')) {
        allWorks.forEach(work => work.classList.remove('hidden'));
        updateURL([]);
    } else {
        allWorks.forEach(work => {
            const match = selectedCategories.some(cat => work.classList.contains(cat));
            work.classList.toggle('hidden', !match);
        });
        updateURL(selectedCategories);
    }
}

// 🛠 更新浏览器URL（不刷新页面）
function updateURL(categories) {
    const newURL = categories.length ? 
        `${window.location.pathname}?filter=${categories.join(",")}` : 
        window.location.pathname;

    history.replaceState({}, "", newURL);
}