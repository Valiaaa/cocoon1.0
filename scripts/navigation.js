// 自动检测 GitHub Pages 还是本地环境
const isGitHubPages = window.location.hostname === "valiaaa.github.io";
const baseURL = isGitHubPages ? "/cocoon1.0/" : "/"; // GitHub 用 `/cocoon1.0/`，本地用 `/`

function navigateTo(page) {
    window.location.href = baseURL + page.replace(/^\/+/, "");
}

// 绑定 filter 事件
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
                navigateTo("index.html");
            } else {
                console.log("🚀 Filters selected:", selectedCategories);
                navigateTo(`filter.html?filter=${selectedCategories.join(",")}`);
            }
        });
    });

    if (allButton) {
        allButton.addEventListener("click", function () {
            checkboxes.forEach(cb => cb.checked = true);
            const allCategories = Array.from(checkboxes).map(cb => cb.id.replace('c', '').trim());
            console.log("🚀 All categories selected:", allCategories);
            navigateTo(`filter.html?filter=${allCategories.join(",")}`);
        });
    }

    if (clearButton) {
        clearButton.addEventListener("click", function () {
            checkboxes.forEach(cb => cb.checked = false);
            console.log("🚀 Clear button clicked, returning to home.");
            navigateTo("index.html");
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

// 🚀 **确保在 `navigation.html` 加载完成后绑定事件**
document.addEventListener("DOMContentLoaded", function () {
    const navContainer = document.getElementById("navigation");

    if (navContainer) {
        $("#navigation").load("components/navigation.html", function() {
            console.log("✅ Navigation loaded.");
            bindNavigationEvents();
        });
    } else {
        console.error("❌ Navigation container not found!");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".hamburger-menu").addEventListener("click", function () {
        this.classList.toggle("expanded");
        document.getElementById("navigation").classList.toggle("expanded");
    });
});