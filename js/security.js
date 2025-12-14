/**
 * Sistema de Protección Anti-Clonado
 * {codeia} - Consultoría & Desarrollo
 * © 2025 Todos los derechos reservados
 */

(function () {
    'use strict';

    // ============================================
    // 1. MENSAJE PERSONALIZADO EN CONSOLA
    // ============================================
    const showConsoleWarning = () => {
        const styles = [
            'color: #00d4ff',
            'font-size: 40px',
            'font-weight: bold',
            'text-shadow: 2px 2px 4px rgba(0, 212, 255, 0.5)',
            'padding: 20px'
        ].join(';');

        const warningStyles = [
            'color: #ff0066',
            'font-size: 16px',
            'font-weight: bold',
            'background: #1a1a2e',
            'padding: 10px',
            'border-left: 4px solid #ff0066'
        ].join(';');

        console.clear();
        console.log('%c¿Qué miras bobo? 👀', styles);
        console.log('%c⚠️ ADVERTENCIA DE SEGURIDAD', warningStyles);
        console.log('%c\n🚫 Este sitio está protegido contra clonación\n📋 Código fuente: Propiedad de {codeia}\n⚖️ Uso no autorizado será reportado\n🔒 Todos los derechos reservados © 2025\n', 'color: #888; font-size: 12px;');
        console.log('%c\n💼 ¿Interesado en mi trabajo?\n📧 Contáctame de forma profesional\n', 'color: #00d4ff; font-size: 14px;');
    };

    // ============================================
    // 2. DETECTOR DE DEVTOOLS
    // ============================================
    let devtoolsOpen = false;
    const devtoolsDetector = () => {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        const orientation = widthThreshold ? 'vertical' : 'horizontal';

        if (!(heightThreshold && widthThreshold) &&
            ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                handleDevToolsOpen();
            }
        } else {
            devtoolsOpen = false;
        }
    };

    const handleDevToolsOpen = () => {
        showConsoleWarning();

        // Limpiar consola constantemente
        setInterval(() => {
            console.clear();
            showConsoleWarning();
        }, 100);

        // Redirigir console.log
        const noop = () => { };
        ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir', 'group', 'groupCollapsed', 'groupEnd', 'clear'].forEach(method => {
            const original = console[method];
            console[method] = function (...args) {
                if (args[0] && typeof args[0] === 'string' && args[0].includes('bobo')) {
                    original.apply(console, args);
                } else {
                    // Bloquear otros logs
                }
            };
        });
    };

    // ============================================
    // 3. DESHABILITAR ATAJOS DE TECLADO
    // ============================================
    document.addEventListener('keydown', (e) => {
        // F12
        if (e.keyCode === 123) {
            e.preventDefault();
            showConsoleWarning();
            return false;
        }

        // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
        if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
            e.preventDefault();
            showConsoleWarning();
            return false;
        }

        // Ctrl+U (ver código fuente)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            showConsoleWarning();
            return false;
        }

        // Ctrl+S (guardar página)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
    });

    // ============================================
    // 4. DESHABILITAR CLIC DERECHO (solo en elementos clave)
    // ============================================
    document.addEventListener('contextmenu', (e) => {
        // Permitir clic derecho en inputs y textareas para UX
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return true;
        }
        e.preventDefault();
        return false;
    });

    // ============================================
    // 5. PROTECCIÓN CONTRA SELECCIÓN DE CÓDIGO
    // ============================================
    document.addEventListener('selectstart', (e) => {
        // Permitir selección en inputs y textareas
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return true;
        }
        // Permitir selección de texto normal pero no de código
        if (e.target.closest('pre') || e.target.closest('code')) {
            e.preventDefault();
            return false;
        }
    });

    // ============================================
    // 6. OFUSCACIÓN DE CÓDIGO EN TIEMPO REAL
    // ============================================
    const obfuscateHTML = () => {
        // Agregar comentarios falsos en el DOM
        const comments = [
            ' Decompiled by {codeia} Security System ',
            ' Hash: ' + Math.random().toString(36).substring(7),
            ' Checksum: ' + Date.now().toString(36),
            ' Protected Content - Do Not Copy '
        ];

        comments.forEach(comment => {
            const commentNode = document.createComment(comment);
            document.body.appendChild(commentNode);
        });
    };

    // ============================================
    // 7. DETECTOR DE HERRAMIENTAS DE CLONACIÓN
    // ============================================
    const detectCloneTools = () => {
        // Detectar extensiones comunes de clonación
        const detectionDiv = document.createElement('div');
        detectionDiv.id = 'webscrapingdetector';
        detectionDiv.style.display = 'none';
        document.body.appendChild(detectionDiv);

        // Verificar si fue removido (señal de scraping)
        setTimeout(() => {
            if (!document.getElementById('webscrapingdetector')) {
                console.warn('⚠️ Herramienta de clonación detectada');
            }
        }, 1000);
    };

    // ============================================
    // 8. MARCA DE AGUA EN EL CÓDIGO
    // ============================================
    const addWatermark = () => {
        const watermark = document.createComment(`
        ╔═══════════════════════════════════════════════════════════╗
        ║                                                           ║
        ║   {codeia} - Consultoría & Desarrollo                    ║
        ║   © ${new Date().getFullYear()} Todos los derechos reservados                    ║
        ║                                                           ║
        ║   Este código está protegido por derechos de autor       ║
        ║   El uso no autorizado está prohibido                    ║
        ║                                                           ║
        ║   Desarrollado por: Yelsen Gonzales Huaromo              ║
        ║   Contacto profesional: [Tu email]                       ║
        ║                                                           ║
        ╚═══════════════════════════════════════════════════════════╝
        `);
        document.insertBefore(watermark, document.firstChild);
    };

    // ============================================
    // 9. DETECTOR DE DEBUGGER
    // ============================================
    const antiDebugger = () => {
        setInterval(() => {
            debugger; // Esto molesta a quien intente debuggear
        }, 100);
    };

    // ============================================
    // 10. PROTECCIÓN CONTRA IFRAME
    // ============================================
    const preventIframeEmbedding = () => {
        if (window.top !== window.self) {
            window.top.location = window.self.location;
        }
    };

    // ============================================
    // 11. DETECTAR CAMBIOS EN EL DOM
    // ============================================
    const protectDOM = () => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Detectar si alguien está manipulando el DOM
                    console.warn('🔒 Modificación del DOM detectada');
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true
        });
    };

    // ============================================
    // 12. INICIALIZACIÓN
    // ============================================
    const init = () => {
        // Mostrar mensaje inicial
        showConsoleWarning();

        // Activar detectores
        setInterval(devtoolsDetector, 500);

        // Protecciones
        addWatermark();
        obfuscateHTML();
        detectCloneTools();
        preventIframeEmbedding();
        protectDOM();

        // Anti-debugger (comentado por defecto, puede ser molesto)
        // antiDebugger();

        console.log('%c🔒 Sistema de seguridad activado', 'color: #00ff00; font-weight: bold;');
    };

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Proteger el código de este archivo
    Object.freeze(this);

})();
