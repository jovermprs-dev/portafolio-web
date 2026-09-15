# Roadmap: Portafolio + Portal de Proyectos

## Decisiones abiertas (con recomendación)

| Decisión | Recomendación | Por qué |
|---|---|---|
| Stack portafolio | **Astro** | Contenido mayormente estático (CV, secciones fijas). Astro genera HTML puro por defecto, carga instantánea, y permite "islas" de React/Vue si luego quieres algo interactivo puntual. Next.js solo compensa si planeas rutas dinámicas, API routes o SSR — no es el caso todavía. |
| Registrador de dominio | **Cloudflare Registrar** | Precio a coste (sin margen), y ya vas a mover el DNS a Cloudflare, así queda todo en un sitio. Namecheap es válido si Cloudflare no tiene la extensión que quieres. |
| Hosting del portafolio | **Vercel** | Mejor integración con Astro/Next, previews automáticos por PR, gratis en el tier hobby. Netlify es intercambiable si prefieres. |
| VPS | **Hetzner CX22 (4GB)** | Confirmado en el roadmap original. Suficiente para Traefik + 2-3 Spring Boot pequeños. Si vas a tener 4+ proyectos activos a la vez, valora CX32. |
| Analítica | **Umami o Plausible self-hosted** (o ninguna al principio) | Google Analytics implica banner de cookies obligatorio en España/UE. Umami/Plausible son "cookieless" y puedes alojarlos tú mismo en el VPS de la Fase 2, evitando el aviso de cookies. |
| Formulario de contacto | **Resend o Formspree** (sin backend propio) | Evita montar un servicio solo para un formulario. Resend tiene buen tier gratuito y API simple; se integra bien con Astro. |

Estas son recomendaciones por defecto para no bloquear el avance — cualquiera se puede cambiar sin romper el resto del plan.

---

## Fase 1 — Portafolio funcionando en el dominio

**Objetivo de esta fase:** tener tu-dominio.com en vivo con tu CV, aunque el portal de proyectos todavía no exista.

### 1.1 Dominio y DNS
- [ ] Decidir el nombre de dominio (tu nombre, variante corta, o algo tipo `sergiodev.xyz`)
- [ ] Comprarlo en Cloudflare Registrar (o Namecheap si la extensión no está disponible ahí)
- [ ] Mover la gestión DNS a Cloudflare (gratis, aunque el dominio esté registrado en otro sitio)
- [ ] Activar "Always Use HTTPS" y SSL/TLS modo "Full (strict)" en Cloudflare desde el principio
- [ ] Verificar que el dominio resuelve (aunque sea a una página en blanco)

### 1.2 Construcción del portafolio
- [ ] Elegir stack: **Astro** (recomendado) o Next.js si prevés interactividad seria a corto plazo
- [ ] Definir secciones: Hero/presentación, Sobre mí, Experiencia (Inetum, etc.), Skills técnicos, Proyectos (con enlaces, aunque de momento apunten "próximamente"), Contacto/CV descargable
- [ ] Maquetar y dar estilo (puedes apoyarte en un template y personalizarlo)
- [ ] Añadir tu CV en PDF descargable
- [ ] SEO básico: `<title>`/meta description por página, Open Graph/Twitter cards (para que se vea bien al compartir el link), `sitemap.xml`, `robots.txt`, favicon
- [ ] Formulario de contacto (Resend/Formspree) o al menos un `mailto:` + enlaces a LinkedIn/GitHub
- [ ] Comprobar accesibilidad mínima (contraste, alt en imágenes, navegación por teclado) y rendimiento (Lighthouse ≥ 90)

### 1.3 Despliegue
- [ ] Crear cuenta en Vercel (o Netlify)
- [ ] Conectar el repo de GitHub del portafolio (deploy automático en cada push)
- [ ] Apuntar el dominio (registro DNS tipo CNAME/A según el proveedor) al despliegue
- [ ] Verificar HTTPS activo (automático en Vercel/Netlify)
- [ ] Si usas analítica cookieless (Umami/Plausible), añadir el script de tracking; si no, dejarlo para la Fase 2 cuando el VPS ya exista

**✅ Fin de la Fase 1:** tu-dominio.com muestra tu CV completo, en HTTPS, con despliegue automático desde GitHub, SEO básico correcto y una forma de contactarte.

