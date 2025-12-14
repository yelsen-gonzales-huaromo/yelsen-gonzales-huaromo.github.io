export function loadExperience() {
    const data = window.experienceData || (typeof experienceData !== 'undefined' ? experienceData : []);
    if (!data || data.length === 0) return;

    const timelineContainer = document.querySelector('#experience-timeline');
    if (timelineContainer) {
        // Render content for Timeline
        timelineContainer.innerHTML = data.map((exp, index) => {
            const side = index % 2 === 0 ? 'left' : 'right';
            const aosDelay = index * 100; // Staggered animation

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
