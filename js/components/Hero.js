import Typewriter from '../utils/Typewriter.js';

export function loadHero() {
    const data = window.profileData || (typeof profileData !== 'undefined' ? profileData : null);

    if (!data) {
        console.warn('Hero: profileData not found');
        return;
    }

    // Get hero section (not container, since we're updating the existing hero section)
    const heroSection = document.querySelector('#home.hero');
    if (!heroSection) {
        console.warn('Hero: #home.hero section not found');
        return;
    }

    // Update hero content dynamically
    const heroTitle = document.getElementById('hero-title');
    const heroRole = document.getElementById('hero-role');
    const heroText = document.getElementById('hero-text');

    if (heroTitle) {
        heroTitle.innerHTML = `Hola, soy <span class="gradient-text">${data.name || 'Tu Nombre'}</span>`;
    }

    if (heroText) {
        heroText.textContent = data.heroText || 'Transformando ideas en soluciones digitales innovadoras con código limpio y arquitecturas escalables.';
    }

    // Initialize Typewriter Effect with roles array
    if (heroRole && data.roles && data.roles.length > 0) {
        // Clear any existing content
        heroRole.innerHTML = '';
        // Initialize typewriter with multiple roles
        new Typewriter(heroRole, data.roles, 2500);
    } else if (heroRole && data.role) {
        // Fallback to single role
        heroRole.textContent = data.role;
    }
}
