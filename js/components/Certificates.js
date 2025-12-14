export function loadCertificates() {
    const certificatesContainer = document.getElementById('certificates-container');
    const allCertificatesContainer = document.getElementById('all-certificates-container');
    const data = window.certificatesData || (typeof certificatesData !== 'undefined' ? certificatesData : []);

    if (!certificatesContainer) return;

    if (!data || data.length === 0) {
        certificatesContainer.innerHTML = '<div class="text-center">No certificates found.</div>';
        return;
    }

    // Define global viewer function if not exists
    if (!window.viewCertificate) {
        window.viewCertificate = function (source, type, title) {
            const modalBody = document.getElementById('modalViewBody');
            const modalTitle = document.getElementById('viewModalTitle');
            const viewModalElement = document.getElementById('imageModal');

            if (modalTitle) modalTitle.textContent = title || 'Vista Previa';

            if (!viewModalElement) return;

            if (type === 'pdf') {
                modalBody.innerHTML = `
                    <iframe src="${source}" class="w-100" style="height: 80vh; border: none;" allowfullscreen></iframe>
                `;
            } else {
                modalBody.innerHTML = `
                    <img src="${source}" class="img-fluid rounded shadow-lg" style="max-height: 85vh; object-fit: contain;" alt="${title}">
                `;
            }

            if (typeof bootstrap !== 'undefined') {
                const viewModal = new bootstrap.Modal(viewModalElement);
                viewModal.show();
            }
        };
    }

    // --- 1. Populate Swiper --- //
    let html = `<div class="swiper-container-wrapper position-relative">
                    <div class="swiper certificatesSwiper">
                        <div class="swiper-wrapper">`;

    html += data.map((cert, index) => {
        const fileSource = cert.file || cert.image;
        const fileType = cert.type || 'image';
        return `
        <div class="swiper-slide">
            <div class="cert-card-pro" onclick="viewCertificate('${fileSource}', '${fileType}', '${cert.title}')">
                <div class="cert-bg-wrapper" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;">
                    <img src="${cert.image}" alt="${cert.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" ${index < 3 ? '' : 'loading="lazy"'}>
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

    html += `</div>
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
    </div>`;

    certificatesContainer.innerHTML = html;

    // Initialize Swiper
    if (typeof Swiper !== 'undefined') {
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
    }

    // --- 2. Populate Modal (Grid View) ---
    if (allCertificatesContainer) {
        allCertificatesContainer.innerHTML = data.map(cert => {
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