---

## Fase 2 — Dejar el espacio del portal preparado (sin proyectos aún)

**Objetivo de esta fase:** tener la infraestructura del portal lista y probada con un contenedor de ejemplo, para que añadir cada proyecto real después sea solo "seguir la plantilla".

### 2.1 Infraestructura base
- [ ] Contratar el VPS (Hetzner CX22 o similar, empezar con 4GB RAM si vas a tener varios Spring Boot activos)
- [ ] Endurecer seguridad básica: usuario no-root, SSH solo con clave, firewall (ufw), fail2ban
- [ ] Instalar Docker y Docker Compose en el VPS
- [ ] Configurar backups automáticos del VPS (snapshots de Hetzner, o `restic`/`borgbackup` a un bucket externo) — decidir esto **antes** de tener datos reales de usuarios (ej. reservas de restaurante)
- [ ] Instalar un monitor básico de uptime (Uptime Kuma en un contenedor propio, o un servicio externo tipo UptimeRobot)

### 2.2 Reverse proxy y subdominios
- [ ] Instalar Traefik como reverse proxy
- [ ] Configurar Traefik para emitir certificados HTTPS automáticos vía Let's Encrypt
- [ ] Proteger el dashboard de Traefik (auth básica o desactivarlo en producción; no dejarlo expuesto sin contraseña)
- [ ] Crear en Cloudflare un registro DNS comodín (`*.tu-dominio.com`) apuntando al VPS, para poder dar de alta subdominios sin tocar DNS cada vez
- [ ] Probar con un contenedor "hola mundo" (ej. una imagen Nginx simple) en `test.tu-dominio.com` para confirmar que todo el circuito (DNS → Traefik → contenedor → HTTPS) funciona

### 2.3 Plantilla reutilizable
- [ ] Crear una plantilla de `docker-compose.yml` con las etiquetas de Traefik ya preparadas (backend + frontend +, si aplica, base de datos)
- [ ] Incluir en la plantilla un patrón de variables de entorno / secrets (`.env` fuera de git, o Docker secrets) para no filtrar credenciales en el repo
- [ ] Definir estrategia de despliegue: manual (`docker compose pull && up -d` por SSH) o CI/CD simple (GitHub Actions que hace SSH al VPS en cada push a `main`)
- [ ] Documentar en un README propio los pasos exactos para añadir un proyecto nuevo (para no tener que pensarlo cada vez)

### 2.4 Enlace con el portafolio
- [ ] Añadir en la web del portafolio una sección "Proyectos" con tarjetas vacías o "próximamente", ya con la estructura visual lista para enlazar en cuanto despliegues el primero

**✅ Fin de la Fase 2:** el VPS tiene Docker + Traefik funcionando con backups y monitorización básica, un subdominio de prueba responde correctamente en HTTPS, y existe una plantilla clara (con manejo de secrets) para añadir cualquier proyecto en minutos.

---

## Fase 3 (futura, esbozo)

Dockerizar y desplegar cada proyecto real siguiendo la plantilla de la Fase 2.3:

1. Empezar por un proyecto ya terminado, como caso de prueba de la plantilla end-to-end.
2. Añadir el de reservas de restaurante cuando esté listo — este maneja datos de usuarios reales, así que antes de publicarlo conviene tener resueltos: backups de la base de datos, y un aviso legal + política de privacidad básica en el portafolio (obligatorio en España/UE en cuanto se recogen datos personales, aunque sea solo un nombre y teléfono).
3. Enlazar cada proyecto desde la sección "Proyectos" del portafolio (sustituyendo las tarjetas "próximamente" de la Fase 1.2/2.4).

---

## Notas de coste estimado (orientativo)

- Dominio: ~8-15 €/año según extensión
- Vercel/Netlify (tier hobby): 0 €
- Cloudflare (DNS + registrar): 0 € de gestión, coste = precio del dominio
- Hetzner CX22: ~4-5 €/mes
- Resend (tier gratuito, formulario contacto): 0 € hasta 3.000 emails/mes

Total aproximado para tener todo en marcha (Fases 1+2): **~5 €/mes + el coste anual del dominio**.
