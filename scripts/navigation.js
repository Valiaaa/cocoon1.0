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
                window.location.href = "/index.html"; // ✅ 绝对路径，确保正确返回首页
            } else {
                console.log("🚀 Filters selected:", selectedCategories);
                window.location.href = `/filter.html?filter=${selectedCategories.join(",")}`; // ✅ 绝对路径，确保在所有页面都正确跳转
            }
        });
    });

    if (allButton) {
        allButton.addEventListener("click", function () {
            checkboxes.forEach(cb => cb.checked = true);
            const allCategories = Array.from(checkboxes).map(cb => cb.id.replace('c', '').trim());
            console.log("🚀 All categories selected:", allCategories);
            window.location.href = `/filter.html?filter=${allCategories.join(",")}`;
        });
    }

    if (clearButton) {
        clearButton.addEventListener("click", function () {
            checkboxes.forEach(cb => cb.checked = false);
            console.log("🚀 Clear button clicked, returning to home.");
            window.location.href = "/index.html"; // ✅ 确保清空后跳回首页
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



// 自动检测运行环境
const isGitHubPages = window.location.hostname === "valiaaa.github.io";
const baseURL = isGitHubPages ? "/cocoon1.0/" : "/"; // GitHub 用 `/cocoon1.0/`，本地用 `/`

// 修正所有 <a> 标签的路径
document.querySelectorAll("a").forEach(link => {
    if (link.getAttribute("href") && !link.href.startsWith("http")) {
        link.href = baseURL + link.getAttribute("href").replace(/^\/+/, "");
    }
});

// 修正所有图片、CSS、JS 路径
document.querySelectorAll("img, link[rel='stylesheet'], script").forEach(el => {
    const srcAttr = el.tagName === "SCRIPT" ? "src" : "href";
    if (el.getAttribute(srcAttr) && !el[srcAttr].startsWith("http")) {
        el[srcAttr] = baseURL + el.getAttribute(srcAttr).replace(/^\/+/, "");
    }
});
