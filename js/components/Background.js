export function initGridInteraction() {
    const bg = document.querySelector('.animated-background');
    if (!bg) return;

    const isMobile = window.innerWidth < 768;
    let highlight = document.getElementById('grid-highlight');

    if (!isMobile && !highlight) {
        highlight = document.createElement('div');
        highlight.id = 'grid-highlight';
        bg.appendChild(highlight);
    }

    const gridSize = 34;
    const speed = 1.0;

    // State
    let gridOffsetX = 0;
    let gridOffsetY = 0;
    let totalDrift = 0;

    let mouseX = -100;
    let mouseY = -100;

    // Random Highlights State
    const randomColors = [
        '#86FF00',
        '#d946ef',
        '#8b5cf6',
        '#FFD600'
    ];
    let activeRandomCells = [];

    // Helper: Spawn Random Cells
    function spawnRandomCells() {
        const maxCells = window.innerWidth < 768 ? 1 : 3;
        if (window.innerWidth < 768 && Math.random() > 0.5) return;
        const count = Math.floor(Math.random() * maxCells) + 1;
        const cols = Math.ceil(window.innerWidth / gridSize);
        const rows = Math.ceil(window.innerHeight / gridSize);
        const visualOffsetX = totalDrift % gridSize;
        const visualOffsetY = totalDrift % gridSize;

        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            const col = Math.floor(Math.random() * cols);
            const row = Math.floor(Math.random() * rows);
            const color = randomColors[Math.floor(Math.random() * randomColors.length)];
            const startX = (col * gridSize) + visualOffsetX;
            const startY = (row * gridSize) + visualOffsetY;

            el.className = 'grid-random-cell';
            el.style.backgroundColor = color;
            el.style.color = color;
            el.dataset.startX = startX;
            el.dataset.startY = startY;
            el.dataset.spawnDrift = totalDrift;
            el.dataset.spawnTime = Date.now();
            el.dataset.spawnScroll = window.scrollY;
            bg.appendChild(el);
            activeRandomCells.push(el);
            requestAnimationFrame(() => el.style.opacity = '0.15');
        }
    }

    // Spawn loop
    setInterval(spawnRandomCells, 4000);

    // Animation Loop
    function animate() {
        totalDrift += speed;
        const scrollOffset = window.scrollY * 0.5;
        const safeMod = (n, m) => ((n % m) + m) % m;

        gridOffsetX = safeMod(totalDrift, gridSize);
        gridOffsetY = safeMod(totalDrift - scrollOffset, gridSize);

        bg.style.setProperty('--grid-x', `${gridOffsetX}px`);
        bg.style.setProperty('--grid-y', `${gridOffsetY}px`);

        const now = Date.now();
        for (let i = activeRandomCells.length - 1; i >= 0; i--) {
            const cell = activeRandomCells[i];
            const spawnTime = parseInt(cell.dataset.spawnTime);

            if (now - spawnTime > 4000) {
                cell.style.opacity = '0';
                if (now - spawnTime > 5000) {
                    cell.remove();
                    activeRandomCells.splice(i, 1);
                }
            }

            const startX = parseFloat(cell.dataset.startX);
            const startY = parseFloat(cell.dataset.startY);
            const spawnDrift = parseFloat(cell.dataset.spawnDrift);
            const spawnScroll = parseFloat(cell.dataset.spawnScroll || 0);
            const driftDelta = totalDrift - spawnDrift;
            const scrollDelta = (window.scrollY - spawnScroll) * 0.5;
            const x = startX + driftDelta;
            const y = startY + driftDelta - scrollDelta;

            cell.style.left = `${x}px`;
            cell.style.top = `${y}px`;
        }

        if (!isMobile && highlight) {
            const rect = bg.getBoundingClientRect();
            const relX = (mouseX - rect.left) / 1.1;
            const relY = (mouseY - rect.top) / 1.1;
            const snapX = Math.floor((relX - gridOffsetX) / gridSize) * gridSize + gridOffsetX;
            const snapY = Math.floor((relY - gridOffsetY) / gridSize) * gridSize + gridOffsetY;

            highlight.style.left = `${snapX}px`;
            highlight.style.top = `${snapY}px`;
        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
}

// --- FLOATING SHAPES (PlayStation/Tech Style) --- //
export function initFloatingShapes() {
    const container = document.createElement('div');
    const shapes = ['circle', 'square', 'triangle', 'cross'];
    const count = window.innerWidth < 768 ? 4 : 8;

    container.className = 'floating-shapes-container';
    document.body.appendChild(container);

    for (let i = 0; i < count; i++) {
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        el.setAttribute('viewBox', '0 0 24 24');
        el.classList.add('shape-item');

        let inner = '';
        if (shapeType === 'circle') {
            inner = '<circle cx="12" cy="12" r="9" stroke="currentColor" fill="none" />';
        } else if (shapeType === 'square') {
            inner = '<rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" fill="none" />';
        } else if (shapeType === 'triangle') {
            inner = '<polygon points="12,4 21,20 3,20" stroke="currentColor" fill="none" />';
        } else if (shapeType === 'cross') {
            inner = '<path d="M6 6 L18 18 M18 6 L6 18" stroke-linecap="round" stroke="currentColor" fill="none" />';
        }

        el.innerHTML = inner;

        const size = Math.random() * 40 + 20;
        const randomSide = Math.random() > 0.5;
        const left = randomSide ? Math.random() * 15 : Math.random() * 15 + 85;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * -30;
        const isReverse = Math.random() > 0.5;
        const animName = isReverse ? 'floatDriftReverse' : 'floatDrift';

        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.left = `${left}%`;
        el.style.animation = `${animName} ${duration}s linear infinite ${delay}s`;
        el.style.opacity = (Math.random() * 0.3 + 0.1).toString();

        container.appendChild(el);
    }
}
