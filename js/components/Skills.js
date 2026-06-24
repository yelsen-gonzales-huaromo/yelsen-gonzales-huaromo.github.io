export function loadSkills() {
    const techStackContainer = document.getElementById('techstack-container');
    const data = window.skillsData || (typeof skillsData !== 'undefined' ? skillsData : null);

    if (!techStackContainer) return;
    if (!data || !data.categories) {
        techStackContainer.innerHTML = '<div class="text-center text-muted py-5">No skills found.</div>';
        return;
    }

    const escapeHtml = (str = '') => String(str).replace(/[&<>"']/g, (s) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]
    ));

    const categories = data.categories;

    // ===== Radar Chart SVG — dynamic for N categories =====
    // Works with any number of categories (4 → square, 5 → pentagon, 6 → hexagon, …).
    // First axis points up (-90°), the rest distribute evenly around 360°.
    const buildRadar = () => {
        const N = categories.length;
        if (N < 3) return ''; // radar needs at least 3 axes
        const cx = 200, cy = 200, maxR = 130;
        const stepAngle = 360 / N;
        const axisAngles = categories.map((_, i) => -90 + i * stepAngle);

        // Concentric grid polygons (5 rings)
        const gridRings = [];
        for (let i = 1; i <= 5; i++) {
            const ringR = maxR * (i / 5);
            const ringPoints = axisAngles.map(deg => {
                const a = deg * Math.PI / 180;
                return `${(cx + ringR * Math.cos(a)).toFixed(1)},${(cy + ringR * Math.sin(a)).toFixed(1)}`;
            }).join(' ');
            const opacity = 0.06 + i * 0.025;
            gridRings.push(`<polygon points="${ringPoints}" fill="none" stroke="rgba(34, 211, 238, ${opacity.toFixed(2)})" stroke-width="0.6"/>`);
        }

        // Radial axis lines from center
        const axes = axisAngles.map(deg => {
            const a = deg * Math.PI / 180;
            const x2 = (cx + maxR * Math.cos(a)).toFixed(1);
            const y2 = (cy + maxR * Math.sin(a)).toFixed(1);
            return `<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="rgba(34, 211, 238, 0.18)" stroke-width="0.5"/>`;
        }).join('');

        // Data polygon (connecting each category's level)
        const polyPoints = categories.map((c, i) => {
            const a = axisAngles[i] * Math.PI / 180;
            const r = maxR * (c.level / 100);
            return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
        }).join(' ');

        // Glowing vertex dots
        const vertices = categories.map((c, i) => {
            const a = axisAngles[i] * Math.PI / 180;
            const r = maxR * (c.level / 100);
            const x = (cx + r * Math.cos(a)).toFixed(1);
            const y = (cy + r * Math.sin(a)).toFixed(1);
            return `
                <circle cx="${x}" cy="${y}" r="6" fill="${c.color}" stroke="#fff" stroke-width="1.5" filter="url(#vertexGlow)"/>
                <circle cx="${x}" cy="${y}" r="3" fill="#fff"/>
            `;
        }).join('');

        // Outer labels — icon + name + level%
        const labels = categories.map((c, i) => {
            const a = axisAngles[i] * Math.PI / 180;
            const labelR = maxR + 42;
            const x = (cx + labelR * Math.cos(a));
            const y = (cy + labelR * Math.sin(a));
            return `
                <foreignObject x="${x - 65}" y="${y - 28}" width="130" height="65">
                    <div xmlns="http://www.w3.org/1999/xhtml" class="radar-label">
                        <i class="${c.icon}" style="color:${c.color}"></i>
                        <span class="radar-label-name">${escapeHtml(c.label)}</span>
                        <span class="radar-label-pct">${c.level}%</span>
                    </div>
                </foreignObject>
            `;
        }).join('');

        return `
            <svg class="skills-pro-radar-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                    <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
                        <stop offset="0%"  stop-color="rgba(34, 211, 238, 0.45)"/>
                        <stop offset="60%" stop-color="rgba(168, 85, 247, 0.32)"/>
                        <stop offset="100%" stop-color="rgba(168, 85, 247, 0.10)"/>
                    </radialGradient>
                    <filter id="vertexGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur"/>
                        <feMerge>
                            <feMergeNode in="blur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                ${gridRings.join('')}
                ${axes}
                <polygon points="${polyPoints}" fill="url(#radarFill)" stroke="rgba(34, 211, 238, 0.95)" stroke-width="2" stroke-linejoin="round"/>
                ${vertices}
                ${labels}
            </svg>
        `;
    };

    // ===== Category Card with skills + progress bars =====
    const buildCategoryCard = (cat) => {
        const skillsHTML = cat.skills.map(s => `
            <div class="skills-pro-skill">
                <div class="skills-pro-skill-head">
                    <span class="skills-pro-skill-icon" style="--tech-color: ${s.color};">
                        <i class="${s.icon}"></i>
                    </span>
                    <span class="skills-pro-skill-name">${escapeHtml(s.name)}</span>
                </div>
                <div class="skills-pro-bar">
                    <div class="skills-pro-bar-track">
                        ${Array(10).fill(0).map((_, i) => `
                            <span class="skills-pro-bar-seg ${i < Math.round(s.level / 10) ? 'is-filled' : ''}"
                                  style="--seg-color: ${s.color};"></span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <div class="skills-pro-cat-card skills-pro-card-item card-${cat.key}" style="--cat-color: ${cat.color};">
                <div class="skills-pro-cat-head">
                    <span class="skills-pro-cat-label">${escapeHtml(cat.label)}</span>
                    <span class="skills-pro-cat-pct">${cat.level}%</span>
                </div>
                <div class="skills-pro-skills-list">${skillsHTML}</div>
            </div>
        `;
    };

    // ===== Others row (auto-scrolling marquee) =====
    // Same horizontal carousel pattern used in Projects/Certs/Education:
    // items rendered twice for seamless loop, animation pauses on hover, and
    // edges fade out via mask-image.
    const buildOthersRow = () => {
        if (!data.others || data.others.length === 0) return '';

        const buildItem = (o) => `
            <div class="skills-pro-other" style="--tech-color: ${o.color};" title="${escapeHtml(o.name)}">
                <i class="${o.icon}"></i>
                <span>${escapeHtml(o.name)}</span>
            </div>
        `;
        const itemsHTML = data.others.map(buildItem).join('');
        // Speed scales with how many items we have (longer track → longer cycle)
        const duration = Math.max(20, data.others.length * 4);

        return `
            <div class="skills-pro-others">
                <h4 class="skills-pro-others-title"><i class="fas fa-layer-group"></i>Otras Habilidades</h4>
                <div class="skills-pro-others-marquee" aria-label="Otras Habilidades">
                    <div class="skills-pro-others-track" style="--marquee-duration: ${duration}s;">
                        ${itemsHTML}
                        ${itemsHTML}
                    </div>
                </div>
            </div>
        `;
    };

    // ===== Focus card =====
    const buildFocusCard = () => {
        if (!data.focus) return '';
        return `
            <div class="skills-pro-focus">
                <h4 class="skills-pro-focus-title"><i class="fas fa-focus"></i>Enfoque Principal</h4>
                <p class="skills-pro-focus-text">${escapeHtml(data.focus)}</p>
            </div>
        `;
    };

    // ===== Assemble layout =====
    // Symmetrical grid with the hexagon radar chart in the center, and
    // cards surrounding it (3 on the left, 3 on the right).
    // Responsive classes adapt to column layouts on smaller devices.
    techStackContainer.innerHTML = `
        <div class="skills-pro">
            <!-- Main area: radar in the middle, cards grid around it -->
            <div class="skills-pro-main-grid">
                <div class="skills-pro-radar-center">
                    ${buildRadar()}
                </div>
                ${categories.map(buildCategoryCard).join('')}
            </div>

            <!-- Bottom row: others + focus -->
            <div class="skills-pro-bottom">
                ${buildOthersRow()}
                ${buildFocusCard()}
            </div>
        </div>
    `;
}
