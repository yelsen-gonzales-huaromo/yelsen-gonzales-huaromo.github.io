// Social Icons Helper Functions
// Helper functions to work with social icons data

/**
 * Get social media icon configuration
 * @param {string} platform - Social media platform name
 * @returns {Object} Icon configuration object
 */
function getSocialIcon(platform) {
    if (typeof socialIconsData === 'undefined') {
        console.warn('socialIconsData not loaded');
        return {
            icon: 'fas fa-link',
            color: '#6366F1',
            label: platform,
            hoverColor: '#4F46E5',
            description: `Visitar ${platform}`
        };
    }

    const key = platform.toLowerCase();
    return socialIconsData[key] || {
        icon: 'fas fa-link',
        color: '#6366F1',
        label: platform,
        hoverColor: '#4F46E5',
        description: `Visitar ${platform}`
    };
}

/**
 * Get icon class for a social platform
 * @param {string} platform - Social media platform name
 * @returns {string} Font Awesome icon class
 */
function getSocialIconClass(platform) {
    return getSocialIcon(platform).icon;
}

/**
 * Get color for a social platform
 * @param {string} platform - Social media platform name
 * @returns {string} Hex color code
 */
function getSocialColor(platform) {
    return getSocialIcon(platform).color;
}

/**
 * Get hover color for a social platform
 * @param {string} platform - Social media platform name
 * @returns {string} Hex color code
 */
function getSocialHoverColor(platform) {
    return getSocialIcon(platform).hoverColor;
}

/**
 * Get label for a social platform
 * @param {string} platform - Social media platform name
 * @returns {string} Platform label
 */
function getSocialLabel(platform) {
    return getSocialIcon(platform).label;
}

/**
 * Generate social icon HTML
 * @param {string} platform - Social media platform name
 * @param {string} url - URL to the social profile
 * @param {boolean} withTooltip - Whether to include tooltip
 * @returns {string} HTML string for the social icon
 */
function generateSocialIconHTML(platform, url, withTooltip = true) {
    const config = getSocialIcon(platform);
    const tooltipAttr = withTooltip ? `data-tooltip="${config.label}"` : '';

    return `
        <a href="${url}" 
           class="social-icon" 
           target="_blank" 
           rel="noopener noreferrer"
           ${tooltipAttr}
           aria-label="${config.label}">
            <i class="${config.icon}"></i>
        </a>
    `;
}

/**
 * Generate social card HTML (for contact section)
 * @param {string} platform - Social media platform name
 * @param {string} url - URL to the social profile
 * @returns {string} HTML string for the social card
 */
function generateSocialCardHTML(platform, url) {
    const config = getSocialIcon(platform);

    return `
        <div class="col-lg-3 col-md-6">
            <a href="${url}" target="_blank" class="social-card-link">
                <div class="social-card ${platform.toLowerCase()}">
                    <div class="d-flex align-items-center">
                        <i class="${config.icon} social-icon-large"></i>
                        <div class="social-info">
                            <h5>${config.label}</h5>
                            <span>${config.description}</span>
                        </div>
                    </div>
                    <i class="fas fa-share arrow-icon"></i>
                </div>
            </a>
        </div>
    `;
}

// Expose to global scope IMMEDIATELY
window.getSocialIcon = getSocialIcon;
window.getSocialIconClass = getSocialIconClass;
window.getSocialColor = getSocialColor;
window.getSocialHoverColor = getSocialHoverColor;
window.getSocialLabel = getSocialLabel;
window.generateSocialIconHTML = generateSocialIconHTML;
window.generateSocialCardHTML = generateSocialCardHTML;

// Also export for module usage
export {
    getSocialIcon,
    getSocialIconClass,
    getSocialColor,
    getSocialHoverColor,
    getSocialLabel,
    generateSocialIconHTML,
    generateSocialCardHTML
};
