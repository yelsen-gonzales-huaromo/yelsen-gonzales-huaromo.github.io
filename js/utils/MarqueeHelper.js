// Marquee Helper Functions
// Helper functions to work with marquee data

/**
 * Get formatted marquee text with separators
 * @returns {string} Formatted text block
 */
function getMarqueeTextBlock() {
    if (typeof marqueeData === 'undefined') {
        console.warn('marqueeData not loaded');
        return 'SOBRE MÍ // PERFIL PROFESIONAL //';
    }

    return marqueeData.texts
        .map(text => `${text} <span class="marquee-separator">${marqueeData.separator}</span>`)
        .join(' ');
}

/**
 * Get marquee configuration
 * @returns {Object} Marquee settings
 */
function getMarqueeSettings() {
    if (typeof marqueeData === 'undefined') {
        return {
            speed: 'normal',
            direction: 'left',
            pauseOnHover: false
        };
    }

    return marqueeData.settings;
}

// Expose to global scope IMMEDIATELY
window.getMarqueeTextBlock = getMarqueeTextBlock;
window.getMarqueeSettings = getMarqueeSettings;

// Also export for module usage
export { getMarqueeTextBlock, getMarqueeSettings };
