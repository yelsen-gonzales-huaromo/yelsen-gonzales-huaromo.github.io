// Initialize Theme Immediately to prevent flash
initTheme();

// Load Data Immediately (if available) to speed up initial paint
loadProfile();
loadSkills();
loadProjects();
loadCertificates();
loadExperience();
loadEducation();
// loadBlogPosts();
loadComments();

document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            mirror: false,
            offset: 50,
            delay: 50,
        });
    }

    // Initialize Interactive Elements
    initTypewriter();
    initForms();
    initFooterYear();
    initGridInteraction();
    initFloatingShapes();

    // Navbar Scroll Effect & Auto-close
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Close mobile menu on scroll
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
});

// Theme Management
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const icon = themeToggleBtn.querySelector('i');
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(icon, currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';

        if (document.startViewTransition) {
            document.startViewTransition(() => {
                setTheme(newTheme);
            });
        } else {
            setTheme(newTheme);
        }
    });

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(icon, theme);
    }
}

function updateThemeIcon(icon, theme) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Data Loading Functions
function loadProfile() {
    if (typeof profileData === 'undefined') return;

    const brand = document.querySelector('.navbar-brand');
    if (brand) {
        brand.innerHTML = `
            <span class="brand-logo">${profileData.brandName || '{codeia}'}</span>
            <span class="brand-separator">|</span>
            <span class="brand-tagline">${profileData.brandTagline || 'Consultoría & Desarrollo'}</span>
        `;
    }

    // Hero Section
    const heroTitle = document.querySelector('#hero-title');
    if (heroTitle) {
        const headlineText = profileData.heroHeadline || `Hola, soy ${profileData.name}`;
        heroTitle.innerHTML = `<span class="gradient-text">${headlineText}</span>`;
    }

    const heroRole = document.querySelector('#hero-role');
    if (heroRole && (!profileData.roles || profileData.roles.length === 0)) {
        heroRole.textContent = profileData.role;
    }

    const heroText = document.querySelector('#hero-text');
    if (heroText) heroText.textContent = profileData.heroText;

    const aboutName = document.querySelector('#about-name-display');
    if (aboutName) aboutName.textContent = profileData.name;

    const aboutDesc = document.querySelector('#about-description');
    if (aboutDesc) aboutDesc.innerHTML = profileData.aboutDescription;

    const aboutQuote = document.querySelector('#about-quote');
    if (aboutQuote && profileData.aboutQuote) {
        aboutQuote.textContent = `"${profileData.aboutQuote}"`;
    }

    // Social Links Rendering Function
    const renderSocials = (containerSelector) => {
        const container = document.querySelector(containerSelector);
        if (container && profileData.socialLinks) {
            const iconMap = {
                github: 'fab fa-github',
                linkedin: 'fab fa-linkedin',
                whatsapp: 'fab fa-whatsapp',
                tiktok: 'fab fa-tiktok',
                twitter: 'fab fa-twitter',
                instagram: 'fab fa-instagram',
            };

            const labelMap = {
                github: 'Ver Código',
                linkedin: 'Conectar',
                whatsapp: 'Conversar',
                tiktok: 'Ver Videos',
                twitter: 'Seguir',
                instagram: 'Seguir',
            };

            const linksHTML = Object.entries(profileData.socialLinks).map(([platform, url], index) => {
                const iconClass = iconMap[platform] || 'fas fa-link';
                const label = labelMap[platform] || platform;
                const delay = (index + 1) * 100;
                return `<a href="${url}" target="_blank" class="social-icon animate-float" style="animation-delay: ${delay}ms;" data-platform="${platform}">
                            <i class="${iconClass}"></i>
                            <span class="social-label">${label}</span>
                        </a>`;
            }).join('');

            container.innerHTML = linksHTML;
        }
    };

    renderSocials('#hero-socials');
    renderSocials('.social-links');

    if (profileData.socialLinks) {
        const updateSocialCard = (platform, url) => {
            const card = document.querySelector(`.social-card.${platform}`);
            if (card) {
                const link = card.closest('a');
                if (link && url) link.href = url;
            }
        };

        updateSocialCard('github', profileData.socialLinks.github);
        updateSocialCard('linkedin', profileData.socialLinks.linkedin);
        updateSocialCard('instagram', profileData.socialLinks.instagram);
        updateSocialCard('tiktok', profileData.socialLinks.tiktok);
    }
}

