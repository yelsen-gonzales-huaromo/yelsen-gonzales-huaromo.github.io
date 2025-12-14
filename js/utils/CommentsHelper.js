// Comments Helper Functions
// Helper functions to work with comments data

/**
 * Get all comments
 * @returns {Array} Array of comment objects
 */
function getComments() {
    if (typeof commentsData === 'undefined') {
        console.warn('commentsData not loaded');
        return [];
    }

    return commentsData;
}

/**
 * Add a new comment (mock - in real app would save to backend)
 * @param {string} name - Commenter name
 * @param {string} text - Comment text
 * @returns {Object} New comment object
 */
function addComment(name, text) {
    if (typeof commentsData === 'undefined') {
        console.warn('commentsData not loaded');
        return null;
    }

    const newComment = {
        id: commentsData.length + 1,
        name: name,
        text: text,
        date: 'Ahora mismo',
        avatar: null
    };

    window.commentsData.unshift(newComment);
    return newComment;
}

/**
 * Format comment HTML
 * @param {Object} comment - Comment object
 * @param {boolean} isNew - Whether this is a newly added comment
 * @returns {string} HTML string
 */
function formatCommentHTML(comment, isNew = false) {
    const borderStyle = isNew ? 'border-left: 3px solid var(--primary)' : '';
    return `
        <div class="comment-item" style="${borderStyle}">
            <div class="comment-header">
                <span class="comment-author">${comment.name}</span>
                <span class="comment-date">${comment.date}</span>
            </div>
            <div class="comment-body">
                ${comment.text}
            </div>
        </div>
    `;
}

// Expose to global scope IMMEDIATELY
window.getComments = getComments;
window.addComment = addComment;
window.formatCommentHTML = formatCommentHTML;

// Also export for module usage
export { getComments, addComment, formatCommentHTML };
