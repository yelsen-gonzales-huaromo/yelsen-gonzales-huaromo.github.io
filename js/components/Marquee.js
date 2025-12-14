export function loadMarquee() {
    const marqueeContainer = document.getElementById('marquee-container');
    if (!marqueeContainer) return;

    // Use centralized marquee helper (imported in app.js)
    const textBlock = window.getMarqueeTextBlock ? window.getMarqueeTextBlock() : 'SOBRE MÍ // PERFIL PROFESIONAL //';

    // Create a long string with enough repetitions for seamless scroll
    const content = `<span>${textBlock}${textBlock}</span><span>${textBlock}${textBlock}</span>`;

    const html = `
        <div class="marquee-wrapper mb-5">
            <!-- Line 1: Normal Filled Text -->
            <div class="marquee-track marquee-normal">
                <div class="marquee-content">
                    ${content}
                </div>
            </div>
            <!-- Line 2: Outline Text (Reverse Direction) -->
            <div class="marquee-track marquee-reverse">
                <div class="marquee-content">
                    <span class="text-outline">${textBlock}${textBlock}</span>
                    <span class="text-outline">${textBlock}${textBlock}</span>
                </div>
            </div>
        </div>
    `;

    marqueeContainer.innerHTML = html;
}
