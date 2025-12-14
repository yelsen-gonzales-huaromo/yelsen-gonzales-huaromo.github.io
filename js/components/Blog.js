export function loadBlogPosts() {
    const data = typeof blogPostsData !== 'undefined' ? blogPostsData : [];

    if (!data || data.length === 0) return;

    const blogContainer = document.querySelector('#blog-container');
    if (blogContainer) {
        blogContainer.innerHTML = data.map((post, index) => `
            <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="project-card">
                    <div class="project-img" style="height: 200px;">
                        <img src="${post.image}" alt="${post.title}">
                    </div>
                    <div class="project-content">
                        <div class="mb-2">
                            ${post.tags.map(tag => `<span class="badge bg-primary me-1">${tag}</span>`).join('')}
                        </div>
                        <h4 class="project-title" style="font-size: 1.2rem;">${post.title}</h4>
                        <p class="text-muted small mb-2">${post.date}</p>
                        <p class="project-desc">${post.excerpt}</p>
                        <a href="#" class="btn btn-outline-custom btn-sm mt-auto">Leer más</a>
                    </div>
                </div>
            </div>
        `).join('');
    }
}
