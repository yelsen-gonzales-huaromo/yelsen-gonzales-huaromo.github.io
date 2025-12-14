# 🔒 Sistema de Seguridad Anti-Clonado
## {codeia} - Consultoría & Desarrollo

---

## 📋 Características Implementadas

### ✅ Protecciones Activas

1. **Mensaje Personalizado en Consola**
   - Muestra "¿Qué miras bobo? 👀" cuando alguien abre DevTools
   - Advertencias de copyright y derechos reservados
   - Limpieza constante de la consola

2. **Detector de DevTools**
   - Detecta cuando se abren las herramientas de desarrollador
   - Activa protecciones adicionales automáticamente
   - Monitoreo continuo cada 500ms

3. **Bloqueo de Atajos de Teclado**
   - F12 (DevTools)
   - Ctrl+Shift+I (Inspector)
   - Ctrl+Shift+J (Consola)
   - Ctrl+Shift+C (Selector de elementos)
   - Ctrl+U (Ver código fuente)
   - Ctrl+S (Guardar página)

4. **Protección de Clic Derecho**
   - Deshabilitado en elementos de código
   - **PERMITIDO** en inputs y textareas (buena UX)

5. **Selección de Texto Inteligente**
   - Bloqueada en elementos `<pre>` y `<code>`
   - **PERMITIDA** en contenido normal (párrafos, títulos)
   - **PERMITIDA** en formularios (inputs, textareas)

6. **Ofuscación de Código**
   - Comentarios falsos en el DOM
   - Hashes aleatorios
   - Checksums dinámicos

7. **Detector de Herramientas de Clonación**
   - Detecta extensiones de scraping
   - Monitorea cambios sospechosos en el DOM

8. **Marca de Agua en el Código**
   - Copyright visible en el código fuente
   - Información de contacto profesional
   - Advertencias legales

9. **Anti-Debugger**
   - Dificulta el debugging del código
   - **(Comentado por defecto)** - Puede activarse si es necesario

10. **Protección contra iFrame**
    - Previene que tu sitio sea embebido en otros sitios
    - Redirige automáticamente al sitio original

11. **Monitor de Cambios en el DOM**
    - Detecta manipulaciones del código en tiempo real
    - Registra intentos de modificación

12. **Protección CSS**
    - Marca de agua en impresión
    - Estilos anti-scraping
    - Selección selectiva de texto

---

## 🎯 Experiencia de Usuario

### ✅ Para Usuarios Normales:
- ✅ Navegación completamente normal
- ✅ Pueden seleccionar y copiar texto de contenido
- ✅ Pueden usar formularios sin problemas
- ✅ Pueden hacer clic derecho en inputs
- ✅ Experiencia fluida y sin interrupciones

### ⚠️ Para Clonadores:
- ❌ No pueden abrir DevTools sin ser detectados
- ❌ No pueden ver el código limpiamente
- ❌ No pueden usar atajos de desarrollador
- ❌ No pueden copiar código fácilmente
- ❌ Herramientas de clonación son detectadas
- ❌ Consola constantemente limpiada

---

## 🔧 Configuración

### Activar/Desactivar Anti-Debugger

En `js/security.js`, línea ~220:

```javascript
// Anti-debugger (comentado por defecto, puede ser molesto)
// antiDebugger();
```

Para activarlo, descomenta la línea:
```javascript
antiDebugger();
```

⚠️ **Advertencia**: Esto puede hacer que la página sea más lenta y molesta para desarrolladores legítimos.

---

## 📊 Niveles de Protección

### Nivel 1: Básico (Actual)
- Mensaje en consola
- Bloqueo de atajos
- Clic derecho deshabilitado
- Marca de agua

### Nivel 2: Medio (Opcional)
- Activar anti-debugger
- Ofuscación más agresiva
- Detección de extensiones

### Nivel 3: Máximo (No recomendado)
- Bloquear toda selección de texto
- Deshabilitar completamente DevTools
- Puede afectar UX negativamente

---

## ⚖️ Limitaciones Legales

### ⚠️ Importante:

1. **No es 100% infalible**: Desarrolladores experimentados pueden evitar estas protecciones
2. **No reemplaza derechos de autor**: Registra tu código legalmente si es necesario
3. **Puede ser evitado**: Screenshots, grabaciones de pantalla, etc.
4. **Solo dificulta, no previene**: El objetivo es desalentar, no bloquear completamente

### ✅ Recomendaciones:

- Agrega un archivo `LICENSE` a tu proyecto
- Incluye términos de uso en tu sitio
- Considera registrar tu marca y diseño
- Usa watermarks visibles en imágenes importantes

---

## 🚀 Próximos Pasos

### Mejoras Opcionales:

1. **Ofuscación de JavaScript**
   - Usar herramientas como `javascript-obfuscator`
   - Minificar todo el código
   - Usar webpack con configuración de producción

2. **Protección de Imágenes**
   - Agregar watermarks visibles
   - Usar lazy loading con tokens
   - Proteger URLs de imágenes

3. **Backend Protection**
   - Rate limiting
   - Detección de bots
   - Análisis de patrones de tráfico

4. **CDN y Hosting**
   - Usar Cloudflare para protección DDoS
   - Configurar headers de seguridad
   - Implementar CSP (Content Security Policy)

---

## 📞 Contacto

Si detectas algún intento de clonación o tienes preguntas sobre la seguridad:

**{codeia} - Consultoría & Desarrollo**
- Email: [Tu email]
- GitHub: [Tu GitHub]
- LinkedIn: [Tu LinkedIn]

---

## 📄 Licencia

© 2025 {codeia} - Todos los derechos reservados

Este código está protegido por derechos de autor. El uso, copia, modificación o distribución no autorizada está prohibida.

---

**Última actualización**: ${new Date().toLocaleDateString('es-ES')}
