export function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');
    const allProjectsContainer = document.getElementById('all-projects-container');
    const data = window.projectsData || (typeof projectsData !== 'undefined' ? projectsData : []);

    if (!projectsContainer) return;

    if (!data || data.length === 0) {
        projectsContainer.innerHTML = '<div class="text-center text-muted py-5">No hay proyectos disponibles.</div>';
        return;
    }

    const getTechIconClass = (tag) => {
        return window.getTechIconClass ? window.getTechIconClass(tag) : 'fas fa-code';
    };

    const escapeHtml = (str = '') => String(str).replace(/[&<>"']/g, (s) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]
    ));

    // Pick an accent color based on the primary tech tag
    const getProjectAccent = (tags = []) => {
        const t = (tags[0] || '').toLowerCase();
        if (t.includes('react'))                        return '#22d3ee';
        if (t.includes('vue'))                          return '#42b883';
        if (t.includes('angular'))                      return '#dd0031';
        if (t.includes('next'))                         return '#94a3b8';
        if (t.includes('node'))                         return '#84cc16';
        if (t.includes('python') || t.includes('django')) return '#3b82f6';
        if (t.includes('iot') || t.includes('raspberry')) return '#f97316';
        if (t.includes('typescript') || t.includes('openai')) return '#0ea5e9';
        if (t.includes('react native') || t.includes('mobile')) return '#a855f7';
        return '#22d3ee';
    };

    // Inner Bootstrap carousel for multi-image gallery
    const buildImageGallery = (images, carouselId, fallback) => {
        const safeImages = (images && images.length > 0) ? images : [fallback];

        if (safeImages.length === 1) {
            return `<img src="${safeImages[0]}" alt="Proyecto" loading="lazy">`;
        }

        const items = safeImages.map((img, i) => `
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
                <img src="${img}" class="d-block w-100" alt="Imagen ${i + 1}" loading="lazy">
            </div>
        `).join('');

        const indicators = safeImages.map((_, i) => `
            <button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${i}"
                    class="pcm-gallery-dot ${i === 0 ? 'active' : ''}"
                    aria-label="Imagen ${i + 1}"></button>
        `).join('');

        return `
            <div id="${carouselId}" class="carousel slide pcm-gallery" data-bs-ride="carousel" data-bs-interval="3500" data-bs-pause="hover">
                <div class="carousel-inner">${items}</div>
                <div class="pcm-gallery-indicators">${indicators}</div>
                <span class="pcm-gallery-counter"><span class="pcm-current">1</span>/${safeImages.length}</span>
                <button class="pcm-gallery-arrow pcm-gallery-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev" aria-label="Anterior">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="pcm-gallery-arrow pcm-gallery-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next" aria-label="Siguiente">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
    };

    // Brand color per tech — drives the chip color in the tech row below the image.
    // Falls back to the project's accent if a tech isn't recognized.
    const getTechBrandColor = (tag = '') => {
        const t = tag.toLowerCase();
        if (t.includes('react native'))                 return '#a855f7';
        if (t.includes('react'))                        return '#61dafb';
        if (t.includes('vue'))                          return '#42b883';
        if (t.includes('angular'))                      return '#dd0031';
        if (t.includes('next'))                         return '#ffffff';
        if (t.includes('node'))                         return '#84cc16';
        if (t.includes('python'))                       return '#3776ab';
        if (t.includes('django'))                       return '#0c4b33';
        if (t.includes('typescript'))                   return '#3178c6';
        if (t.includes('javascript'))                   return '#f7df1e';
        if (t.includes('mongodb') || t.includes('mongo')) return '#10b981';
        if (t.includes('postgres'))                     return '#336791';
        if (t.includes('mysql'))                        return '#4479a1';
        if (t.includes('docker'))                       return '#0db7ed';
        if (t.includes('kubernetes'))                   return '#326ce5';
        if (t.includes('aws'))                          return '#ff9900';
        if (t.includes('azure'))                        return '#0078d4';
        if (t.includes('firebase'))                     return '#f59e0b';
        if (t.includes('tailwind'))                     return '#06b6d4';
        if (t.includes('openai'))                       return '#10a37f';
        if (t.includes('stripe'))                       return '#635bff';
        if (t.includes('graphql'))                      return '#e10098';
        if (t.includes('redis'))                        return '#dc382d';
        if (t.includes('go') && tag.length <= 3)        return '#00add8';
        return '#22d3ee';
    };

    const buildProjectCard = (project, idx, ctx = 'main') => {
        const fallback = 'https://via.placeholder.com/800x500?text=Proyecto';
        const title = escapeHtml(project.title);
        const description = escapeHtml(project.description || '');
        const demo = project.demoLink || '#';
        const repo = project.repoLink || '#';
        const carouselId = `pcmCarousel_${ctx}_${idx}`;
        const accent = getProjectAccent(project.tags);
        const imageCount = (project.images || []).length;
        const primaryIcon = project.tags && project.tags[0] ? getTechIconClass(project.tags[0]) : 'fas fa-code';

        const hasDemo = demo && demo !== '#';
        const hasRepo = repo && repo !== '#';

        // Tech chips with brand color + brand icon — placed below the image
        const techChipsHTML = (project.tags || []).slice(0, 4).map(tag => `
            <span class="proj-tech-chip" style="--tech-color: ${getTechBrandColor(tag)};">
                <i class="${getTechIconClass(tag)}"></i>${escapeHtml(tag)}
            </span>
        `).join('');

        // Optional stats row — only renders if the project has any stats
        const stats = project.stats;
        const statsHTML = stats ? `
            <div class="proj-card-stats">
                ${stats.stars  != null ? `<div class="proj-stat"><i class="fas fa-star"></i><div><span class="proj-stat-value">${stats.stars}</span><span class="proj-stat-label">Stars</span></div></div>` : ''}
                ${stats.forks  != null ? `<div class="proj-stat"><i class="fas fa-code-fork"></i><div><span class="proj-stat-value">${stats.forks}</span><span class="proj-stat-label">Forks</span></div></div>` : ''}
                ${stats.issues != null ? `<div class="proj-stat"><i class="fas fa-circle-dot"></i><div><span class="proj-stat-value">${stats.issues}</span><span class="proj-stat-label">Issues</span></div></div>` : ''}
                ${stats.contributors != null ? `<div class="proj-stat"><i class="fas fa-users"></i><div><span class="proj-stat-value">${stats.contributors}</span><span class="proj-stat-label">Contribs</span></div></div>` : ''}
            </div>
        ` : '';

        return `
        <article class="proj-card" style="--accent-color: ${accent};">
            <!-- Center: large image area with gallery -->
            <div class="proj-card-image">
                ${buildImageGallery(project.images, carouselId, fallback)}
                <div class="proj-card-image-fallback"><i class="${primaryIcon}"></i></div>
                <div class="proj-card-image-glow"></div>
            </div>

            <!-- Body: title, tech, description, stats, buttons -->
            <div class="proj-card-body">
                <h3 class="proj-card-title">${title}</h3>
                ${techChipsHTML ? `<div class="proj-card-tech">${techChipsHTML}</div>` : ''}
                <p class="proj-card-desc">${description}</p>
                ${statsHTML}
                <div class="proj-card-actions">
                    <button type="button"
                            onclick="window.openProjectCaseStudy(${project.id})"
                            class="proj-btn proj-btn--primary">
                        <span>Ver Caso</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                    ${project.liveDemo
                        ? `<button type="button"
                                onclick="window.openProjectLiveDemo(${project.id})"
                                class="proj-btn proj-btn--ghost">
                            <span>Live Demo</span>
                            <i class="fas fa-external-link-alt"></i>
                        </button>`
                        : `<span class="proj-btn proj-btn--private" title="Repositorio privado — código disponible bajo solicitud">
                            <i class="fas fa-lock"></i>
                            <span>Privado</span>
                        </span>`
                    }
                </div>

            </div>
        </article>
        `;
    };

    // Auto-scrolling marquee. Duplicate cards twice (once visible + once for seamless loop)
    const buildSet = (suffix) => data.map((p, i) => buildProjectCard(p, i, suffix)).join('');
    // Adjust speed proportionally so density stays consistent (~10s per card)
    const duration = Math.max(40, data.length * 8);

    projectsContainer.innerHTML = `
        <div class="kit-marquee" aria-label="Proyectos">
            <div class="kit-marquee-track" style="--marquee-duration: ${duration}s;">
                ${buildSet('a')}
                ${buildSet('b')}
            </div>
        </div>
        <div class="section-cta-wrapper" style="margin-top: 2rem;">
            <button type="button" class="view-more-modern" data-bs-toggle="modal" data-bs-target="#allProjectsModal">
                Ver todos los proyectos (${data.length}) <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;

    // Sync gallery counters
    const wireCounters = (root) => {
        root.querySelectorAll('.pcm-gallery').forEach(gal => {
            gal.addEventListener('slid.bs.carousel', (e) => {
                const counter = gal.querySelector('.pcm-current');
                if (counter) counter.textContent = e.to + 1;
            });
        });
    };
    wireCounters(projectsContainer);

    // Modal grid — all projects
    if (allProjectsContainer) {
        allProjectsContainer.innerHTML = `
            <div class="kit-grid">
                ${data.map((p, i) => buildProjectCard(p, i, 'modal')).join('')}
            </div>
        `;
        wireCounters(allProjectsContainer);
    }

    // === Case Study Page — shown inline, hides the rest of the site ===
    // We keep the navbar visible (user request). All other <section> elements
    // are hidden when the case study is open, and restored on "Back".

    const buildCaseStudyHTML = (project) => {
        const accent = getProjectAccent(project.tags);
        const primaryIcon = project.tags && project.tags[0] ? getTechIconClass(project.tags[0]) : 'fas fa-code';
        const cs = project.caseStudy || {};
        const hasDemo = project.demoLink && project.demoLink !== '#';

        const imagesList = project.images || [];
        const firstImage = imagesList[0] || 'https://via.placeholder.com/800x500?text=Proyecto';
        
        let galleryHTML = '';
        if (imagesList.length > 0) {
            const thumbnails = imagesList.map((img, i) => `
                <div class="cs-thumb ${i === 0 ? 'is-active' : ''}" 
                     data-index="${i}" 
                     onclick="window.setCsActiveImage(this, ${i}, '${escapeHtml(img)}')">
                    <img src="${img}" alt="Miniatura ${i + 1}" loading="lazy">
                </div>
            `).join('');

            galleryHTML = `
                <div class="cs-gallery-container" id="cs-gallery-${project.id}">
                    <div class="cs-gallery-main-wrapper">
                        <img id="cs-gallery-main-img" src="${firstImage}" alt="${escapeHtml(project.title)}" loading="lazy">
                        <div class="cs-gallery-overlay">
                            <span class="cs-gallery-counter"><span id="cs-gallery-counter-curr">1</span>/${imagesList.length}</span>
                        </div>
                        ${imagesList.length > 1 ? `
                            <button class="cs-gallery-arrow cs-gallery-prev" onclick="window.navCsImage(-1, ${project.id})" aria-label="Anterior">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <button class="cs-gallery-arrow cs-gallery-next" onclick="window.navCsImage(1, ${project.id})" aria-label="Siguiente">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        ` : ''}
                        <div class="proj-detail-hero-glow"></div>
                    </div>
                    ${imagesList.length > 1 ? `
                        <div class="cs-gallery-thumbnails">
                            ${thumbnails}
                        </div>
                    ` : ''}
                </div>
            `;
        } else {
            galleryHTML = `
                <div class="proj-detail-hero-image">
                    <img src="https://via.placeholder.com/800x500?text=Proyecto" alt="${escapeHtml(project.title)}" loading="lazy">
                    <div class="proj-detail-hero-glow"></div>
                </div>
            `;
        }

        // Tech stack items directly for Hero
        const techStackItems = (project.tags || []).map(tag => `
            <div class="proj-detail-tech-item" title="${escapeHtml(tag)}">
                <i class="${getTechIconClass(tag)}" style="color: ${getTechBrandColor(tag)};"></i>
                <span>${escapeHtml(tag)}</span>
            </div>
        `).join('');

        const techStackSectionInHero = techStackItems ? `
            <div class="proj-detail-hero-tech">
                <div class="proj-detail-tech-row">${techStackItems}</div>
            </div>
        ` : '';

        const headerHTML = `
            <div class="proj-detail-hero">
                <div class="proj-detail-hero-text">
                    <h1 class="proj-detail-title">${escapeHtml(project.title)}</h1>
                    ${project.tagline ? `<p class="proj-detail-tagline">${escapeHtml(project.tagline)}</p>` : ''}
                    <p class="proj-detail-desc">${escapeHtml(cs.fullDescription || project.description || '')}</p>
                    ${techStackSectionInHero}
                </div>
                <div class="proj-detail-hero-gallery">
                    ${galleryHTML}
                </div>
            </div>
        `;

        // 3-column section: challenge | solution+architecture | results
        const challengeBullets = (cs.challenge?.bullets || []).map(b =>
            `<li><i class="fas fa-circle"></i><span>${escapeHtml(b)}</span></li>`
        ).join('');

        const challengeCol = cs.challenge ? `
            <div class="proj-detail-col">
                <div class="proj-detail-col-num">01</div>
                <h3 class="proj-detail-col-title"><i class="fas fa-bullseye"></i>El Reto</h3>
                ${cs.challenge.description ? `<p class="proj-detail-col-desc">${escapeHtml(cs.challenge.description)}</p>` : ''}
                ${challengeBullets ? `<ul class="proj-detail-bullets">${challengeBullets}</ul>` : ''}
            </div>
        ` : '';

        // Architecture column nodes (compact horizontal layout with colorful icons)
        const archItemsCompact = (cs.architecture || []).map((node, index, arr) => {
            const colors = ['#38bdf8', '#c084fc', '#34d399', '#fb923c', '#f472b6', '#fcd34d', '#60a5fa'];
            const nodeColor = colors[index % colors.length];
            return `
                <div class="cs-arch-node-compact" style="--node-color: ${nodeColor}; --node-index: ${index};">
                    <div class="cs-arch-icon-compact">
                        <i class="${node.icon || 'fas fa-cube'}"></i>
                    </div>
                    <div class="cs-arch-info-compact">
                        <span class="cs-arch-name-compact">${escapeHtml(node.name)}</span>
                        ${node.description ? `<span class="cs-arch-desc-compact">${escapeHtml(node.description)}</span>` : ''}
                    </div>
                </div>
                ${index < arr.length - 1 ? `
                    <div class="cs-arch-connector-compact">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                ` : ''}
            `;
        }).join('');

        const solutionAndArchCol = `
            <div class="proj-detail-col">
                <div class="proj-detail-col-num">02</div>
                <h3 class="proj-detail-col-title"><i class="fas fa-puzzle-piece"></i>La Solución</h3>
                ${cs.solution?.description ? `<p class="proj-detail-col-desc">${escapeHtml(cs.solution.description)}</p>` : ''}
                ${archItemsCompact ? `
                    <h4 class="cs-arch-sub-title"><i class="fas fa-sitemap"></i>Arquitectura</h4>
                    <div class="cs-arch-flow-compact">${archItemsCompact}</div>
                ` : ''}
            </div>
        `;

        const resultsHTML = (cs.results || []).map(r => `
            <div class="proj-detail-result">
                <i class="${r.icon || 'fas fa-check'}"></i>
                <div class="proj-detail-result-text">
                    <span class="proj-detail-result-value">${escapeHtml(r.value)}</span>
                    <div class="proj-detail-result-labels">
                        <span class="proj-detail-result-label">${escapeHtml(r.label)}</span>
                        ${r.sublabel ? `<span class="proj-detail-result-sublabel">${escapeHtml(r.sublabel)}</span>` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        const resultsCol = (cs.results && cs.results.length > 0) ? `
            <div class="proj-detail-col">
                <div class="proj-detail-col-num">03</div>
                <h3 class="proj-detail-col-title"><i class="fas fa-chart-line"></i>Resultados</h3>
                <div class="proj-detail-results">${resultsHTML}</div>
            </div>
        ` : '';

        const threeColSection = (challengeCol || solutionAndArchCol || resultsCol) ? `
            <div class="proj-detail-three-col">
                ${challengeCol}
                ${solutionAndArchCol}
                ${resultsCol}
            </div>
        ` : '';

        // Footer actions — show back button, and optionally live demo button if available
        const hasLiveDemo = !!project.liveDemo;
        const footerActions = `
            <div class="proj-detail-footer">
                <button type="button" onclick="window.backToProjects()" class="proj-btn proj-btn--ghost">
                    <i class="fas fa-arrow-left"></i>
                    <span>Volver a Proyectos</span>
                </button>
                ${hasLiveDemo ? `
                    <button type="button" onclick="window.openProjectLiveDemo(${project.id})" class="proj-btn proj-btn--primary">
                        <span>Abrir Live Demo</span>
                        <i class="fas fa-arrow-up-right-from-square"></i>
                    </button>
                ` : ''}
            </div>
        `;

        return `
            <div class="proj-detail-page" style="--accent-color: ${accent};">
                ${headerHTML}
                ${threeColSection}
                ${footerActions}
            </div>
        `;
    };

    // ===== Navigation state =====
    // hiddenSections: sections/footer hidden when detail view is open. Only
    //   populated ONCE on entry — preserved across case-study ↔ live-demo
    //   toggles so "Volver a Proyectos" can restore everything.
    // returnTarget: where to send the user when they click "Volver". If they
    //   came from a Bootstrap modal (`#allProjectsModal`), we reopen it.
    let hiddenSections = [];
    let returnTarget = null;

    // Hash routing — keeps the user on the same view on refresh / browser-back.
    //   No hash → main portfolio
    //   #caso-N → case study for project N
    //   #demo-N → live demo for project N
    const getRouteFromHash = () => {
        const m = (window.location.hash || '').slice(1).match(/^(caso|demo)-(\d+)$/);
        return m ? { type: m[1], id: parseInt(m[2], 10) } : null;
    };

    const setHash = (newHash) => {
        const current = window.location.hash.slice(1);
        if (current === newHash) return;
        const url = newHash
            ? `${window.location.pathname}${window.location.search}#${newHash}`
            : `${window.location.pathname}${window.location.search}`;
        history.pushState(null, '', url);
    };

    // Hide every <section> + footer EXCEPT the detail section. Only runs the
    // first time we enter detail view (so toggling case-study ↔ live-demo
    // doesn't clear the list we use to restore later).
    const enterDetailView = () => {
        if (hiddenSections.length > 0) return; // already in detail mode
        document.querySelectorAll('section').forEach(sec => {
            if (sec.id !== 'project-detail-section' && !sec.hidden) {
                sec.hidden = true;
                hiddenSections.push(sec);
            }
        });
        const footer = document.querySelector('footer');
        if (footer && footer.style.display !== 'none') {
            footer.style.display = 'none';
            hiddenSections.push(footer);
        }
    };

    // Dismiss any open Bootstrap modal (the list modal "Todos los Proyectos")
    // and remember it so we can reopen on return.
    const dismissOpenModal = () => {
        const openModalEl = document.querySelector('.modal.show');
        if (!openModalEl || typeof bootstrap === 'undefined') return null;
        const inst = bootstrap.Modal.getInstance(openModalEl);
        if (inst) inst.hide();
        return openModalEl.id;
    };

    // Expose Global Helper Functions for Case Study Gallery & Copy Buttons
    window.setCsActiveImage = function(thumbEl, index, imgSrc) {
        if (!thumbEl) return;
        const container = thumbEl.closest('.cs-gallery-container');
        if (!container) return;

        const mainImg = container.querySelector('#cs-gallery-main-img');
        if (mainImg) {
            mainImg.style.opacity = '0.3';
            setTimeout(() => {
                mainImg.src = imgSrc;
                mainImg.style.opacity = '1';
            }, 150);
        }

        container.querySelectorAll('.cs-thumb').forEach(t => t.classList.remove('is-active'));
        thumbEl.classList.add('is-active');

        const counterCurr = container.querySelector('#cs-gallery-counter-curr');
        if (counterCurr) {
            counterCurr.textContent = index + 1;
        }
    };

    window.navCsImage = function(direction, projectId) {
        const container = document.getElementById(`cs-gallery-${projectId}`);
        if (!container) return;

        const thumbs = Array.from(container.querySelectorAll('.cs-thumb'));
        if (thumbs.length <= 1) return;

        const activeIndex = thumbs.findIndex(t => t.classList.contains('is-active'));
        let nextIndex = activeIndex + direction;

        if (nextIndex < 0) nextIndex = thumbs.length - 1;
        if (nextIndex >= thumbs.length) nextIndex = 0;

        const nextThumb = thumbs[nextIndex];
        if (nextThumb) {
            nextThumb.click();
        }
    };

    window.copyCsCodeSnippet = function(button) {
        if (!button) return;
        const container = button.closest('.cs-code-editor');
        if (!container) return;
        const textarea = container.querySelector('.cs-code-raw-val');
        if (!textarea) return;

        navigator.clipboard.writeText(textarea.value).then(() => {
            const icon = button.querySelector('i');
            const span = button.querySelector('span');
            if (icon && span) {
                icon.className = 'fas fa-check';
                icon.style.color = '#22c55e';
                span.textContent = '¡Copiado!';
                button.classList.add('is-copied');

                setTimeout(() => {
                    icon.className = 'far fa-copy';
                    icon.style.color = '';
                    span.textContent = 'Copiar';
                    button.classList.remove('is-copied');
                }, 2000);
            }
        }).catch(err => {
            console.error('Error al copiar el código:', err);
        });
    };

    window.openProjectCaseStudy = function (projectId) {
        const project = data.find(p => String(p.id) === String(projectId));
        if (!project) return;

        const detailSection = document.getElementById('project-detail-section');
        const detailContent = document.getElementById('project-detail-content');
        if (!detailSection || !detailContent) return;

        // Remember origin only on first entry (not on internal case ↔ demo toggle)
        if (hiddenSections.length === 0) {
            const fromModalId = dismissOpenModal();
            returnTarget = fromModalId
                ? { type: 'modal', id: fromModalId }
                : { type: 'section', id: 'projects' };
        }

        detailContent.innerHTML = buildCaseStudyHTML(project);
        enterDetailView();
        detailSection.hidden = false;

        setHash(`caso-${projectId}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.openProjectLiveDemo = function (projectId) {
        const project = data.find(p => String(p.id) === String(projectId));
        if (!project) return;
        if (!project.liveDemo) {
            alert('Demo no disponible para este proyecto aún.');
            return;
        }

        const detailSection = document.getElementById('project-detail-section');
        const detailContent = document.getElementById('project-detail-content');
        if (!detailSection || !detailContent) return;

        if (hiddenSections.length === 0) {
            const fromModalId = dismissOpenModal();
            returnTarget = fromModalId
                ? { type: 'modal', id: fromModalId }
                : { type: 'section', id: 'projects' };
        }

        detailContent.innerHTML = buildLiveDemoHTML(project);
        enterDetailView();
        detailSection.hidden = false;

        setHash(`demo-${projectId}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.backToProjects = function () {
        const detailSection = document.getElementById('project-detail-section');
        if (!detailSection) return;

        // Hide detail
        detailSection.hidden = true;

        // Restore everything we hid
        hiddenSections.forEach(sec => {
            if (sec.tagName === 'FOOTER') {
                sec.style.display = '';
            } else {
                sec.hidden = false;
            }
        });
        hiddenSections = [];

        // Clear hash
        setHash('');

        // Send user back where they came from
        if (returnTarget?.type === 'modal') {
            const modalEl = document.getElementById(returnTarget.id);
            if (modalEl && typeof bootstrap !== 'undefined') {
                bootstrap.Modal.getOrCreateInstance(modalEl).show();
            }
        } else {
            const targetId = returnTarget?.id || 'projects';
            const targetSec = document.getElementById(targetId);
            if (targetSec) {
                setTimeout(() => targetSec.scrollIntoView({ behavior: 'smooth' }), 50);
            }
        }
        returnTarget = null;
    };

    // Restore the right view based on the URL hash. Called on initial load
    // (so refresh keeps the user on the case study they were viewing) and on
    // browser back/forward (popstate).
    const applyRouteFromHash = () => {
        const route = getRouteFromHash();
        if (!route) {
            // No hash → main portfolio. If we're currently in detail, go back.
            const detailSection = document.getElementById('project-detail-section');
            if (detailSection && !detailSection.hidden) {
                window.backToProjects();
            }
            return;
        }
        if (route.type === 'caso') window.openProjectCaseStudy(route.id);
        else if (route.type === 'demo') window.openProjectLiveDemo(route.id);
    };

    // Initial route — if user refreshed on a #caso-N or #demo-N URL, restore it
    applyRouteFromHash();

    // Browser back/forward
    window.addEventListener('popstate', applyRouteFromHash);

    // ===== Live Demo page — interactive mockup (style of reference image 3) =====
    const buildLiveDemoHTML = (project) => {
        const accent = getProjectAccent(project.tags);
        const primaryIcon = project.tags && project.tags[0] ? getTechIconClass(project.tags[0]) : 'fas fa-code';
        const demo = project.liveDemo || {};
        const url = demo.url || 'demo.example.com';
        const menu = demo.menu || ['Inicio', 'Servicios', 'Configuración'];
        const stats = demo.stats || [];

        const menuItemsHTML = menu.map((item, i) => `
            <button type="button" class="demo-menu-item ${i === 0 ? 'is-active' : ''}"
                onclick="this.parentNode.querySelectorAll('.demo-menu-item').forEach(b=>b.classList.remove('is-active'));this.classList.add('is-active');">
                <i class="fas fa-${['gauge', 'layer-group', 'server', 'chart-line', 'bell', 'cog'][i % 6]}"></i>
                <span>${escapeHtml(item)}</span>
            </button>
        `).join('');

        const statCardsHTML = stats.map(s => `
            <div class="demo-stat-card">
                <div class="demo-stat-icon"><i class="${s.icon || 'fas fa-circle'}"></i></div>
                <div class="demo-stat-body">
                    <span class="demo-stat-label">${escapeHtml(s.label)}</span>
                    <span class="demo-stat-value">${escapeHtml(s.value)}</span>
                    <span class="demo-stat-trend">${escapeHtml(s.trend || '')}</span>
                </div>
            </div>
        `).join('');

        // Mock service status rows
        const statusRows = [
            { name: 'api-gateway', status: 'Healthy', latency: '127ms' },
            { name: 'user-service', status: 'Healthy', latency: '98ms' },
            { name: 'order-service', status: 'Healthy', latency: '156ms' },
            { name: 'payment-service', status: 'Degraded', latency: '312ms' },
            { name: 'inventory-service', status: 'Healthy', latency: '87ms' }
        ];
        const statusHTML = statusRows.map(r => `
            <div class="demo-status-row">
                <span class="demo-status-dot demo-status-dot--${r.status === 'Healthy' ? 'ok' : 'warn'}"></span>
                <span class="demo-status-name">${escapeHtml(r.name)}</span>
                <span class="demo-status-label demo-status-label--${r.status === 'Healthy' ? 'ok' : 'warn'}">${escapeHtml(r.status)}</span>
                <span class="demo-status-latency">${escapeHtml(r.latency)}</span>
            </div>
        `).join('');

        // Mock log entries
        const logEntries = [
            { time: '15:42:30', level: 'INFO',  source: 'api-gateway',       msg: 'Petición procesada: GET /api/users · 200 OK' },
            { time: '15:42:29', level: 'INFO',  source: 'user-service',      msg: 'Usuario encontrado: ID 12345' },
            { time: '15:42:29', level: 'WARN',  source: 'payment-service',   msg: 'Latencia alta detectada: 312ms' },
            { time: '15:42:28', level: 'INFO',  source: 'order-service',     msg: 'Orden creada: ORD-2026-0523-001' },
            { time: '15:42:28', level: 'INFO',  source: 'inventory-service', msg: 'Stock verificado: 15 unidades disponibles' }
        ];
        const logsHTML = logEntries.map(l => `
            <div class="demo-log-row">
                <span class="demo-log-time">${escapeHtml(l.time)}</span>
                <span class="demo-log-level demo-log-level--${l.level.toLowerCase()}">${escapeHtml(l.level)}</span>
                <span class="demo-log-source">[${escapeHtml(l.source)}]</span>
                <span class="demo-log-msg">${escapeHtml(l.msg)}</span>
            </div>
        `).join('');

        return `
            <div class="proj-detail-page proj-demo-page" style="--accent-color: ${accent};">
                <!-- Status banner -->
                <div class="demo-status-banner">
                    <span class="demo-status-active"><span class="demo-status-active-dot"></span>Live Demo Activa</span>
                    <p>Explora la plataforma en tiempo real. Interactúa con los controles para ver cómo <strong>${escapeHtml(project.title)}</strong> gestiona el sistema en producción.</p>
                </div>

                <div class="demo-shell">
                    <!-- Browser chrome -->
                    <div class="demo-browser-frame">
                        <div class="demo-browser-bar">
                            <span class="demo-browser-dot demo-browser-dot--r"></span>
                            <span class="demo-browser-dot demo-browser-dot--y"></span>
                            <span class="demo-browser-dot demo-browser-dot--g"></span>
                            <div class="demo-browser-url">
                                <i class="fas fa-lock"></i>
                                <span>https://${escapeHtml(url)}/dashboard</span>
                            </div>
                            <div class="demo-browser-controls">
                                <i class="fas fa-download"></i>
                                <i class="fas fa-plus"></i>
                                <i class="fas fa-bars"></i>
                            </div>
                        </div>

                        <div class="demo-browser-body">
                            <!-- Sidebar -->
                            <aside class="demo-sidebar">
                                <div class="demo-sidebar-brand">
                                    <div class="demo-sidebar-logo"><i class="${primaryIcon}"></i></div>
                                    <div class="demo-sidebar-brand-text">
                                        <span>${escapeHtml(project.title)}</span>
                                        <small>${escapeHtml(project.tagline || 'Live Demo')}</small>
                                    </div>
                                </div>
                                <nav class="demo-menu">${menuItemsHTML}</nav>
                                <div class="demo-sidebar-status">
                                    <span class="demo-sidebar-status-dot"></span>
                                    <div>
                                        <strong>Sistema Saludable</strong>
                                        <small>Todos los servicios operativos</small>
                                    </div>
                                </div>
                            </aside>

                            <!-- Main content -->
                            <main class="demo-main">
                                <div class="demo-main-header">
                                    <div>
                                        <h2>Resumen del Sistema</h2>
                                        <p>Vista general del estado de la plataforma y servicios</p>
                                    </div>
                                    <div class="demo-main-controls">
                                        <label class="demo-toggle">
                                            <span>Auto-refresh</span>
                                            <input type="checkbox" checked>
                                            <span class="demo-toggle-slider"></span>
                                        </label>
                                        <button type="button" class="demo-range-btn">Últimos 5 minutos <i class="fas fa-chevron-down"></i></button>
                                    </div>
                                </div>

                                ${statCardsHTML ? `<div class="demo-stat-grid">${statCardsHTML}</div>` : ''}

                                <div class="demo-section">
                                    <div class="demo-section-head">
                                        <h3>Tráfico de Peticiones</h3>
                                        <span class="demo-section-legend">
                                            <span><i class="fas fa-circle" style="color:#22c55e"></i>Exitosas</span>
                                            <span><i class="fas fa-circle" style="color:#ef4444"></i>Errores</span>
                                            <span><i class="fas fa-circle" style="color:#22d3ee"></i>Total</span>
                                        </span>
                                    </div>
                                    <div class="demo-chart">
                                        <svg viewBox="0 0 600 160" preserveAspectRatio="none">
                                            <path d="M 0 130 L 60 105 L 120 115 L 180 80 L 240 95 L 300 60 L 360 75 L 420 50 L 480 65 L 540 40 L 600 55" fill="none" stroke="#22d3ee" stroke-width="2"/>
                                            <path d="M 0 145 L 60 140 L 120 142 L 180 138 L 240 144 L 300 135 L 360 140 L 420 130 L 480 135 L 540 128 L 600 132" fill="none" stroke="#ef4444" stroke-width="1.5"/>
                                            <path d="M 0 120 L 60 95 L 120 105 L 180 70 L 240 85 L 300 50 L 360 65 L 420 40 L 480 55 L 540 30 L 600 45" fill="none" stroke="#22c55e" stroke-width="2"/>
                                        </svg>
                                    </div>
                                </div>

                                <div class="demo-two-col">
                                    <div class="demo-section">
                                        <div class="demo-section-head">
                                            <h3>Estado de Servicios</h3>
                                            <button class="demo-link-btn">Ver todos</button>
                                        </div>
                                        <div class="demo-status-list">${statusHTML}</div>
                                    </div>
                                    <div class="demo-section">
                                        <div class="demo-section-head">
                                            <h3>Logs en Vivo</h3>
                                            <button class="demo-link-btn">Ver todos los logs</button>
                                        </div>
                                        <div class="demo-logs">${logsHTML}</div>
                                    </div>
                                </div>
                            </main>

                            <!-- Right control panel -->
                            <aside class="demo-control-panel">
                                <h3 class="demo-control-title">Panel de Control</h3>
                                <p class="demo-control-desc">Interactúa con la demo en tiempo real</p>

                                <div class="demo-control-card">
                                    <h4><i class="fas fa-bolt"></i>Escalabilidad</h4>
                                    <p>Simula aumento de carga y auto-escalado.</p>
                                    <button class="demo-control-btn demo-control-btn--cyan"
                                        onclick="alert('🚀 Auto-escalado activado: agregando 3 instancias adicionales...')">
                                        <i class="fas fa-rocket"></i>Activar Auto-escalado
                                    </button>
                                </div>

                                <div class="demo-control-card">
                                    <h4><i class="fas fa-chart-line"></i>Generar Tráfico</h4>
                                    <p>Genera tráfico de prueba en la plataforma.</p>
                                    <button class="demo-control-btn demo-control-btn--cyan"
                                        onclick="alert('📈 Generando 1,000 peticiones/seg por 60 segundos...')">
                                        <i class="fas fa-chart-line"></i>Generar Carga de Prueba
                                    </button>
                                </div>

                                <div class="demo-control-card">
                                    <h4><i class="fas fa-list"></i>Ver Logs Detallados</h4>
                                    <p>Explora los logs del sistema en tiempo real.</p>
                                    <button class="demo-control-btn demo-control-btn--cyan"
                                        onclick="alert('📋 Conectando al stream de logs en vivo...')">
                                        <i class="fas fa-stream"></i>Ver Logs en Vivo
                                    </button>
                                </div>

                                <div class="demo-control-card">
                                    <h4><i class="fas fa-triangle-exclamation"></i>Simular Error</h4>
                                    <p>Simula un error para ver alertas en acción.</p>
                                    <button class="demo-control-btn demo-control-btn--warn"
                                        onclick="alert('⚠️ Error 500 simulado: alerta enviada al equipo de guardia')">
                                        <i class="fas fa-triangle-exclamation"></i>Simular Error 500
                                    </button>
                                </div>

                                <div class="demo-control-card">
                                    <h4><i class="fas fa-rotate-right"></i>Reset Demo</h4>
                                    <p>Reinicia el entorno de la demo.</p>
                                    <button class="demo-control-btn demo-control-btn--red"
                                        onclick="alert('🔄 Reiniciando demo... vuelve en 5 segundos')">
                                        <i class="fas fa-rotate-right"></i>Resetear Demo
                                    </button>
                                </div>

                                <div class="demo-control-info">
                                    <h5>Información de la Demo</h5>
                                    <div><span>Duración de sesión:</span><strong>02:45</strong></div>
                                    <div><span>Acciones realizadas:</span><strong>7</strong></div>
                                    <div><span>Estado:</span><strong style="color:#22c55e">● Activo</strong></div>
                                    <p>Los cambios se reinician automáticamente después de 10 minutos de inactividad.</p>
                                </div>
                            </aside>
                        </div>

                        <div class="demo-browser-footer">
                            <span class="demo-footer-item"><span class="demo-status-dot demo-status-dot--ok"></span>Conectado</span>
                            <span class="demo-footer-item">Región: us-east-1</span>
                            <span class="demo-footer-item">Versión: 2.1.0</span>
                            <span class="demo-footer-item">Uptime: 99.95%</span>
                        </div>
                    </div>
                </div>

                <div class="proj-detail-footer">
                    <button type="button" onclick="window.backToProjects()" class="proj-btn proj-btn--ghost">
                        <i class="fas fa-arrow-left"></i>
                        <span>Volver a Proyectos</span>
                    </button>
                    <button type="button" onclick="window.openProjectCaseStudy(${project.id})" class="proj-btn proj-btn--primary">
                        <span>Ver Caso de Estudio</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    };

    window.openProjectLiveDemo = function (projectId) {
        const project = data.find(p => String(p.id) === String(projectId));
        if (!project) return;
        if (!project.liveDemo) {
            alert('Demo no disponible para este proyecto aún.');
            return;
        }

        const detailSection = document.getElementById('project-detail-section');
        const detailContent = document.getElementById('project-detail-content');
        if (!detailSection || !detailContent) return;

        detailContent.innerHTML = buildLiveDemoHTML(project);

        // Hide everything else
        hiddenSections = [];
        document.querySelectorAll('section').forEach(sec => {
            if (sec.id !== 'project-detail-section' && !sec.hasAttribute('hidden')) {
                sec.hidden = true;
                hiddenSections.push(sec);
            }
        });
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.display = 'none';
            hiddenSections.push(footer);
        }

        detailSection.hidden = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
}
