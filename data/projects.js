const projectsData = [
    {
        id: 1,
        title: "FacturaCore · Facturación Electrónica SUNAT",
        tagline: "SaaS multi-tenant de facturación conforme a normativa SUNAT · UBL 2.1",
        description: "Plataforma SaaS que automatiza la emisión de facturas, boletas, notas de crédito y guías de remisión con firma digital y envío directo a SUNAT.",
        images: [
            "images/projects/Facturación Electrónica/FacturaCore - Sistema de Facturación Electrónica SUNAT.png",
            "images/projects/Facturación Electrónica/FacturaCore - Sistema de Facturación Electrónica SUNAT (1).png",
            "images/projects/Facturación Electrónica/FacturaCore - Sistema de Facturación Electrónica SUNAT (2).png",
            "images/projects/Facturación Electrónica/FacturaCore - Sistema de Facturación Electrónica SUNAT (3).png"
        ],
        tags: [".NET 9", "Blazor", "SQL Server", "WebSockets", "XML UBL 2.1"],
        repoLink: null,
        demoLink: null,
        status: "private",
        caseStudy: {
            featured: true,
            fullDescription: "FacturaCore es una solución SaaS multi-tenant desarrollada bajo la normativa tributaria SUNAT (UBL 2.1) en Perú. Combina .NET 9 Web API en el backend con una interfaz Blazor WebAssembly reactiva. Cuenta con firma digital local por certificados X509-RSA-SHA256, validación RUC/DNI en tiempo real, envío asíncrono con resiliencia en cola local ante caídas de SUNAT, y webhooks configurables por evento.",
            badges: [".NET 9", "Blazor WebAssembly", "SUNAT UBL 2.1", "Firma X509", "Multi-tenant SaaS", "API REST", "Webhooks"],
            challenge: {
                description: "El comercio minorista requería emisión inmediata en cajas físicas sin depender de intermediarios costosos, con tolerancia total a las caídas o demoras de SUNAT y soporte para los 9 tipos de comprobantes exigidos.",
                bullets: [
                    "Tiempos de respuesta de SUNAT superiores a 5 segundos por comprobante.",
                    "Pérdidas de ventas por parálisis de caja durante cortes de Internet.",
                    "Altas comisiones recurrentes de Proveedores de Servicios Electrónicos (PSE).",
                    "Dificultades en firmas criptográficas veloces de XMLs desde el navegador."
                ]
            },
            solution: {
                description: "Firma criptográfica asíncrona de archivos XML UBL en el servidor mediante certificados X509 y almacenamiento temporal con SQLite. Cola de reintentos automatizada (Background Service) que despacha comprobantes tan pronto la red o SUNAT se restablecen, sin bloquear al cajero. Arquitectura multi-tenant con aislamiento por empresa (RUC).",
                code: {
                    language: "csharp",
                    snippet: "// Envío asíncrono de XML firmado con resiliencia Polly\npublic async Task<InvoiceResponse> SendInvoiceAsync(Invoice invoice) {\n  var xml = SignDocument(invoice); // Firma X509-RSA-SHA256\n  var result = await _retryPolicy.ExecuteAsync(() =>\n    sunatClient.SendBillAsync(xml));\n  if (result.Success) {\n    await SaveCdrAsync(result.Cdr);\n  } else {\n    await _queue.EnqueueForRetryAsync(invoice);\n  }\n  return result;\n}"
                }
            },
            results: [
                { value: "< 3s", label: "Emisión", sublabel: "Promedio por comprobante", icon: "fas fa-bolt" },
                { value: "9", label: "Comprobantes", sublabel: "Tipos SUNAT soportados", icon: "fas fa-file-invoice" },
                { value: "99.9%", label: "Uptime", sublabel: "Garantizado por SLA", icon: "fas fa-shield-halved" },
                { value: "S/. 0", label: "Costo PSE", sublabel: "Sin intermediarios", icon: "fas fa-coins" }
            ],
            architecture: [
                { name: "UI Adaptador", icon: "fas fa-desktop", description: "Blazor WASM Front" },
                { name: "API Gateway", icon: "fas fa-route", description: ".NET 9 REST Controllers" },
                { name: "Core Application", icon: "fas fa-gears", description: "Casos de Uso & Firma X509" },
                { name: "Dominio (Hexágono)", icon: "fas fa-circle-nodes", description: "Entidades & Reglas UBL 2.1" },
                { name: "Infra Adaptador", icon: "fas fa-database", description: "SQL Server & SOAP Client" },
                { name: "Resiliencia Adaptador", icon: "fas fa-shield-halved", description: "SQLite Queue + Polly" }
            ]
        },
        liveDemo: null
    },
    {
        id: 2,
        title: "ERP · Sistema de Gestión Empresarial",
        tagline: "Control integral de operaciones, inventario y reportes para empresas locales",
        description: "Sistema ERP de escritorio y web para la gestión de ventas, inventario, caja, personal y reportería de pequeñas y medianas empresas.",
        images: [
            "images/projects/Sistema ERP/Inicio de Sesión - ERP.png",
            "images/projects/Sistema ERP/ERP Sistema.png",
            "images/projects/Sistema ERP/ERP Sistema (1).png",
            "images/projects/Sistema ERP/ERP Sistema (2).png"
        ],
        tags: ["Laravel", "MySQL", "Bootstrap", "JavaScript ES6+", "Chart.js"],
        repoLink: null,
        demoLink: null,
        status: "private",
        caseStudy: {
            featured: true,
            fullDescription: "Sistema ERP modular desarrollado en Laravel para empresas de Huaraz y Huaral. Digitaliza el control de ventas, inventario, caja, asistencia de personal y generación de reportes en PDF. Diseñado para ser intuitivo para usuarios con nula experiencia técnica, con interfaces limpias y flujos guiados.",
            badges: ["Laravel", "Multi-módulo", "Ventas & Inventario", "Control de Caja", "Boletas PDF", "Reportería"],
            challenge: {
                description: "Las microempresas locales perdían dinero por descontrol de stock, cuadres de caja erróneos y registros manuales en papel propensos a pérdidas de información y robo hormiga.",
                bullets: [
                    "Caja descuadrada y discrepancias en transacciones diarias.",
                    "Falta de alertas de stock mínimo que detenían ventas de productos populares.",
                    "Tiempos elevados de atención y registro de ventas.",
                    "Pérdida de historial de clientes frecuentes."
                ]
            },
            solution: {
                description: "Núcleo de gestión unificado en Laravel con controladores transaccionales: una venta descuenta el stock de forma atómica. Módulos activables por rubro (hotelería, restaurantes, ferreterías, veterinarias). Generación automática de boletas y reportes en PDF con DomPDF.",
                code: {
                    language: "php",
                    snippet: "// Registrar venta y ajustar stock de forma atómica\npublic function registerSale(Request $request) {\n    DB::transaction(function () use ($request) {\n        $sale = Sale::create($request->only('client_id', 'total'));\n        foreach ($request->items as $item) {\n            $sale->details()->create($item);\n            Product::where('id', $item['product_id'])\n                   ->decrement('stock', $item['quantity']);\n        }\n    });\n    return response()->json(['success' => true]);\n}"
                }
            },
            results: [
                { value: "12+", label: "Negocios", sublabel: "Digitalizados en Huaraz", icon: "fas fa-shop" },
                { value: "Cero", label: "Pérdidas", sublabel: "Eliminación robo hormiga", icon: "fas fa-shield-halved" },
                { value: "< 5min", label: "Cierre Caja", sublabel: "Automatizado al instante", icon: "fas fa-calculator" },
                { value: "100%", label: "Trazabilidad", sublabel: "De ventas e inventario", icon: "fas fa-boxes-stacked" }
            ],
            architecture: [
                { name: "DB Multitenancy", icon: "fas fa-server", description: "Aislamiento por Empresa" },
                { name: "Modular Core", icon: "fas fa-cubes", description: "Middleware & Auth Laravel" },
                { name: "Business Layer", icon: "fas fa-gears", description: "Transacciones Atómicas ERP" },
                { name: "Data Access", icon: "fas fa-database", description: "Repository Pattern Eloquent" },
                { name: "UI & Analytics", icon: "fas fa-chart-column", description: "Bootstrap & Chart.js Engine" }
            ]
        },
        liveDemo: null
    }
];
