document.addEventListener('DOMContentLoaded', function() {
    // 🚀 确保获取正确的文件名
    let filename = window.location.pathname.split("/").pop().split("?")[0].replace(".html", "");

    console.log("🔍 Checking filename:", filename); // ✅ 调试信息

    fetch('../../data.json')
    .then(response => response.json())
    .then(data => {
        const project = data.projects.find(p => p.filename === filename);

        if (!project) {
            console.error("❌ Project not found in data.json for filename:", filename);
            return;
        }

        console.log("✅ Loaded project:", project.title); // ✅ 调试信息

        // 填充项目信息
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-filename').textContent = project.filename;
        document.getElementById('project-medium').textContent = project.medium || "N/A";
        document.getElementById('project-dimension').textContent = project.dimension || "N/A";
        document.getElementById('project-date').textContent = project.date || "N/A";
        document.getElementById('project-duration').textContent = project.duration || "N/A";
        document.getElementById('project-description').innerHTML = project.description || "";

    })
    .catch(err => console.error("❌ Error loading project data:", err));
});