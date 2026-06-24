// Skills Data — based on Yelsen's CV
// Structure:
//   overall: overall expertise %
//   focus: short paragraph describing main professional focus
//   categories: 6 main categories (Backend / Frontend / Database / Cloud-DevOps / APIs / Git-Agile)
//     each with: label, icon, color, level% and top 3 representative skills (each with level)
//   others: additional techs displayed in the bottom row

const skillsData = {
    overall: 90,
    focus: "Ingeniero de Sistemas e Informática especializado en desarrollo Full Stack y arquitectura Cloud. Experiencia sólida diseñando y desarrollando sistemas ERP SaaS para construcción, facturación electrónica alineada a SUNAT, plataformas educativas y automatizaciones DevOps en AWS y VPS.",

    categories: [
        {
            key: 'backend',
            label: 'Backend',
            icon: 'fas fa-server',
            color: '#84cc16',
            level: 92,
            skills: [
                { name: '.NET 9',       level: 95, icon: 'si si-dotnet',      color: '#512bd4' },
                { name: 'Spring Boot',  level: 88, icon: 'si si-springboot',  color: '#6db33f' },
                { name: 'Laravel 11',   level: 92, icon: 'si si-laravel',     color: '#ff2d20' }
            ]
        },
        {
            key: 'frontend',
            label: 'Frontend',
            icon: 'fas fa-display',
            color: '#22d3ee',
            level: 85,
            skills: [
                { name: 'React',        level: 88, icon: 'si si-react',       color: '#61dafb' },
                { name: 'Angular 18',   level: 80, icon: 'si si-angular',     color: '#dd0031' },
                { name: 'Blazor / Blade',level: 85, icon: 'si si-blazor',      color: '#3178c6' }
            ]
        },
        {
            key: 'database',
            label: 'Bases de Datos',
            icon: 'fas fa-database',
            color: '#a855f7',
            level: 90,
            skills: [
                { name: 'SQL Server',   level: 92, icon: 'si si-microsoftsqlserver', color: '#cc2927' },
                { name: 'PostgreSQL',   level: 85, icon: 'si si-postgresql',  color: '#336791' },
                { name: 'MySQL',        level: 90, icon: 'si si-mysql',       color: '#4479a1' }
            ]
        },
        {
            key: 'cloud',
            label: 'Cloud / DevOps',
            icon: 'fas fa-cloud',
            color: '#f59e0b',
            level: 88,
            skills: [
                { name: 'AWS (EC2/S3)', level: 90, icon: 'si si-amazonwebservices', color: '#ff9900' },
                { name: 'Azure App',    level: 82, icon: 'si si-microsoftazure', color: '#0078d4' },
                { name: 'Docker',       level: 88, icon: 'si si-docker',      color: '#0db7ed' }
            ]
        },
        {
            key: 'apis',
            label: 'APIs & Integraciones',
            icon: 'fas fa-link',
            color: '#ec4899',
            level: 85,
            skills: [
                { name: 'RESTful APIs',  level: 90, icon: 'fas fa-network-wired', color: '#10b981' },
                { name: 'WhatsApp API',  level: 85, icon: 'si si-whatsapp',     color: '#25d366' },
                { name: 'WebSockets',    level: 80, icon: 'fas fa-bolt',        color: '#f59e0b' }
            ]
        },
        {
            key: 'management',
            label: 'Metodologías & Control',
            icon: 'fas fa-tasks',
            color: '#3b82f6',
            level: 88,
            skills: [
                { name: 'Git & GitHub', level: 92, icon: 'si si-github',      color: '#ffffff' },
                { name: 'Scrum / Kanban',level: 85, icon: 'fas fa-list-check', color: '#06b6d4' },
                { name: 'Jira Software', level: 80, icon: 'si si-jira',        color: '#0052cc' }
            ]
        }
    ],

    others: [
        { name: 'Next.js',        icon: 'si si-nextdotjs',       color: '#ffffff' },
        { name: 'TypeScript',     icon: 'si si-typescript',      color: '#3178c6' },
        { name: 'Node.js',        icon: 'si si-nodedotjs',       color: '#84cc16' },
        { name: 'JavaScript ES6+',icon: 'si si-javascript',      color: '#f7df1e' },
        { name: 'Tailwind CSS',   icon: 'si si-tailwindcss',     color: '#38bdf8' },
        { name: 'Bootstrap 5',    icon: 'si si-bootstrap',       color: '#7952b3' },
        { name: 'GitHub Actions', icon: 'si si-githubactions',   color: '#ffffff' },
        { name: 'GitFlow',        icon: 'si si-git',             color: '#f1502f' },
        { name: 'Swagger',        icon: 'si si-swagger',         color: '#85ea2d' },
        { name: 'Postman',        icon: 'si si-postman',         color: '#ff6c37' },
        { name: 'Testing',        icon: 'fas fa-vial',           color: '#10b981' }
    ]
};
