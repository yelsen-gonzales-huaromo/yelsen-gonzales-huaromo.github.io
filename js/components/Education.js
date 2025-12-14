export function loadEducation() {
    const data = window.educationData || (typeof educationData !== 'undefined' ? educationData : []);
    if (!data || data.length === 0) return;

    const educationContainer = document.querySelector('#education-container');
    if (educationContainer) {
        educationContainer.innerHTML = data.map((edu, index) => `
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
