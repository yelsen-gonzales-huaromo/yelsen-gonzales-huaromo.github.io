const certificatesData = [
    {
        id: 2,
        title: "Cloud Computing: AWS · Azure · Google Cloud",
        subtitle: "Fundamentos de Nube",
        issuer: "Universidad Nacional de Ingeniería · UNI",
        issuerShort: "UNI",
        date: "Feb 2025",
        grade: "19/20",
        hours: "24 horas",
        level: "Programa de Iniciación Tecnológica PIT",
        certificateNumber: "017-0016703",
        description: "Programa intensivo en las tres principales plataformas cloud. Cubre infraestructura, almacenamiento, redes virtuales, identidad y acceso, seguridad y administración de costos en AWS, Azure y Google Cloud.",
        skills: [
            { name: "Arquitectura Cloud", icon: "fas fa-cloud", description: "Diseño de arquitecturas escalables y de alta disponibilidad en la nube." },
            { name: "Multi-Cloud", icon: "fas fa-server", description: "Servicios en AWS, Azure y Google Cloud Platform." },
            { name: "Seguridad", icon: "fas fa-shield-halved", description: "Identidad, acceso y modelo de confianza cero." }
        ],
        quote: "Esta certificación me da las bases para diseñar soluciones cloud robustas y multi-plataforma.",
        image: "images/cert-previews/cloud-computing-preview.jpg",
        type: "image",
        link: "docs/certificados/CLOUD COMPUTING.pdf"
    },
    {
        id: 3,
        title: "SQL Server · Base de Datos 2",
        subtitle: "Procedimientos, Triggers y Cursores",
        issuer: "Universidad Nacional de Ingeniería · UNI",
        issuerShort: "UNI",
        date: "Mar 2025",
        grade: "17/20",
        hours: "16 horas",
        level: "Programa de Iniciación Tecnológica PIT",
        certificateNumber: "017-0020987",
        description: "Profundización en SQL Server: procedimientos almacenados, funciones (escalares, tabla, agregación, ventana), triggers (INSERT/UPDATE/DELETE) anidados y cursores con optimización de rendimiento.",
        skills: [
            { name: "Stored Procedures", icon: "fas fa-database", description: "Optimización y control de flujo en SQL Server." },
            { name: "Triggers", icon: "fas fa-bolt", description: "INSERT, UPDATE, DELETE y triggers anidados." },
            { name: "Cursores y Funciones", icon: "fas fa-code", description: "Funciones escalares, tabla, agregación y ventana." }
        ],
        quote: "Domino la lógica de servidor en SQL Server para construir capas de datos eficientes.",
        image: "images/cert-previews/sql-server-preview.jpg",
        type: "image",
        link: "docs/certificados/SQL SERVER.pdf"
    },
    {
        id: 4,
        title: "Machine Learning con Python",
        subtitle: "Aprendizaje Supervisado y No Supervisado",
        issuer: "Universidad Nacional de Ingeniería · UNI",
        issuerShort: "UNI",
        date: "Mar 2025",
        grade: "18/20",
        hours: "16 horas",
        level: "Programa de Iniciación Tecnológica PIT",
        certificateNumber: "017-0028879",
        description: "Fundamentos prácticos de Machine Learning con Python. Cubre numpy, pandas, matplotlib, seaborn, regresión lineal y logística, árboles de decisión, bosques aleatorios y técnicas de clustering.",
        skills: [
            { name: "Aprendizaje Supervisado", icon: "fas fa-brain", description: "Regresión, clasificación y barrido de hiperparámetros." },
            { name: "Análisis de Datos", icon: "fas fa-chart-line", description: "Pandas, NumPy y visualización con Matplotlib/Seaborn." },
            { name: "Algoritmos", icon: "fas fa-sitemap", description: "Árboles, bosques aleatorios y clustering." }
        ],
        quote: "Aplico técnicas de ML para resolver problemas de clasificación y predicción con Python.",
        image: "images/cert-previews/machine-learning-preview.jpg",
        type: "image",
        link: "docs/certificados/MACHINE LEARNING.pdf"
    },
    {
        id: 5,
        title: "C# Fundamental con Microsoft",
        subtitle: "Certificación de Desarrollador Oficial",
        issuer: "freeCodeCamp & Microsoft",
        issuerShort: "Microsoft",
        date: "Ago 2025",
        level: "Certificación de Especialidad",
        certificateNumber: "Foundational C# with Microsoft",
        description: "Certificación oficial emitida en conjunto por Microsoft y freeCodeCamp. Valida competencias en desarrollo C#, lógica de programación estructurada y orientada a objetos en entornos .NET.",
        skills: [
            { name: "C# Programming", icon: "fas fa-code", description: "Lógica avanzada y estructuras de datos nativas en C#." },
            { name: "Programación Orientada a Objetos", icon: "fas fa-cubes", description: "Clases, interfaces, herencia y polimorfismo." },
            { name: "Compilación y Depuración", icon: "fas fa-bug-slash", description: "Uso de depuradores y diagnóstico de código en C#." }
        ],
        quote: "Esta certificación oficial de Microsoft respalda mi base sólida de programación backend en C#.",
        image: "images/cert-previews/csharp-preview.jpg",
        type: "image",
        link: "https://freecodecamp.org/certification/yelsen/foundational-c-sharp-with-microsoft"
    },
    {
        id: 6,
        title: "Backend con Java: Seguridad Web con Spring Security",
        subtitle: "Especialización de Seguridad en Spring Boot",
        issuer: "Platzi",
        issuerShort: "Platzi",
        date: "Ago 2025",
        hours: "13 horas",
        level: "Certificación Online de Aprobación",
        certificateNumber: "0bb829af-4d2e-4cb3-81b0-2ef4bc7d9e8a",
        description: "Formación especializada en la implementación de autenticación y autorización en microservicios y APIs Java Spring Boot. Configuración de filtros, roles, JSON Web Tokens (JWT) y prevención de vulnerabilidades OWASP.",
        skills: [
            { name: "Spring Security", icon: "fas fa-shield-halved", description: "Configuración de seguridad, filtros interceptores y políticas CORS." },
            { name: "JWT Tokens", icon: "fas fa-key", description: "Generación, verificación y expiración segura de tokens portadores." },
            { name: "Autorización por Roles", icon: "fas fa-user-shield", description: "Control de acceso granular a endpoints basado en privilegios." }
        ],
        quote: "Aplico mecanismos de seguridad del estándar de la industria en todas mis aplicaciones Java.",
        image: "images/cert-previews/backend-java-preview.jpg",
        type: "image",
        link: "docs/certificados/BACKEND CON JAVA.pdf"
    },
    {
        id: 7,
        title: "Curso de Java Spring",
        subtitle: "Programación con Framework Spring",
        issuer: "Platzi",
        issuerShort: "Platzi",
        date: "Ago 2025",
        hours: "11 horas",
        level: "Certificación Online de Aprobación",
        certificateNumber: "733a8de0-8b27-42d0-8aef-69a3914d778d",
        description: "Formación en Spring Framework para el desarrollo de APIs RESTful robustas. Incluye Spring Boot, Spring Data JPA, inyección de dependencias y buenas prácticas de arquitectura de microservicios.",
        skills: [
            { name: "Spring Boot APIs", icon: "fas fa-server", description: "Controladores REST, inyección de dependencias y Spring Data JPA." },
            { name: "Microservicios", icon: "fas fa-network-wired", description: "Arquitectura distribuida con Spring Cloud." },
            { name: "Java Avanzado", icon: "fab fa-java", description: "Lambdas, Streams y programación funcional." }
        ],
        quote: "Conozco a profundidad las capacidades del framework Spring para crear servicios empresariales.",
        image: "images/cert-previews/java-spring-preview.jpg",
        type: "image",
        link: "docs/certificados/JAVA SPRING.pdf"
    },


    {
        id: 10,
        title: "Curso de Angular: Unit Testing para Servicios",
        subtitle: "Pruebas Unitarias en Angular",
        issuer: "Platzi",
        issuerShort: "Platzi",
        date: "Ago 2025",
        hours: "19 horas",
        level: "Certificación Online de Aprobación",
        certificateNumber: "5ab67f85-8505-47da-b943-cd7b914cac6c",
        description: "Formación en testing de servicios Angular con Jest y Jasmine. Cubre mocks, spies, testing de observables, servicios HTTP y buenas prácticas de pruebas unitarias en aplicaciones Angular.",
        skills: [
            { name: "Unit Testing", icon: "fas fa-vial", description: "Pruebas unitarias con Jasmine y Jest en Angular." },
            { name: "Mocks & Spies", icon: "fas fa-eye", description: "Simulación de dependencias y verificación de comportamientos." },
            { name: "Testing HTTP", icon: "fas fa-network-wired", description: "Pruebas de servicios con HttpClientTestingModule." }
        ],
        quote: "El testing es parte esencial de mi flujo de desarrollo para asegurar la calidad del software.",
        image: "images/cert-previews/angular-preview.jpg",
        type: "image",
        link: "docs/certificados/ANGULAR.pdf"
    },
    {
        id: 11,
        title: "Autenticación con Angular",
        subtitle: "Guards, Interceptores y Auth Flow",
        issuer: "Platzi",
        issuerShort: "Platzi",
        date: "Ago 2025",
        hours: "12 horas",
        level: "Certificación Online de Aprobación",
        certificateNumber: "bdb564e4-fb71-4848-91af-6acd49ff075b",
        description: "Implementación de flujos de autenticación y autorización en aplicaciones Angular. Cubre Route Guards, interceptores HTTP, manejo de tokens JWT y protección de rutas por roles.",
        skills: [
            { name: "Route Guards", icon: "fas fa-shield-halved", description: "Protección de rutas con CanActivate y CanLoad." },
            { name: "JWT en Angular", icon: "fas fa-key", description: "Manejo de tokens Bearer e interceptores HTTP." },
            { name: "Auth Flow", icon: "fas fa-user-lock", description: "Login, logout y refresh token en el lado cliente." }
        ],
        quote: "Implemento autenticación segura de extremo a extremo conectando backend Java con Angular.",
        image: "images/cert-previews/autenticacion-preview.jpg",
        type: "image",
        link: "docs/certificados/AUTENTICACION.pdf"
    },
    {
        id: 12,
        title: "Angular Avanzado",
        subtitle: "Arquitectura y Patrones Avanzados",
        issuer: "Platzi",
        issuerShort: "Platzi",
        date: "Ago 2025",
        hours: "16 horas",
        level: "Certificación Online de Aprobación",
        certificateNumber: "c3e91d59-8dc1-4b14-a1e6-4ad1587e4ca4",
        description: "Profundización en Angular: arquitectura escalable con módulos lazy loading, state management con NgRx, optimización de rendimiento con OnPush y estrategias avanzadas de componentes.",
        skills: [
            { name: "NgRx State Management", icon: "fas fa-diagram-project", description: "Manejo de estado predecible con acciones, reducers y efectos." },
            { name: "Lazy Loading", icon: "fas fa-bolt", description: "Carga diferida de módulos para optimizar el tiempo inicial." },
            { name: "Arquitectura Escalable", icon: "fas fa-layer-group", description: "Smart/dumb components y patrones de diseño Angular." }
        ],
        quote: "Construyo aplicaciones Angular de alta escala con arquitectura limpia y rendimiento óptimo.",
        image: "images/cert-previews/angular-avanzado-preview.jpg",
        type: "image",
        link: "docs/certificados/Angular Avanzado.pdf"
    },
    {
        id: 13,
        title: "Curso de TypeScript",
        subtitle: "Tipado Estático y Programación Avanzada",
        issuer: "Platzi",
        issuerShort: "Platzi",
        date: "Ago 2025",
        hours: "13 horas",
        level: "Certificación Online de Aprobación",
        certificateNumber: "4c6e771b-bfe2-4c1a-b18d-9ec68ce2c385",
        description: "Dominio completo de TypeScript: tipos básicos y avanzados, interfaces, genéricos, decoradores, enums y configuración de tsconfig para proyectos escalables en entornos Angular y Node.js.",
        skills: [
            { name: "Tipos y Generics", icon: "fas fa-code", description: "Sistema de tipos estático, unions, intersecciones y genéricos." },
            { name: "Interfaces y Clases", icon: "fas fa-cubes", description: "OOP tipado con interfaces, abstractas y decoradores." },
            { name: "Configuración TS", icon: "fas fa-gear", description: "tsconfig, strict mode y paths para proyectos de producción." }
        ],
        quote: "TypeScript es mi lenguaje principal en frontend, garantizando código robusto y mantenible.",
        image: "images/cert-previews/typescript-preview.jpg",
        type: "image",
        link: "docs/certificados/TypeScript.pdf"
    },
    {
        id: 14,
        title: "Inspiring Study Conference with Google",
        subtitle: "Participación Activa · Google for Education",
        issuer: "Google for Education · Progressio",
        issuerShort: "Google",
        date: "2025",
        hours: "80 horas",
        level: "Certificado de Participación",
        description: "Certificado de participación activa como asistente al curso de entrenamiento 'Inspiring Study Conference with Google'. Organizado por Progressio para América Latina con avalado de Google for Education y la Cámara Mundial de Conferencistas.",
        skills: [
            { name: "Google for Education", icon: "fab fa-google", description: "Herramientas y metodologías de aprendizaje con tecnología Google." },
            { name: "Conferencia Internacional", icon: "fas fa-globe", description: "Participación en evento formativo de alcance latinoamericano." },
            { name: "Productividad Digital", icon: "fas fa-laptop", description: "Técnicas de estudio inspirado con herramientas digitales." }
        ],
        quote: "Participo en eventos de formación internacional para mantenerme al día con las tendencias tecnológicas.",
        image: "images/cert-previews/google-preview.jpg",
        type: "image",
        link: "docs/certificados/google.pdf"
    }
];
