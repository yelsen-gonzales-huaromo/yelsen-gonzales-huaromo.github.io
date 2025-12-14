export function loadSkills() {
    const techStackContainer = document.getElementById('techstack-container');
    const data = window.skillsData || (typeof skillsData !== 'undefined' ? skillsData : null);

    if (!techStackContainer) return;

    if (!data) {
        techStackContainer.innerHTML = '<div class="text-center">No skills found.</div>';
        return;
    }

    // Use centralized tech helpers (imported in app.js)
    const getTechColor = (name) => {
        return window.getTechColor ? window.getTechColor(name) : '#6366f1';
    };

    const getTechIconClass = (name) => {
        return window.getTechIconClass ? window.getTechIconClass(name) : 'fas fa-code';
    };

    const getStyle = (name) => {
        const color = getTechColor(name);
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
                    ${items.map(skillName => {
            // skillName is now just a string, get icon from helper
            const iconClass = getTechIconClass(skillName);
            return `
                        <div class="tech-card-pro" ${getStyle(skillName)}>
                            <div class="tech-icon-box">
                                <i class="${iconClass}"></i>
                            </div>
                            <span class="tech-name">${skillName}</span>
                        </div>
                    `}).join('')}
                </div>
            </div>
        `;
    };

    // Render categories if skillsData is an object (new format)
    if (!Array.isArray(data)) {
        html += renderCategory('Frontend', data.frontend);
        html += renderCategory('Backend', data.backend);
        html += renderCategory('Database', data.database);
        html += renderCategory('Tools', data.tools);
    } else {
        // Fallback for old array format
        html += `<div class="d-flex flex-wrap gap-2 justify-content-center">`;
        html += data.map(skill => `<span class="skill-item">${skill}</span>`).join('');
        html += `</div>`;
    }

    html += `</div>`;
    techStackContainer.innerHTML = html;
}