// --- LOAD PROJECTS (Swiper Carousel) ---
function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');
    const allProjectsContainer = document.getElementById('all-projects-container');

    if (!projectsContainer) return;

    if (typeof projectsData === 'undefined') {
        projectsContainer.innerHTML = '<div class="text-center">No projects found.</div>';
        return;
    }

    // Icon Mapping
    const getTechIconClass = (tag) => {
        const map = {
            'React': 'fab fa-react',
            'Next.js': 'fas fa-code',
            'JavaScript': 'fab fa-js',
            'TypeScript': 'fas fa-code',
            'Tailwind CSS': 'fas fa-wind',
            'HTML5': 'fab fa-html5',
            'CSS3': 'fab fa-css3-alt',
            'Node.js': 'fab fa-node',
            'Express': 'fas fa-server',
            'Python': 'fab fa-python',
            'Django': 'fas fa-laptop-code',
            'PostgreSQL': 'fas fa-database',
            'MongoDB': 'fas fa-envira',
            'Git': 'fab fa-git-alt',
            'Docker': 'fab fa-docker',
            'AWS': 'fab fa-aws',
            'Figma': 'fab fa-figma',
            'Stripe': 'fab fa-cc-stripe',
            'Vue.js': 'fab fa-vuejs'
        };
        return map[tag] || 'fas fa-code';
    };

    let html = `
    <div class="swiper-container-wrapper position-relative">
        <div class="swiper projectsSwiper">
            <div class="swiper-wrapper">
    `;

    html += projectsData.map((project, index) => {
        const images = project.images || [];
        const img = images.length > 0 ? images[0] : 'placeholder.jpg';

        // Constructing internal carousel items
        const carouselId = `projectCarousel${index}`;
        const carouselItems = images.map((img, i) => `
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
                <img src="${img}" class="d-block w-100" alt="${project.title}" style="height: 250px; object-fit: cover;" loading="lazy">
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
                            <a href="${project.demoLink}" class="action-btn-floating" target="_blank"><i class="fas fa-external-link-alt"></i></a>
                            <a href="${project.repoLink}" class="action-btn-floating ms-2" target="_blank"><i class="fab fa-github"></i></a>
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

    // Initialize Swiper
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

    // --- 2. Populate Modal (Grid View) --- //
    if (allProjectsContainer) {
        allProjectsContainer.innerHTML = projectsData.map(project => {
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

// --- LOAD CERTIFICATES (Swiper Carousel) --- //
function loadCertificates() {
    const certificatesContainer = document.getElementById('certificates-container');
    const allCertificatesContainer = document.getElementById('all-certificates-container');

    if (!certificatesContainer) return;

    if (typeof certificatesData === 'undefined') {
        certificatesContainer.innerHTML = '<div class="text-center">No certificates found.</div>';
        return;
    }

    // --- 1. Populate Swiper ---
    let html = `
    <div class="swiper-container-wrapper position-relative">
        <div class="swiper certificatesSwiper">
            <div class="swiper-wrapper">
    `;

    html += certificatesData.map(cert => {
        const fileSource = cert.file || cert.image;
        const fileType = cert.type || 'image';
        return `
        <div class="swiper-slide">
            <div class="cert-card-pro" onclick="viewCertificate('${fileSource}', '${fileType}', '${cert.title}')">
                <div class="cert-bg-wrapper" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;">
                    <img src="${cert.image}" alt="${cert.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" loading="lazy">
                </div>
                <div class="cert-overlay">
                    <div class="cert-header">
                        <span class="badge bg-accent">${cert.date}</span>
                        <div class="cert-issuer text-uppercase small mt-1">${cert.issuer}</div>
                    </div>
                    <div class="cert-body mt-auto">
                        <h4 class="cert-title text-white mb-3">${cert.title}</h4>
                        <button class="btn btn-sm btn-light w-100 rounded-pill fw-bold">
                            <i class="fas fa-eye me-2"></i>Ver Certificado
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `}).join('');

    html += `
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <!-- Buttons Outside -->
        <div class="custom-swiper-button-next cert-next"></div>
        <div class="custom-swiper-button-prev cert-prev"></div>
    </div>

    <div class="text-center mt-5">
        <button type="button" class="btn btn-outline-custom rounded-pill px-5" data-bs-toggle="modal" data-bs-target="#allCertificatesModal">
            Mostrar Más Certificaciones <i class="fas fa-plus-circle ms-2"></i>
        </button>
    </div>
    `;

    certificatesContainer.innerHTML = html;

    // Initialize Swiper
    new Swiper(".certificatesSwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        loop: true,
        observer: true,
        observeParents: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".cert-next",
            prevEl: ".cert-prev",
        },
        breakpoints: {
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    });

    // --- 2. Populate Modal (Grid View) ---
    if (allCertificatesContainer) {
        allCertificatesContainer.innerHTML = certificatesData.map(cert => {
            const fileSource = cert.file || cert.image;
            const fileType = cert.type || 'image';
            return `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="cert-card-pro" style="height: 250px;" onclick="viewCertificate('${fileSource}', '${fileType}', '${cert.title}')">
                    <div class="cert-bg-wrapper" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;">
                        <img src="${cert.image}" alt="${cert.title}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
                    </div>
                    <div class="cert-overlay p-3">
                         <div class="cert-header">
                            <span class="badge bg-accent" style="font-size: 0.7rem;">${cert.date}</span>
                        </div>
                        <div class="cert-body mt-auto">
                            <h6 class="cert-title text-white mb-2" style="font-size: 1rem;">${cert.title}</h6>
                            <p class="small text-light mb-0">${cert.issuer}</p>
                        </div>
                    </div>
                </div>
            </div>
        `}).join('');
    }
}

// --- GLOBAL: View Certificate Function ---
window.viewCertificate = function (source, type, title) {
    const modalBody = document.getElementById('modalViewBody');
    const modalTitle = document.getElementById('viewModalTitle');

    if (modalTitle) modalTitle.textContent = title || 'Vista Previa';

    if (type === 'pdf') {
        modalBody.innerHTML = `
            <iframe src="${source}" class="w-100" style="height: 80vh; border: none;" allowfullscreen></iframe>
        `;
    } else {
        modalBody.innerHTML = `
            <img src="${source}" class="img-fluid rounded shadow-lg" style="max-height: 85vh; object-fit: contain;" alt="${title}">
        `;
    }

    const viewModal = new bootstrap.Modal(document.getElementById('imageModal'));
    viewModal.show();
}

// --- LOAD SKILLS ---
function loadSkills() {
    const techStackContainer = document.getElementById('techstack-container');
    if (!techStackContainer) return;

    if (typeof skillsData === 'undefined') {
        techStackContainer.innerHTML = '<div class="text-center">No skills found.</div>';
        return;
    }

    // Brand Colors Mapping
    const techColors = {
        'React': '#61DAFB',
        'Next.js': 'var(--text-primary)',
        'JavaScript': '#F7DF1E',
        'TypeScript': '#3178C6',
        'Tailwind CSS': '#38B2AC',
        'HTML5': '#E34F26',
        'CSS3': '#1572B6',
        'Node.js': '#339933',
        'Express': 'var(--text-primary)',
        'Python': '#3776AB',
        'Django': '#092E20',
        'PostgreSQL': '#336791',
        'MongoDB': '#47A248',
        'Git': '#F05032',
        'Docker': '#2496ED',
        'AWS': '#FF9900',
        'Figma': '#F24E1E'
    };

    const getStyle = (name) => {
        const color = techColors[name] || '#6366f1'; // Default to primary if not found
        return `style="--tech-color: ${color}; --tech-bg: ${color}1a; --tech-glow: ${color}80;"`;
    };

    let html = `<div class="fade-in">`;

    // Helper to render a category
    const renderCategory = (title, items) => {
        if (!items || items.length === 0) return '';
        return `
            <div class="tech-category mb-3">
                <h4 class="tech-category-title mb-4">${title}</h4>
                <div class="tech-grid-pro">
                    ${items.map(skill => `
                        <div class="tech-card-pro" ${getStyle(skill.name)}>
                            <div class="tech-icon-box">
                                <i class="${skill.icon}"></i>
                            </div>
                            <span class="tech-name">${skill.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    };

    // Render categories if skillsData is an object (new format)
    if (!Array.isArray(skillsData)) {
        html += renderCategory('Frontend', skillsData.frontend);
        html += renderCategory('Backend', skillsData.backend);
        html += renderCategory('Database', skillsData.database);
        html += renderCategory('Tools', skillsData.tools);
    } else {
        html += `<div class="d-flex flex-wrap gap-2 justify-content-center">`;
        html += skillsData.map(skill => `<span class="skill-item">${skill}</span>`).join('');
        html += `</div>`;
    }

    html += `</div>`;
    techStackContainer.innerHTML = html;
}

function loadExperience() {
    if (typeof experienceData === 'undefined') return;

    const timelineContainer = document.querySelector('#experience-timeline');
    if (timelineContainer) {

        // Render content for Timeline
        timelineContainer.innerHTML = experienceData.map((exp, index) => {
            const side = index % 2 === 0 ? 'left' : 'right';
            const aosDelay = index * 100;
            let leftContent = '';
            let rightContent = '';

            const contentCard = `
                <div class="timeline-content-card">
                    <h3 class="timeline-title">${exp.position}</h3>
                    <div class="timeline-company">
                        <i class="fas fa-building"></i> ${exp.company}
                    </div>
                    <p class="timeline-desc">${exp.description}</p>
                </div>
            `;

            const dateLabel = `
                <div class="timeline-date-label">
                    <span class="date-text">${exp.period}</span>
                </div>
            `;

            if (side === 'left') {
                leftContent = contentCard;
                rightContent = dateLabel;
            } else {
                leftContent = dateLabel;
                rightContent = contentCard;
            }

            return `
            <div class="timeline-row ${side}" data-aos="fade-up" data-aos-delay="${aosDelay}">
                <div class="timeline-col col-left">
                    ${leftContent}
                </div>
                <div class="timeline-col col-center">
                    <div class="timeline-dot-wrapper">
                        <div class="timeline-dot-pulse"></div>
                        <div class="timeline-dot-core"></div>
                    </div>
                </div>
                <div class="timeline-col col-right">
                    ${rightContent}
                </div>
            </div>
            `;
        }).join('');
    }
}

function loadEducation() {
    if (typeof educationData === 'undefined') return;
    const educationContainer = document.querySelector('#education-container');
    if (educationContainer) {
        educationContainer.innerHTML = educationData.map((edu, index) => `
            <div class="col-lg-6" data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="education-card-modern h-100">
                    <div class="edu-card-header d-flex align-items-start justify-content-between mb-3">
                         <div class="d-flex align-items-center gap-3">
                            <div class="edu-icon-box-modern">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                            <div>
                                <h4 class="edu-degree-modern mb-1">${edu.degree}</h4>
                                <h5 class="edu-institution-modern text-muted mb-0">${edu.institution}</h5>
                            </div>
                         </div>
                         <span class="badge bg-primary-soft text-primary rounded-pill px-3 py-2">${edu.period}</span>
                    </div>
                    <div class="edu-card-body">
                        <p class="edu-desc-modern mb-0">${edu.description}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function loadBlogPosts() {
    if (typeof blogPostsData === 'undefined') return;
    const blogContainer = document.querySelector('#blog-container');
    if (blogContainer) {
        blogContainer.innerHTML = blogPostsData.map((post, index) => `
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

function initTypewriter() {
    if (typeof profileData === 'undefined' || !profileData.roles || profileData.roles.length === 0) return;

    const heroRole = document.getElementById('hero-role');
    if (heroRole) {
        new Typewriter(heroRole, profileData.roles, 3000);
    }
}

// --- LOAD COMMENTS (MOCK) ---
function loadComments() {
    const commentsContainer = document.getElementById('comments-container');
    if (!commentsContainer) return;

    // Mock Data for display
    const mockComments = [
        { name: 'Maria Gonzalez', text: '¡Excelente portafolio! Me encanta el diseño limpio.', date: 'Hace 2 horas' },
    ];

    let html = '';
    mockComments.forEach(comment => {
        html += `
            <div class="comment-item">
                <div class="comment-header">
                    <span class="comment-author">${comment.name}</span>
                    <span class="comment-date">${comment.date}</span>
                </div>
                <div class="comment-body">
                    ${comment.text}
                </div>
            </div>
        `;
    });

    commentsContainer.innerHTML = html;
}

// --- HANDLE FORMS ---
function initForms() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Gracias por tu mensaje. Esta funcionalidad requiere configuración de EmailJS.');
            this.reset();
        });
    }

    // Comment Form
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('comment-name').value;
            const text = document.getElementById('comment-text').value;

            if (name && text) {
                const container = document.getElementById('comments-container');
                const newComment = `
                    <div class="comment-item" style="border-left: 3px solid var(--primary)">
                        <div class="comment-header">
                            <span class="comment-author">${name}</span>
                            <span class="comment-date">Ahora mismo</span>
                        </div>
                        <div class="comment-body">${text}</div>
                    </div>
                `;
                container.insertAdjacentHTML('afterbegin', newComment);
                this.reset();
            }
        });
    }
}

// --- FOOTER YEAR ---
function initFooterYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// --- GRID INTERACTION ---
function initGridInteraction() {
    const bg = document.querySelector('.animated-background');
    if (!bg) return;

    // Create Highlight Element (Only for Desktop)
    const isMobile = window.innerWidth < 768;
    let highlight = document.getElementById('grid-highlight');

    if (!isMobile && !highlight) {
        highlight = document.createElement('div');
        highlight.id = 'grid-highlight';
        bg.appendChild(highlight);
    }

    // Grid Settings
    const gridSize = 34;
    const speed = 1.0;

    // State
    let gridOffsetX = 0;
    let gridOffsetY = 0;
    let totalDrift = 0;
    let mouseX = -100;
    let mouseY = -100;

    const randomColors = [
        '#86FF00',
        '#d946ef',
        '#8b5cf6',
        '#FFD600'
    ];
    let activeRandomCells = [];

    // Helper: Spawn Random Cells
    function spawnRandomCells() {
        const maxCells = window.innerWidth < 768 ? 1 : 3;
        if (window.innerWidth < 768 && Math.random() > 0.5) return;

        const count = Math.floor(Math.random() * maxCells) + 1;

        // Spawn new ones
        const rect = bg.getBoundingClientRect();
        const cols = Math.ceil(window.innerWidth / gridSize);
        const rows = Math.ceil(window.innerHeight / gridSize);

        // Current Visual Offset (snapshot for alignment)
        const visualOffsetX = totalDrift % gridSize;
        const visualOffsetY = totalDrift % gridSize;

        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            const col = Math.floor(Math.random() * cols);
            const row = Math.floor(Math.random() * rows);
            const color = randomColors[Math.floor(Math.random() * randomColors.length)];
            const startX = (col * gridSize) + visualOffsetX;
            const startY = (row * gridSize) + visualOffsetY;

            el.className = 'grid-random-cell';
            el.style.backgroundColor = color;
            el.style.color = color;
            el.dataset.startX = startX;
            el.dataset.startY = startY;
            el.dataset.spawnDrift = totalDrift;
            el.dataset.spawnTime = Date.now();
            el.dataset.spawnScroll = window.scrollY;

            bg.appendChild(el);
            activeRandomCells.push(el);

            requestAnimationFrame(() => el.style.opacity = '0.15');
        }
    }

    // Spawn loop
    setInterval(spawnRandomCells, 4000);

    // Animation Loop
    function animate() {
        totalDrift += speed;

        const scrollOffset = window.scrollY * 0.5;

        const safeMod = (n, m) => ((n % m) + m) % m;

        gridOffsetX = safeMod(totalDrift, gridSize);
        gridOffsetY = safeMod(totalDrift - scrollOffset, gridSize);

        bg.style.setProperty('--grid-x', `${gridOffsetX}px`);
        bg.style.setProperty('--grid-y', `${gridOffsetY}px`);

        // Update Random Cells
        const now = Date.now();
        for (let i = activeRandomCells.length - 1; i >= 0; i--) {
            const cell = activeRandomCells[i];
            const spawnTime = parseInt(cell.dataset.spawnTime);

            // Lifecycle: 4 seconds total
            if (now - spawnTime > 4000) {
                cell.style.opacity = '0';
                if (now - spawnTime > 5000) {
                    cell.remove();
                    activeRandomCells.splice(i, 1);
                }
            }

            // Calculate Continuous Position
            const startX = parseFloat(cell.dataset.startX);
            const startY = parseFloat(cell.dataset.startY);
            const spawnDrift = parseFloat(cell.dataset.spawnDrift);
            const spawnScroll = parseFloat(cell.dataset.spawnScroll || 0);
            const driftDelta = totalDrift - spawnDrift;
            const scrollDelta = (window.scrollY - spawnScroll) * 0.5;
            const x = startX + driftDelta;
            const y = startY + driftDelta - scrollDelta;

            cell.style.left = `${x}px`;
            cell.style.top = `${y}px`;
        }

        // Calculate Highlight Position (Mouse) - Desktop Only
        if (!isMobile && highlight) {
            const rect = bg.getBoundingClientRect();
            const relX = (mouseX - rect.left) / 1.1;
            const relY = (mouseY - rect.top) / 1.1;
            const snapX = Math.floor((relX - gridOffsetX) / gridSize) * gridSize + gridOffsetX;
            const snapY = Math.floor((relY - gridOffsetY) / gridSize) * gridSize + gridOffsetY;

            highlight.style.left = `${snapX}px`;
            highlight.style.top = `${snapY}px`;
        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
}

// --- FLOATING SHAPES (PlayStation/Tech Style) --- //
function initFloatingShapes() {
    const container = document.createElement('div');
    container.className = 'floating-shapes-container';
    document.body.appendChild(container);

    const shapes = ['circle', 'square', 'triangle', 'cross'];
    const count = window.innerWidth < 768 ? 4 : 8;

    for (let i = 0; i < count; i++) {
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        el.setAttribute('viewBox', '0 0 24 24');
        el.classList.add('shape-item');

        let inner = '';
        if (shapeType === 'circle') {
            inner = '<circle cx="12" cy="12" r="9" stroke="currentColor" fill="none" />';
        } else if (shapeType === 'square') {
            inner = '<rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" fill="none" />'; // Rounded rect
        } else if (shapeType === 'triangle') {
            inner = '<polygon points="12,4 21,20 3,20" stroke="currentColor" fill="none" />';
        } else if (shapeType === 'cross') {
            inner = '<path d="M6 6 L18 18 M18 6 L6 18" stroke-linecap="round" stroke="currentColor" fill="none" />';
        }


        const size = Math.random() * 40 + 20;
        const randomSide = Math.random() > 0.5;
        const left = randomSide ? Math.random() * 15 : Math.random() * 15 + 85;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * -30;
        const isReverse = Math.random() > 0.5;
        const animName = isReverse ? 'floatDriftReverse' : 'floatDrift';

        el.innerHTML = inner;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.left = `${left}%`;
        el.style.animation = `${animName} ${duration}s linear infinite ${delay}s`;
        el.style.opacity = (Math.random() * 0.3 + 0.1).toString();

        container.appendChild(el);
    }
}
