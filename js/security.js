/**
 * Aviso profesional de copyright
 * Yelsen Gonzales Huaromo — YelDev
 * © 2025 Todos los derechos reservados
 */

(function () {
    'use strict';

    // Mensaje profesional en consola (una sola vez)
    const showCopyrightNotice = () => {
        const titleStyles = [
            'color: #22d3ee',
            'font-size: 24px',
            'font-weight: bold',
            'padding: 8px 0'
        ].join(';');

        const subtitleStyles = [
            'color: #94a3b8',
            'font-size: 13px',
            'line-height: 1.6'
        ].join(';');

        const ctaStyles = [
            'color: #2dd4bf',
            'font-size: 13px',
            'font-weight: bold'
        ].join(';');

        console.log('%c¡Hola, desarrollador! 👋', titleStyles);
        console.log(
            '%cBienvenido al código de mi portafolio.\n' +
            'Si estás aquí porque te interesa cómo funciona, ¡genial!\n' +
            'Si buscas oportunidades de colaboración o un nuevo integrante de equipo,\n' +
            'me encantaría conversar contigo.',
            subtitleStyles
        );
        console.log(
            '%c📧 Escríbeme · 💼 ' + (window.profileData?.socialLinks?.linkedin || 'LinkedIn') + '\n' +
            '© ' + new Date().getFullYear() + ' Yelsen Gonzales Huaromo · Todos los derechos reservados',
            ctaStyles
        );
    };

    // Marca de agua en HTML (comentario invisible)
    const addWatermark = () => {
        const watermark = document.createComment(
            ' Portafolio de Yelsen Gonzales Huaromo · ' +
            new Date().getFullYear() + ' · Todos los derechos reservados · contacto profesional via LinkedIn '
        );
        document.documentElement.insertBefore(watermark, document.documentElement.firstChild);
    };

    // Previene embebido en iframes (clickjacking)
    const preventIframeEmbedding = () => {
        if (window.top !== window.self) {
            try { window.top.location = window.self.location; } catch (e) { /* ignore */ }
        }
    };

    const init = () => {
        showCopyrightNotice();
        addWatermark();
        preventIframeEmbedding();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
