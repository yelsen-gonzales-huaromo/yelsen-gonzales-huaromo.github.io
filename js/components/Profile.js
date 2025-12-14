export function loadProfile() {
    const data = window.profileData || (typeof profileData !== 'undefined' ? profileData : null);

    if (!data) return;

    // Navbar Brand
    const brand = document.querySelector('.navbar-brand');
    if (brand) {
        brand.innerHTML = `
            <span class="brand-logo">${data.brandName || '{codeia}'}</span>
            <span class="brand-separator">|</span>
            <span class="brand-tagline">${data.brandTagline || 'Consultoría & Desarrollo'}</span>
        `;
    }

    // Hero Section
    const heroTitle = document.querySelector('#hero-title');
    if (heroTitle) {
        const headlineText = data.heroHeadline || `Hola, soy ${data.name}`;
        heroTitle.innerHTML = `<span class="gradient-text">${headlineText}</span>`;
    }

    // Role (Typewriter handled separately or fallback)
    const heroRole = document.querySelector('#hero-role');
    if (heroRole && (!data.roles || data.roles.length === 0)) {
        heroRole.textContent = data.role;
    }

    const heroText = document.querySelector('#hero-text');
    if (heroText) heroText.textContent = data.heroText;

    // About Section
    const aboutName = document.querySelector('#about-name-display');
    if (aboutName) aboutName.textContent = data.name;

    const aboutDesc = document.querySelector('#about-description');
    if (aboutDesc) aboutDesc.innerHTML = data.aboutDescription;

    const aboutQuote = document.querySelector('#about-quote');
    if (aboutQuote && data.aboutQuote) {
        aboutQuote.textContent = `"${data.aboutQuote}"`;
    }

    // Render Socials
    renderSocials('#hero-socials', data.socialLinks);
    renderSocials('.social-links', data.socialLinks);

    // Update Contact Social Cards
    if (data.socialLinks) {
        updateSocialCard('github', data.socialLinks.github);
        updateSocialCard('linkedin', data.socialLinks.linkedin);
        updateSocialCard('instagram', data.socialLinks.instagram);
        updateSocialCard('tiktok', data.socialLinks.tiktok);
    }
}

function renderSocials(containerSelector, socialLinks) {
    const container = document.querySelector(containerSelector);
    if (container && socialLinks) {
        // Use centralized social icon helpers (imported in app.js)
        const getSocialIconClass = (platform) => {
            return window.getSocialIconClass ? window.getSocialIconClass(platform) : 'fas fa-link';
        };

        const getSocialLabel = (platform) => {
            return window.getSocialLabel ? window.getSocialLabel(platform) : platform;
        };

        const linksHTML = Object.entries(socialLinks).map(([platform, url], index) => {
            if (!url) return '';
            const iconClass = getSocialIconClass(platform);
            const label = getSocialLabel(platform);
            const delay = (index + 1) * 100;
            return `<a href="${url}" target="_blank" class="social-icon animate-float" style="animation-delay: ${delay}ms;" data-platform="${platform}" data-tooltip="${label}">
                        <i class="${iconClass}"></i>
                    </a>`;
        }).join('');

        container.innerHTML = linksHTML;
    }
}

function updateSocialCard(platform, url) {
    const card = document.querySelector(`.social-card.${platform}`);
    if (card) {
        const link = card.closest('a');
        if (link && url) link.href = url;
    }
}
