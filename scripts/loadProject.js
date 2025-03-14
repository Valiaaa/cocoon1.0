document.addEventListener('DOMContentLoaded', function() {
    const filename = window.location.pathname.split("/").pop().split("?")[0].replace(".html", "");

    fetch('../data.json')
        .then(response => response.json())
        .then(data => {
            const project = data.projects.find(p => p.filename === filename);
            document.getElementById('project-title').textContent = project.title;
            document.getElementById('project-medium').textContent = project.medium || "N/A";
            document.getElementById('project-dimension').textContent = project.dimension || "N/A";
            document.getElementById('project-date').textContent = project.date || "N/A";
            document.getElementById('project-duration').textContent = project.duration || "N/A";
            document.getElementById('project-description').innerHTML = project.description || "";
        })
        .catch(err => console.error("❌ Error loading project data:", err));
});