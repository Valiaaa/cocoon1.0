function bindNavigationEvents() {
    console.log("✅ Binding navigation events...");

    const checkboxes = document.querySelectorAll(".category input[type='checkbox']");
    const allButton = document.getElementById("all");
    const clearButton = document.getElementById("clear");

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            const selectedCategories = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.id.replace('c', '').trim());

            if (selectedCategories.length === 0) {
                console.log("🚀 No filters selected, returning to home.");
                window.location.href = basePath + "../index.html";
            } else {
                console.log("🚀 Filters selected:", selectedCategories);
                window.location.href = basePath + "../filter.html?filter=" + selectedCategories.join(",");
            }
        });
    });

    if (allButton) {
        allButton.addEventListener("click", function () {
            checkboxes.forEach(cb => cb.checked = true);
            const allCategories = Array.from(checkboxes).map(cb => cb.id.replace('c', '').trim());
            console.log("🚀 All categories selected:", allCategories);
            window.location.href = basePath + "../filter.html?filter=" + selectedCategories.join(",");
        });
    }

    if (clearButton) {
        clearButton.addEventListener("click", function () {
            checkboxes.forEach(cb => cb.checked = false);
            console.log("🚀 Clear button clicked, returning to home.");
            window.location.href = basePath + "../index.html";
        });
    }

    // 🚀 确保刷新后仍然保持选中状态
    const urlParams = new URLSearchParams(window.location.search);
    const selectedFilters = urlParams.get("filter") ? urlParams.get("filter").split(",") : [];

    checkboxes.forEach(cb => {
        const category = cb.id.replace('c', '').trim();
        cb.checked = selectedFilters.includes(category);
    });
}

// 🛠 动态获取当前 JS 文件的路径
function getScriptBasePath() {
    let scriptSrc = document.currentScript ? document.currentScript.src : "";
    return scriptSrc.substring(0, scriptSrc.lastIndexOf("/") + 1); // 计算 JS 目录
}

const basePath = getScriptBasePath();
console.log("📂 Detected JS Base Path:", basePath);

// 🛠 确保 `navigation.html` 的路径正确
const navigationHTMLPath = basePath + "../components/navigation.html"; 

// 🚀 **确保 `navigation.html` 加载完成后绑定事件**
document.addEventListener("DOMContentLoaded", function () {
    const navContainer = document.getElementById("navigation");

    if (navContainer) {
        $(navContainer).load(navigationHTMLPath, function() {
            console.log("✅ Navigation loaded from:", navigationHTMLPath);
            bindNavigationEvents();
        });
    } else {
        console.error("❌ Navigation container not found!");
    }
});

// 🚀 绑定导航交互事件（保持原代码不变）
function bindNavigationEvents() {
    console.log("✅ Binding navigation events...");

    const checkboxes = document.querySelectorAll(".category input[type='checkbox']");
    const allButton = document.getElementById("all");
    const clearButton = document.getElementById("clear");

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            const selectedCategories = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.id.replace('c', '').trim());

            if (selectedCategories.length === 0) {
                console.log("🚀 No filters selected, returning to home.");
                window.location.href = basePath + "../index.html";
            } else {
                console.log("🚀 Filters selected:", selectedCategories);
                window.location.href = basePath + "../filter.html?filter=" + selectedCategories.join(",");
            }
        });
    });

    if (allButton) {
        allButton.addEventListener("click", function () {
            checkboxes.forEach(cb => cb.checked = true);
            const allCategories = Array.from(checkboxes).map(cb => cb.id.replace('c', '').trim());
            console.log("🚀 All categories selected:", allCategories);
            window.location.href = basePath + "../filter.html?filter=" + selectedCategories.join(",");
        });
    }

    if (clearButton) {
        clearButton.addEventListener("click", function () {
            checkboxes.forEach(cb => cb.checked = false);
            console.log("🚀 Clear button clicked, returning to home.");
            window.location.href = basePath + "../index.html";
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const selectedFilters = urlParams.get("filter") ? urlParams.get("filter").split(",") : [];

    checkboxes.forEach(cb => {
        const category = cb.id.replace('c', '').trim();
        cb.checked = selectedFilters.includes(category);
    });
}

// 🚀 绑定菜单按钮事件
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".hamburger-menu").addEventListener("click", function () {
        this.classList.toggle("expanded");
        document.getElementById("navigation").classList.toggle("expanded");
    });
});