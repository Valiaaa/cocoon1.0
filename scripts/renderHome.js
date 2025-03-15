document.addEventListener('DOMContentLoaded', function(){
  fetch('archive/data.json')
    .then(response => response.json())
    .then(data => {
      const featuredContainer = document.querySelector('.featured-projects');
      featuredContainer.innerHTML = '';

      // 只筛选 feature=true 的作品
      const featuredProjects = data.projects.filter(project => project.feature);

      featuredProjects.forEach(project => {
        const folderName = project.filename;
        const projectLink = `archive/${folderName}/${folderName}.html`;
        const projectCover1 = `archive/${folderName}/cover1.jpg`;
        const projectCover2 = `archive/${folderName}/cover2.jpg`;

        let mediaContent = project.video
          ? `
            <div class="vimeo-container">
              <iframe src="${project.video}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="${project.title}"></iframe>
            </div>
            `
          : `
            <div class="image-group">
              <a href="${projectLink}"><img src="${projectCover1}" alt="${project.title} - 1"></a>
              <a href="${projectLink}"><img src="${projectCover2}" alt="${project.title} - 2"></a>
            </div>
            `;

        const html = `
        <div class="featured-project">
            <div class="media-container">
                ${mediaContent}
            </div>
            <div class="project-info">
                <a href="${projectLink}"><h1>${project.title}</h1></a>
                <a href="${projectLink}"><h2>${project.medium || ''}</h2></a>
            </div>
        </div>
        `;
        featuredContainer.insertAdjacentHTML('beforeend', html);
      });

      // 🚀 让 h1 和 h2 互相触发 hover
      document.querySelectorAll(".project-info").forEach(info => {
          const h1 = info.querySelector("h1");
          const h2 = info.querySelector("h2");

          if (h1 && h2) {
              h1.addEventListener("mouseenter", () => {
                  h2.classList.add("hover-effect");
                  h1.classList.add("hover-effect");
              });
              h1.addEventListener("mouseleave", () => {
                  h2.classList.remove("hover-effect");
                  h1.classList.remove("hover-effect");
              });

              h2.addEventListener("mouseenter", () => {
                  h1.classList.add("hover-effect");
                  h2.classList.add("hover-effect");
              });
              h2.addEventListener("mouseleave", () => {
                  h1.classList.remove("hover-effect");
                  h2.classList.remove("hover-effect");
              });
          }
      });

    })
    .catch(err => console.error('Error loading data.json:', err));
});