export function loadEducation() {
    const data = window.educationData || (typeof educationData !== 'undefined' ? educationData : []);
    if (!data || data.length === 0) return;

    const educationContainer = document.querySelector('#education-container');
    if (!educationContainer) return;

    const escapeHtml = (str = '') => String(str).replace(/[&<>"']/g, (s) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]
    ));

    // Pick type, icon and accent color based on degree name
    const pickType = (degree = '') => {
        const d = degree.toLowerCase();
        if (d.includes('doctor') || d.includes('phd'))
            return { icon: 'fa-user-tie',       label: 'Doctorado',     color: '#a855f7' };
        if (d.includes('master') || d.includes('máster') || d.includes('maestr'))
            return { icon: 'fa-user-graduate',  label: 'Maestría',      color: '#8b5cf6' };
        if (d.includes('bachiller') || d.includes('bachelor') || d.includes('ingenier') || d.includes('licenc'))
            return { icon: 'fa-graduation-cap', label: 'Grado',         color: '#22d3ee' };
        if (d.includes('bootcamp'))
            return { icon: 'fa-laptop-code',    label: 'Bootcamp',      color: '#f97316' };
        if (d.includes('idioma') || d.includes('inglés') || d.includes('curso'))
            return { icon: 'fa-book-open',      label: 'Curso',         color: '#10b981' };
        if (d.includes('certif'))
            return { icon: 'fa-certificate',    label: 'Certificación', color: '#f59e0b' };
        return     { icon: 'fa-graduation-cap', label: 'Educación',     color: '#22d3ee' };
    };

    const extractYears = (period = '') => {
        const yearRe = /(19|20)\d{2}/g;
        const matches = period.match(yearRe) || [];
        if (matches.length >= 2) return `${matches[0]} – ${matches[matches.length - 1]}`;
        if (matches.length === 1) return matches[0];
        return period;
    };

    const buildEducationCard = (edu, { preview = false } = {}) => {
        const type = pickType(edu.degree);
        const period = extractYears(edu.period);
        const safeDegree = escapeHtml(edu.degree);
        const safeInstitution = escapeHtml(edu.institution);
        const safeDescription = escapeHtml(edu.description || '');
        const safeImg = escapeHtml(edu.image || '');
        const hasImg = !!edu.image && edu.image.trim() !== '';

        const clickAttr = preview ? '' : `role="button" tabindex="0" onclick="openEduPreview('${edu.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openEduPreview('${edu.id}')}"`;
        const classes = [
            preview ? 'kit-card kit-card--preview' : 'kit-card kit-card--clickable',
            hasImg ? 'kit-card--edu-doc' : ''
        ].filter(Boolean).join(' ');

        return `
        <article class="${classes}" style="--accent-color: ${type.color};" ${clickAttr}>
            <div class="kit-card-media${hasImg ? '' : ' kit-card-media--decorative'}">
                ${hasImg ? `<img src="${safeImg}" alt="${safeDegree}" loading="lazy" onerror="this.style.display='none'; this.parentElement.classList.add('no-image');">` : ''}
                <div class="kit-card-media-fallback"><i class="fas ${type.icon}"></i></div>
                <div class="kit-card-media-overlay"></div>
                <div class="kit-card-top-row">
                    <span class="kit-chip"><i class="fas ${type.icon}"></i>${type.label.toUpperCase()}</span>
                    <span class="kit-chip kit-chip--neutral"><i class="far fa-calendar"></i>${escapeHtml(period)}</span>
                </div>
            </div>
            <div class="kit-card-body">
                <div class="kit-card-meta-row">
                    <span class="kit-card-meta-issuer">${safeInstitution}</span>
                </div>
                <h3 class="kit-card-title">${safeDegree}</h3>
                ${safeDescription ? `<p class="kit-card-desc">${safeDescription}</p>` : ''}
            </div>
        </article>
        `;
    };


    // Split "Junio 2020 - Julio 2025" → { start: "Junio 2020", end: "Julio 2025" }
    // Falls back to a single value if no separator is found.
    const splitPeriod = (period = '') => {
        const parts = period.split(/\s*[-–—]\s*/);
        return {
            start: (parts[0] || '').trim(),
            end: (parts[1] || '').trim()
        };
    };

    // Check if the period is "ongoing" (presente / current / actualidad)
    const isOngoing = (period = '') => {
        const p = period.toLowerCase();
        return p.includes('presente') || p.includes('actualidad') || p.includes('current');
    };

    // === Education preview: rich 2-column "education details" modal layout ===
    // Same visual language as the certificate preview — reuses `.cert-detail-*`
    // CSS classes so both share one design system.
    window.openEduPreview = function (eduId) {
        const edu = data.find(e => String(e.id) === String(eduId));
        if (!edu || typeof window.openPreviewModal !== 'function') return;

        const type = pickType(edu.degree);
        const { start, end } = splitPeriod(edu.period);
        const ongoing = isOngoing(edu.period);
        const hasLink = edu.link && edu.link !== '#';
        const isPdf = edu.link && edu.link.toLowerCase().endsWith('.pdf');
        const hasRealImage = edu.image && edu.image.trim() !== '' && !edu.image.includes('unsplash.com');

        // ----- Left: styled certificate visual or PDF embed -----
        let certVisual = '';
        if (isPdf) {
            certVisual = `
                <div class="cert-detail-visual cert-detail-visual--pdf" style="min-height: 460px; height: 100%;">
                    <iframe class="cert-detail-pdf-viewer" src="${escapeHtml(edu.link)}#toolbar=0" style="width:100%; height:100%; min-height:460px; border:none; background:#111; border-radius:15px; display:block;"></iframe>
                </div>
            `;
        } else if (hasRealImage) {
            certVisual = `
                <div class="cert-detail-visual cert-detail-visual--image-only" style="min-height: 460px; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 16px;">
                    <img src="${escapeHtml(edu.image)}" alt="${escapeHtml(edu.degree)}" style="width:100%; height:100%; object-fit: contain; background: #0b0f19;">
                </div>
            `;
        } else {
            certVisual = `
                <div class="cert-detail-visual" style="min-height: 460px; height: 100%;">
                    <div class="cert-visual-frame">
                        <div class="cert-visual-issuer-badge">
                            <i class="fas ${type.icon}"></i>
                            <span>${escapeHtml(edu.institutionShort || type.label.toUpperCase())}</span>
                        </div>
                        <h3 class="cert-visual-title">${escapeHtml(edu.degree)}</h3>
                        ${edu.subtitle ? `<div class="cert-visual-subtitle">${escapeHtml(edu.subtitle.toUpperCase())}</div>` : ''}
                        <div class="cert-visual-recipient">
                            <span class="cert-visual-recipient-label">Otorgado a</span>
                            <span class="cert-visual-recipient-name">Yelsen Gonzales Huaromo</span>
                        </div>
                        ${edu.description ? `<p class="cert-visual-desc">${escapeHtml(edu.description)}</p>` : ''}
                        <div class="cert-visual-seal">
                            <i class="fas ${type.icon}"></i>
                            <span class="cert-seal-text">${ongoing ? 'EN CURSO' : 'CERTIFIED'}</span>
                            <span class="cert-seal-sub">${escapeHtml(type.label.toUpperCase())}</span>
                        </div>
                        <div class="cert-visual-dates">
                            ${start ? `<div class="cert-visual-date-col"><small>Inicio</small><span>${escapeHtml(start)}</span></div>` : ''}
                            ${end ? `<div class="cert-visual-date-col"><small>${ongoing ? 'Actualidad' : 'Finalización'}</small><span>${escapeHtml(end)}</span></div>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }


        // ----- Right top: pill + title + institution + date boxes -----
        const dateBoxes = [];
        if (start) {
            dateBoxes.push(`
                <div class="kit-date-box">
                    <div class="kit-date-box-label"><i class="far fa-calendar"></i>Inicio</div>
                    <div class="kit-date-box-value">${escapeHtml(start)}</div>
                </div>
            `);
        }
        if (end) {
            dateBoxes.push(`
                <div class="kit-date-box">
                    <div class="kit-date-box-label"><i class="far fa-calendar-check"></i>${ongoing ? 'Actualidad' : 'Finalización'}</div>
                    <div class="kit-date-box-value">${escapeHtml(end)}</div>
                </div>
            `);
        }

        const statusPill = ongoing
            ? `<span class="kit-status-pill kit-status-pill--ongoing"><i class="fas fa-spinner"></i>En Curso</span>`
            : `<span class="kit-status-pill kit-status-pill--active"><i class="fas fa-check-circle"></i>Completado</span>`;

        const infoHead = `
            <div class="cert-detail-head">
                <span class="cert-category-pill">${escapeHtml(type.label)}</span>
                <h2 class="cert-detail-title">${escapeHtml(edu.degree)}</h2>
                ${edu.subtitle ? `<div class="cert-detail-subtitle">${escapeHtml(edu.subtitle)}</div>` : ''}
                <div class="cert-detail-issuer">
                    <i class="fas fa-circle-check"></i>
                    <span>Otorgado por <strong>${escapeHtml(edu.institution)}</strong></span>
                </div>
                <div class="cert-detail-dates">
                    ${dateBoxes.join('')}
                    ${statusPill}
                </div>
            </div>
        `;

        // ----- Right middle: skills section (if provided) -----
        const skillsSection = (edu.skills && edu.skills.length > 0) ? `
            <div class="cert-detail-section">
                <h4 class="cert-section-title"><i class="fas fa-star"></i>Áreas de Formación</h4>
                <ul class="cert-skills-list">
                    ${edu.skills.map(skill => `
                        <li class="cert-skill-item">
                            <div class="cert-skill-icon"><i class="${skill.icon}"></i></div>
                            <div class="cert-skill-text">
                                <span class="cert-skill-name">${escapeHtml(skill.name)}</span>
                                <span class="cert-skill-desc">${escapeHtml(skill.description)}</span>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>
        ` : '';

        // ----- Right bottom: verify credential box -----
        const credentialBox = `
            <div class="cert-detail-section cert-credential-box">
                <h4 class="cert-section-title"><i class="fas fa-shield-halved"></i>Verificar Credencial</h4>
                <p class="cert-credential-desc">
                    Confirma la autenticidad de este título
                    ${hasLink ? `en el portal oficial de ${escapeHtml(edu.institutionShort || 'la institución')}.` : '.'}
                </p>
                ${hasLink ? `
                    <a href="${escapeHtml(edu.link)}" target="_blank" rel="noopener" class="cert-verify-btn">
                        <i class="fas fa-external-link-alt"></i>
                        <span>Verificar Credencial</span>
                    </a>
                ` : `
                    <div class="cert-verify-btn cert-verify-btn--disabled">
                        <i class="fas fa-lock"></i>
                        <span>Verificación interna</span>
                    </div>
                `}
                ${edu.certificateNumber ? `
                    <div class="cert-credential-id">
                        <div class="cert-credential-id-label">N° de registro</div>
                        <div class="cert-credential-id-row">
                            <code>${escapeHtml(edu.certificateNumber)}</code>
                            <button type="button" class="cert-credential-copy"
                                onclick="window.copyCredentialId('${escapeHtml(edu.certificateNumber)}', this)"
                                aria-label="Copiar N° de registro">
                                <i class="far fa-copy"></i>
                            </button>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        // ----- Assemble -----
        const html = `
            <div class="cert-detail-modal" style="--accent-color: ${type.color};">
                <button type="button" class="cert-detail-close" data-bs-dismiss="modal" aria-label="Cerrar">
                    <i class="fas fa-times"></i>
                </button>
                <div class="cert-detail-grid">
                    ${certVisual}
                    <div class="cert-detail-info">
                        ${infoHead}
                        ${skillsSection}
                        ${credentialBox}
                    </div>
                </div>
            </div>
        `;

        window.openPreviewModal(html, 'Detalles de Educación');
    };

    educationContainer.classList.remove('row', 'g-4');
    educationContainer.className = '';

    // Auto-scrolling marquee, always on. With few entries, expand the "single set"
    // so each half of the track has enough cards to fill the viewport densely.
    const cardsHTML = data.map(e => buildEducationCard(e)).join('');
    const copiesPerSet = Math.max(1, Math.ceil(6 / data.length));
    const singleSet = Array(copiesPerSet).fill(cardsHTML).join('');
    const trackHTML = singleSet + singleSet;
    const totalCards = data.length * copiesPerSet * 2;
    const duration = Math.max(40, totalCards * 4);

    educationContainer.innerHTML = `
        <div class="kit-marquee" aria-label="Educación">
            <div class="kit-marquee-track" style="--marquee-duration: ${duration}s;">
                ${trackHTML}
            </div>
        </div>
        <div class="section-cta-wrapper" style="margin-top: 2rem;">
            <button type="button" class="view-more-modern" data-bs-toggle="modal" data-bs-target="#allEducationModal">
                Ver toda la lista (${data.length}) <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;

    const allEducationContainer = document.querySelector('#all-education-container');
    if (allEducationContainer) {
        allEducationContainer.innerHTML = `
            <div class="kit-grid">
                ${data.map(e => buildEducationCard(e)).join('')}
            </div>
        `;
    }
}
