document.addEventListener('DOMContentLoaded', function(){
  fetch('archive/home.json')
    .then(response => response.json())
    .then(data => {
      const featuredContainer = document.querySelector('.featured-projects');
      featuredContainer.innerHTML = '';

      data.featured.forEach(project => {
        const folderName = project.title.toLowerCase().replace(/ /g, "_");

        const projectLink = `archive/${folderName}/${folderName}.html`;
        const projectCover1 = `archive/${folderName}/cover1.jpg`;
        const projectCover2 = `archive/${folderName}/cover2.jpg`;

        // 如果 `video` 存在，使用 Vimeo iframe
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
                <a href="${projectLink}"><h2>${project.subtitle}</h2></a>
            </div>
        </div>
        `;
        featuredContainer.insertAdjacentHTML('beforeend', html);
      });
    })
    .catch(err => console.error('Error loading home.json:', err));
});