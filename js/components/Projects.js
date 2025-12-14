export function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');
    const allProjectsContainer = document.getElementById('all-projects-container');
    const data = window.projectsData || (typeof projectsData !== 'undefined' ? projectsData : []);

    if (!projectsContainer) return;

    if (!data || data.length === 0) {
        projectsContainer.innerHTML = '<div class="text-center">No projects found.</div>';
        return;
    }

    // Use centralized tech icon helper (imported in app.js)
    const getTechIconClass = (tag) => {
        return window.getTechIconClass ? window.getTechIconClass(tag) : 'fas fa-code';
    };

    // --- 1. Populate Swiper (Carousel) ---
    let html = `
    <div class="swiper-container-wrapper position-relative">
        <div class="swiper projectsSwiper">
            <div class="swiper-wrapper">
    `;

    html += data.map((project, index) => {
        const images = project.images || [];
        const img = images.length > 0 ? images[0] : 'placeholder.jpg';

        // Internal carousel for multiple images per project
        const carouselId = `projectCarousel${index}`;
        const carouselItems = images.map((img, i) => `
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
                <img src="${img}" class="d-block w-100" alt="${project.title}" style="height: 250px; object-fit: cover;" ${i === 0 ? '' : 'loading="lazy"'}>
            </div>
        `).join('');

        return `
        <div class="swiper-slide">
            <div class="project-card h-100 position-relative">
                <div id="${carouselId}" class="carousel slide" data-bs-ride="false">
                    <div class="carousel-inner">
                        ${carouselItems}
                        <div class="project-overlay-gradient"></div>
                        <div class="project-tech-overlay">
                            ${project.tags.slice(0, 4).map(tag => `
                                <span class="tech-icon-mini" data-tooltip="${tag}"><i class="${getTechIconClass(tag)}"></i></span>
                            `).join('')}
                        </div>
                        <div class="project-actions-overlay">
                            <a href="${project.demoLink}" class="action-btn-floating" target="_blank" data-tooltip="Ver Demo"><i class="fas fa-external-link-alt"></i></a>
                            <a href="${project.repoLink}" class="action-btn-floating ms-2" target="_blank" data-tooltip="Ver Código"><i class="fab fa-github"></i></a>
                        </div>
                    </div>
                    ${images.length > 1 ? `
                    <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                    ` : ''}
                </div>
                <div class="project-content d-flex flex-column h-100 pt-4">
                    <h4 class="project-title">${project.title}</h4>
                    <p class="project-desc flex-grow-1">${project.description.substring(0, 100)}...</p>
                </div>
            </div>
        </div>
        `;
    }).join('');

    html += `
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <!-- Buttons Outside -->
        <div class="custom-swiper-button-next proj-next"></div>
        <div class="custom-swiper-button-prev proj-prev"></div>
    </div>
    
    <div class="text-center mt-5">
        <button type="button" class="btn btn-outline-custom rounded-pill px-5" data-bs-toggle="modal" data-bs-target="#allProjectsModal">
            Mostrar Más Proyectos <i class="fas fa-plus-circle ms-2"></i>
        </button>
    </div>
    `;

    projectsContainer.innerHTML = html;

    // Initialize Swiper (Assume Global Swiper)
    if (typeof Swiper !== 'undefined') {
        new Swiper(".projectsSwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 1000,
            loop: true,
            observer: true,
            observeParents: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".proj-next",
                prevEl: ".proj-prev",
            },
            breakpoints: {
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    }

    // --- 2. Populate Modal (Grid View) ---
    if (allProjectsContainer) {
        allProjectsContainer.innerHTML = data.map(project => {
            const images = project.images || [];
            const img = images.length > 0 ? images[0] : 'placeholder.jpg';
            return `
            <div class="col-lg-4 col-md-6">
                <div class="project-card h-100 position-relative">
                    <div class="project-img-wrapper" style="height: 200px; overflow: hidden; position: relative;">
                        <img src="${img}" class="img-fluid w-100 h-100" style="object-fit: cover;" loading="lazy" alt="${project.title}">
                         <div class="project-overlay-gradient"></div>
                         <div class="project-tech-overlay">
                            ${project.tags.slice(0, 3).map(tag => `
                                <span class="tech-icon-mini" data-tooltip="${tag}"><i class="${getTechIconClass(tag)}"></i></span>
                            `).join('')}
                        </div>
                    </div>
                    <div class="project-content p-4">
                        <h5 class="project-title mb-2">${project.title}</h5>
                        <p class="project-desc small mb-3">${project.description}</p>
                        <div class="d-flex gap-2">
                            <a href="${project.demoLink}" class="btn btn-sm btn-primary-custom flex-grow-1" target="_blank">Demo</a>
                            <a href="${project.repoLink}" class="btn btn-sm btn-outline-custom flex-grow-1" target="_blank">Code</a>
                        </div>
                    </div>
                </div>
            </div>
        `}).join('');
    }
}
