export function initForms() {
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Gracias por tu mensaje. Esta funcionalidad requiere configuración de EmailJS.');
            this.reset();
        });
    }

    // Comment Form
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('comment-name').value;
            const text = document.getElementById('comment-text').value;

            if (name && text) {
                const container = document.getElementById('comments-container');

                // Use centralized comment helpers (imported in app.js)
                if (window.addComment && window.formatCommentHTML) {
                    const newComment = window.addComment(name, text);
                    const commentHTML = window.formatCommentHTML(newComment, true);
                    container.insertAdjacentHTML('afterbegin', commentHTML);
                } else {
                    // Minimal fallback
                    container.insertAdjacentHTML('afterbegin', `<div class="comment-item" style="border-left: 3px solid var(--primary)"><div class="comment-header"><span class="comment-author">${name}</span><span class="comment-date">Ahora mismo</span></div><div class="comment-body">${text}</div></div>`);
                }

                this.reset();
            }
        });

        loadCommentsMock();
    }
}

function loadCommentsMock() {
    const commentsContainer = document.getElementById('comments-container');
    if (!commentsContainer) return;

    // Use centralized comments helper (imported in app.js)
    const comments = window.getComments ? window.getComments() : [];

    // Use centralized formatter if available
    const html = window.formatCommentHTML
        ? comments.map(comment => window.formatCommentHTML(comment)).join('')
        : comments.map(c => `<div class="comment-item"><div class="comment-header"><span class="comment-author">${c.name}</span><span class="comment-date">${c.date}</span></div><div class="comment-body">${c.text}</div></div>`).join('');

    commentsContainer.innerHTML = html;
}
