export function loadCertificates() {
    const certificatesContainer = document.getElementById('certificates-container');
    const allCertificatesContainer = document.getElementById('all-certificates-container');
    const data = window.certificatesData || (typeof certificatesData !== 'undefined' ? certificatesData : []);

    if (!certificatesContainer) return;

    if (!data || data.length === 0) {
        certificatesContainer.innerHTML = '<div class="text-center text-muted py-5">No hay certificaciones disponibles.</div>';
        return;
    }

    const escapeHtml = (str = '') => String(str).replace(/[&<>"']/g, (s) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]
    ));

    const getIssuerStyle = (issuer = '') => {
        const i = issuer.toLowerCase();
        if (i.includes('aws') || i.includes('amazon'))     return { abbr: 'AWS',  color: '#ff9900', icon: 'fab fa-aws' };
        if (i.includes('google'))                          return { abbr: 'GCP',  color: '#4285f4', icon: 'fab fa-google' };
        if (i.includes('microsoft') || i.includes('azure'))return { abbr: 'AZ',   color: '#0078d4', icon: 'fab fa-microsoft' };
        if (i.includes('meta') || i.includes('facebook'))  return { abbr: 'META', color: '#1877f2', icon: 'fab fa-meta' };
        if (i.includes('ibm'))                             return { abbr: 'IBM',  color: '#1f70c1', icon: 'fas fa-microchip' };
        if (i.includes('comptia'))                         return { abbr: 'CT+',  color: '#c8202f', icon: 'fas fa-shield-halved' };
        if (i.includes('udemy'))                           return { abbr: 'UD',   color: '#a435f0', icon: 'fas fa-play' };
        if (i.includes('unasam'))                          return { abbr: 'UNS',  color: '#22d3ee', icon: 'fas fa-university' };
        if (i.includes('uni') || i.includes('ingenier'))   return { abbr: 'UNI',  color: '#dc2626', icon: 'fas fa-university' };
        if (i.includes('coursera'))                        return { abbr: 'CO',   color: '#0056d2', icon: 'fas fa-graduation-cap' };
        return                                                    { abbr: 'CERT',color: '#2dd4bf', icon: 'fas fa-certificate' };
    };

    // Build a card (used both in lists AND in the single-card preview).
    // The only difference for preview mode is the kit-card--preview modifier,
    // which removes truncation and shows the image in full via CSS.
    const buildCertCard = (cert, { preview = false } = {}) => {
        const safeTitle = escapeHtml(cert.title);
        const safeIssuer = escapeHtml(cert.issuer);
        const safeDate = escapeHtml(cert.date);
        const safeImg = escapeHtml(cert.image || '');
        const issuerStyle = getIssuerStyle(cert.issuer);

        const overlayTags = [];
        if (cert.grade) overlayTags.push(`<span class="kit-tag-overlay kit-tag-overlay--gold" title="Nota"><i class="fas fa-medal"></i>${escapeHtml(cert.grade)}</span>`);
        if (cert.hours) overlayTags.push(`<span class="kit-tag-overlay" title="Duración"><i class="far fa-clock"></i>${escapeHtml(cert.hours)}</span>`);
        if (cert.level) overlayTags.push(`<span class="kit-tag-overlay" title="Nivel"><i class="fas fa-signal"></i>${escapeHtml(cert.level)}</span>`);
        const overlayTagsHTML = overlayTags.length ? `<div class="kit-card-tags-overlay">${overlayTags.join('')}</div>` : '';

        const clickAttr = preview ? '' : `role="button" tabindex="0" onclick="openCertPreview('${cert.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openCertPreview('${cert.id}')}"`;
        const classes = preview ? 'kit-card kit-card--preview' : 'kit-card kit-card--clickable';

        return `
        <article class="${classes}" style="--accent-color: ${issuerStyle.color};" ${clickAttr}>
            <div class="kit-card-media">
                ${safeImg ? `<img src="${safeImg}" alt="${safeTitle}" loading="lazy" onerror="this.style.display='none'; this.parentElement.classList.add('no-image');">` : ''}
                <div class="kit-card-media-fallback"><i class="${issuerStyle.icon}"></i></div>
                <div class="kit-card-media-overlay"></div>
                <div class="kit-card-top-row">
                    <span class="kit-chip"><i class="${issuerStyle.icon}"></i>${issuerStyle.abbr}</span>
                    <span class="kit-chip kit-chip--neutral"><i class="far fa-calendar"></i>${safeDate}</span>
                </div>
                ${overlayTagsHTML}
            </div>
            <div class="kit-card-body">
                <div class="kit-card-meta-row">
                    <span class="kit-card-meta-issuer">${safeIssuer}</span>
                </div>
                <h3 class="kit-card-title">${safeTitle}</h3>
            </div>
        </article>
        `;
    };

    // === Shared preview opener — clean event-driven drill-in ===
    //
    // ROOT CAUSE of the previous bug: my old code used `forceTearDownOpenModals`
    // which manipulated Bootstrap's private `_isShown` flag and removed
    // backdrops manually. This left Bootstrap's internal lifecycle in an
    // inconsistent state — so when the user later clicked X on the preview,
    // Bootstrap got confused about which modal it was actually closing,
    // sometimes firing `hidden.bs.modal` for the wrong modal, sometimes
    // double-firing it, sometimes refusing to reopen the list. Classic
    // "we lied to Bootstrap about state, now Bootstrap can't help us"
    // problem.
    //
    // FIX: never lie to Bootstrap. Chain everything via real lifecycle events:
    //   1. Open the preview from a card inside a list modal:
    //      a. Call list.hide()  →  wait for `hidden.bs.modal`  →  preview.show()
    //   2. User closes the preview (X / backdrop / ESC):
    //      a. preview fires `hidden.bs.modal`  →  list.show() (re-opens list)
    //
    // Only ONE modal is in `.show` state at any moment — that's why the visual
    // stacking / z-index issues don't reappear. And because we never touch
    // Bootstrap internals, instances stay consistent across the whole dance.
    //
    // A 400ms safety timeout fires if `hidden.bs.modal` somehow doesn't arrive
    // (rapid clicks, double-binding, weird browser timing) — defensive only.
    if (!window.openPreviewModal) {

        const reopenAfterPreview = (cameFromEl) => {
            // Reopen the list modal after the preview is fully hidden.
            // Small delay lets Bootstrap finish its post-hide cleanup pass
            // (removes body.modal-open, restores scroll, etc.) before we
            // trigger a fresh `.show()` on the list.
            setTimeout(() => {
                if (!cameFromEl) return;
                bootstrap.Modal.getOrCreateInstance(cameFromEl).show();
            }, 60);
        };

        window.openPreviewModal = function (html, title) {
            const modalEl = document.getElementById('previewModal');
            const bodyEl = document.getElementById('previewModalBody');
            const titleEl = document.getElementById('previewModalTitle');
            if (!modalEl || !bodyEl || typeof bootstrap === 'undefined') return;

            if (titleEl) titleEl.textContent = title || 'Vista Previa';
            bodyEl.innerHTML = html;

            // Re-clicking a different card while preview is already shown → only
            // refresh its content (above). Don't restart the drill-in.
            if (modalEl.classList.contains('show')) return;

            const previewBs = bootstrap.Modal.getOrCreateInstance(modalEl);
            const cameFrom = document.querySelector('.modal.show:not(#previewModal)');

            // Helper: hook up the "on preview close, reopen list" listener once
            const bindReopenOnPreviewClose = (cameFromEl) => {
                if (!cameFromEl) return;
                modalEl.addEventListener('hidden.bs.modal',
                    () => reopenAfterPreview(cameFromEl),
                    { once: true });
            };

            // Case A: nothing else is open → just show preview directly
            if (!cameFrom) {
                previewBs.show();
                return;
            }

            // Case B: a list modal is open. Hide it cleanly, then show preview.
            const cameFromBs = bootstrap.Modal.getOrCreateInstance(cameFrom);
            let previewShown = false;

            const showPreviewOnce = () => {
                if (previewShown) return;
                previewShown = true;
                bindReopenOnPreviewClose(cameFrom);
                previewBs.show();
            };

            // Primary path: wait for the list to fully hide, then open preview
            cameFrom.addEventListener('hidden.bs.modal', showPreviewOnce, { once: true });

            // Defensive fallback: if hidden.bs.modal never fires (edge cases
            // around rapid double-clicks or browser timing quirks), force the
            // preview open after 400ms anyway.
            setTimeout(showPreviewOnce, 400);

            cameFromBs.hide();
        };
    }

    // === Cert preview: rich 2-column "credential details" modal layout ===
    // Inspired by AWS/Google/Microsoft certification detail pages — left side
    // shows a styled "diploma" visual; right side has issuer verification,
    // date boxes, status pill, verified skills, and credential ID with copy.
    // Bottom row carries an italic quote from the certificate holder.
    window.openCertPreview = function (certId) {
        const cert = data.find(c => String(c.id) === String(certId));
        if (!cert) return;

        const issuerStyle = getIssuerStyle(cert.issuer);
        const hasLink = cert.link && cert.link !== '#';
        const isPdf = cert.link && cert.link.toLowerCase().endsWith('.pdf');
        const hasRealImage = cert.image
            && cert.image.trim() !== ''
            && !cert.image.includes('unsplash.com');

        // ----- Left: styled certificate visual or PDF embed -----
        let certVisual = '';
        if (isPdf) {
            certVisual = `
                <div class="cert-detail-visual cert-detail-visual--pdf" style="min-height: 460px; height: 100%;">
                    <iframe class="cert-detail-pdf-viewer" src="${escapeHtml(cert.link)}#toolbar=0" style="width:100%; height:100%; min-height:460px; border:none; background:#111; border-radius:15px; display:block;"></iframe>
                </div>
            `;
        } else if (hasRealImage) {
            certVisual = `
                <div class="cert-detail-visual cert-detail-visual--image-only" style="min-height: 460px; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 16px;">
                    <img src="${escapeHtml(cert.image)}" alt="${escapeHtml(cert.title)}" style="width:100%; height:100%; object-fit: contain; background: #0b0f19;">
                </div>
            `;
        } else {
            certVisual = `
                <div class="cert-detail-visual" style="min-height: 460px; height: 100%;">
                    <div class="cert-visual-frame">
                        <div class="cert-visual-issuer-badge">
                            <i class="${issuerStyle.icon}"></i>
                            <span>${escapeHtml(cert.issuerShort || issuerStyle.abbr)}</span>
                        </div>
                        <h3 class="cert-visual-title">${escapeHtml(cert.title)}</h3>
                        ${cert.subtitle ? `<div class="cert-visual-subtitle">${escapeHtml(cert.subtitle.toUpperCase())}</div>` : ''}
                        <div class="cert-visual-recipient">
                            <span class="cert-visual-recipient-label">Se otorga a</span>
                            <span class="cert-visual-recipient-name">Yelsen Gonzales Huaromo</span>
                        </div>
                        ${cert.description ? `<p class="cert-visual-desc">${escapeHtml(cert.description)}</p>` : ''}
                        <div class="cert-visual-seal">
                            <i class="${issuerStyle.icon}"></i>
                            <span class="cert-seal-text">CERTIFIED</span>
                            <span class="cert-seal-sub">${escapeHtml(cert.subtitle || cert.level || '')}</span>
                        </div>
                        <div class="cert-visual-dates">
                            <div class="cert-visual-date-col">
                                <small>Fecha de emisión</small>
                                <span>${escapeHtml(cert.date || '—')}</span>
                            </div>
                            ${cert.validUntil ? `
                                <div class="cert-visual-date-col">
                                    <small>Válida hasta</small>
                                    <span>${escapeHtml(cert.validUntil)}</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }


        // ----- Right top: category pill + title + issuer + date boxes -----
        const categoryLabel = (cert.level && /grado|profesional|associate/i.test(cert.level))
            ? 'Certificación Profesional'
            : 'Certificación Académica';

        const dateBoxes = [];
        if (cert.date) {
            dateBoxes.push(`
                <div class="kit-date-box">
                    <div class="kit-date-box-label"><i class="far fa-calendar"></i>Fecha de Emisión</div>
                    <div class="kit-date-box-value">${escapeHtml(cert.date)}</div>
                </div>
            `);
        }
        if (cert.validUntil) {
            dateBoxes.push(`
                <div class="kit-date-box">
                    <div class="kit-date-box-label"><i class="far fa-calendar-check"></i>Válida Hasta</div>
                    <div class="kit-date-box-value">${escapeHtml(cert.validUntil)}</div>
                </div>
            `);
        }

        const infoHead = `
            <div class="cert-detail-head">
                <span class="cert-category-pill">${categoryLabel}</span>
                <h2 class="cert-detail-title">${escapeHtml(cert.title)}</h2>
                ${cert.subtitle ? `<div class="cert-detail-subtitle">${escapeHtml(cert.subtitle)}</div>` : ''}
                <div class="cert-detail-issuer">
                    <i class="fas fa-circle-check"></i>
                    <span>Emitida por <strong>${escapeHtml(cert.issuer)}</strong></span>
                </div>
                <div class="cert-detail-dates">
                    ${dateBoxes.join('')}
                    <span class="kit-status-pill kit-status-pill--active">
                        <i class="fas fa-check-circle"></i>Vigente
                    </span>
                </div>
            </div>
        `;

        // ----- Right middle: verified skills -----
        const skillsSection = (cert.skills && cert.skills.length > 0) ? `
            <div class="cert-detail-section">
                <h4 class="cert-section-title"><i class="fas fa-star"></i>Habilidades Verificadas</h4>
                <ul class="cert-skills-list">
                    ${cert.skills.map(skill => `
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
                    Confirma la autenticidad de esta certificación
                    ${hasLink ? `en el portal oficial de ${escapeHtml(cert.issuerShort || issuerStyle.abbr)}.` : '.'}
                </p>
                ${hasLink ? `
                    <a href="${escapeHtml(cert.link)}" target="_blank" rel="noopener" class="cert-verify-btn">
                        <i class="fas fa-external-link-alt"></i>
                        <span>Verificar Credencial</span>
                    </a>
                ` : `
                    <div class="cert-verify-btn cert-verify-btn--disabled">
                        <i class="fas fa-lock"></i>
                        <span>Verificación interna</span>
                    </div>
                `}
                ${cert.certificateNumber ? `
                    <div class="cert-credential-id">
                        <div class="cert-credential-id-label">ID de credencial</div>
                        <div class="cert-credential-id-row">
                            <code>${escapeHtml(cert.certificateNumber)}</code>
                            <button type="button" class="cert-credential-copy"
                                onclick="window.copyCredentialId('${escapeHtml(cert.certificateNumber)}', this)"
                                aria-label="Copiar ID de credencial">
                                <i class="far fa-copy"></i>
                            </button>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        // ----- Assemble full layout with floating close button -----
        // No bottom quote, no modal header — everything fits in viewport without scroll.
        const html = `
            <div class="cert-detail-modal" style="--accent-color: ${issuerStyle.color};">
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

        window.openPreviewModal(html, 'Detalles de Certificación');
    };

    // Copy credential ID to clipboard with visual feedback
    if (!window.copyCredentialId) {
        window.copyCredentialId = function (id, buttonEl) {
            if (!navigator.clipboard) return;
            navigator.clipboard.writeText(id).then(() => {
                if (!buttonEl) return;
                const originalHTML = buttonEl.innerHTML;
                buttonEl.innerHTML = '<i class="fas fa-check"></i>';
                buttonEl.classList.add('cert-credential-copy--copied');
                setTimeout(() => {
                    buttonEl.innerHTML = originalHTML;
                    buttonEl.classList.remove('cert-credential-copy--copied');
                }, 1500);
            }).catch(() => {});
        };
    }

    // Auto-scrolling marquee — duplicate the cards for seamless infinite loop
    const cardsHTML = data.map(c => buildCertCard(c)).join('');
    const duration = Math.max(40, data.length * 8);

    certificatesContainer.innerHTML = `
        <div class="kit-marquee" aria-label="Certificaciones">
            <div class="kit-marquee-track" style="--marquee-duration: ${duration}s;">
                ${cardsHTML}
                ${cardsHTML}
            </div>
        </div>
        <div class="section-cta-wrapper" style="margin-top: 2rem;">
            <button type="button" class="view-more-modern" data-bs-toggle="modal" data-bs-target="#allCertificatesModal">
                Ver toda la lista (${data.length}) <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;

    if (allCertificatesContainer) {
        allCertificatesContainer.innerHTML = `
            <div class="kit-grid">
                ${data.map(c => buildCertCard(c)).join('')}
            </div>
        `;
    }
}
