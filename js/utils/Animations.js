export function initAOS() {
    // Initialize AOS with optimized settings
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            mirror: false,
            offset: 50,
            delay: 50,
        });
    }
}
