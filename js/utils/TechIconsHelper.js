// Tech Icons Helper Functions
// Helper functions to work with tech icons data

/**
 * Get technology icon configuration
 * @param {string} techName - Name of the technology
 * @returns {Object} Icon configuration object
 */
function getTechIcon(techName) {
    if (typeof techIconsData === 'undefined') {
        console.warn('techIconsData not loaded');
        return {
            icon: 'fas fa-code',
            color: '#6366F1',
            category: 'other'
        };
    }

    return techIconsData[techName] || {
        icon: 'fas fa-code',
        color: '#6366F1',
        category: 'other'
    };
}

/**
 * Get icon class for a technology
 * @param {string} techName - Name of the technology
 * @returns {string} Font Awesome icon class
 */
function getTechIconClass(techName) {
    return getTechIcon(techName).icon;
}

/**
 * Get color for a technology
 * @param {string} techName - Name of the technology
 * @returns {string} Hex color code
 */
function getTechColor(techName) {
    return getTechIcon(techName).color;
}

/**
 * Get all technologies by category
 * @param {string} category - Category name
 * @returns {Array} Array of technology names in that category
 */
function getTechsByCategory(category) {
    if (typeof techIconsData === 'undefined') {
        return [];
    }

    return Object.entries(techIconsData)
        .filter(([_, config]) => config.category === category)
        .map(([name, _]) => name);
}

// Expose to global scope IMMEDIATELY
window.getTechIcon = getTechIcon;
window.getTechIconClass = getTechIconClass;
window.getTechColor = getTechColor;
window.getTechsByCategory = getTechsByCategory;

// Also export for module usage
export { getTechIcon, getTechIconClass, getTechColor, getTechsByCategory };
