# Roadmap: Portfolio + Project Portal

## Open decisions (with recommendation)

| Decision | Recommendation | Why |
|---|---|---|
| Portfolio stack | **Astro** | Content is mostly static (CV, fixed sections). Astro ships plain HTML by default, loads instantly, and supports React/Vue "islands" later if you need interactivity in one spot. Next.js only pays off if you need dynamic routes, API routes, or SSR — not the case yet. |
| Domain registrar | **Cloudflare Registrar** | At-cost pricing (no markup), and since DNS is moving to Cloudflare anyway, everything stays in one place. Namecheap works if Cloudflare doesn't carry the TLD you want. |
| Portfolio hosting | **Vercel** | Best integration with Astro/Next, automatic PR previews, free on the hobby tier. Netlify is interchangeable if you prefer it. |
| VPS | **Hetzner CX22 (4GB)** | Confirmed from the original plan. Enough for Traefik + 2-3 small Spring Boot apps. If you'll run 4+ projects at once, consider CX32. |
| Analytics | **Umami or Plausible, self-hosted** (or none at first) | Google Analytics requires a mandatory cookie banner in Spain/EU. Umami/Plausible are cookieless and can be self-hosted on the Phase 2 VPS, avoiding the cookie notice. |
| Contact form | **Resend or Formspree** (no custom backend) | Avoids standing up a service just for a form. Resend has a solid free tier and a simple API; integrates well with Astro. |

These are default recommendations to keep momentum — any of them can be changed without breaking the rest of the plan.

---

## Phase 1 — Portfolio live on the domain

**Goal of this phase:** have your-domain.com live with your CV, even before the project portal exists.

### 1.1 Domain and DNS
- [x] Decide on the domain name — **`sergiojover.dev`**
- [ ] Buy it via Cloudflare Registrar (or Namecheap if the TLD isn't available there)
- [ ] Move DNS management to Cloudflare (free, even if the domain is registered elsewhere)
- [ ] Enable "Always Use HTTPS" and SSL/TLS mode "Full (strict)" in Cloudflare from the start
- [ ] Verify the domain resolves (even to a blank page)

### 1.2 Building the portfolio
- [ ] Choose stack: **Astro** (recommended), or Next.js if serious interactivity is coming soon
- [ ] Define sections: Hero/intro, About me, Experience (Inetum, etc.), Technical skills, Projects (with links, "coming soon" for now), Contact/downloadable CV
- [ ] Layout and styling (a template you customize is fine)
- [ ] Add a downloadable CV in PDF
- [ ] Basic SEO: per-page `<title>`/meta description, Open Graph/Twitter cards (so it looks good when shared), `sitemap.xml`, `robots.txt`, favicon
- [ ] Contact form (Resend/Formspree), or at least a `mailto:` plus LinkedIn/GitHub links
- [ ] Check minimum accessibility (contrast, image alt text, keyboard navigation) and performance (Lighthouse ≥ 90)

### 1.3 Deployment
- [ ] Create a Vercel account (or Netlify)
- [ ] Connect the portfolio's GitHub repo (automatic deploy on every push)
- [ ] Point the domain (CNAME/A record depending on the provider) at the deployment
- [ ] Verify HTTPS is active (automatic on Vercel/Netlify)
- [ ] If using cookieless analytics (Umami/Plausible), add the tracking script; otherwise leave it for Phase 2 once the VPS exists

**✅ End of Phase 1:** your-domain.com shows your full CV, over HTTPS, with automatic deployment from GitHub, correct basic SEO, and a way to contact you.

---

## Phase 2 — Prepare the portal's foundation (no projects yet)

**Goal of this phase:** have the portal infrastructure ready and proven with a sample container, so adding each real project later is just "follow the template."

### 2.1 Base infrastructure
- [ ] Provision the VPS (Hetzner CX22 or similar; start with 4GB RAM if several Spring Boot apps will run at once)
- [ ] Harden basic security: non-root user, SSH key-only auth, firewall (ufw), fail2ban
- [ ] Install Docker and Docker Compose on the VPS
- [ ] Set up automatic VPS backups (Hetzner snapshots, or `restic`/`borgbackup` to an external bucket) — decide this **before** any project holds real user data (e.g. restaurant reservations)
- [ ] Install basic uptime monitoring (Uptime Kuma in its own container, or an external service like UptimeRobot)

### 2.2 Reverse proxy and subdomains
- [ ] Install Traefik as a reverse proxy
- [ ] Configure Traefik to issue automatic HTTPS certificates via Let's Encrypt
- [ ] Protect the Traefik dashboard (basic auth, or disable it in production — never leave it exposed without a password)
- [ ] Create a wildcard DNS record (`*.your-domain.com`) in Cloudflare pointing to the VPS, so subdomains can be added without touching DNS each time
- [ ] Test with a "hello world" container (e.g. a plain Nginx image) on `test.your-domain.com` to confirm the whole chain (DNS → Traefik → container → HTTPS) works

### 2.3 Reusable template
- [ ] Create a `docker-compose.yml` template with Traefik labels already set up (backend + frontend, plus a database if applicable)
- [ ] Include an environment-variable/secrets pattern in the template (`.env` outside git, or Docker secrets) to avoid leaking credentials into the repo
- [ ] Decide on a deployment strategy: manual (`docker compose pull && up -d` over SSH), or simple CI/CD (a GitHub Actions workflow that SSHes into the VPS on every push to `main`)
- [ ] Document the exact steps for adding a new project in its own README (so it doesn't need to be figured out from scratch each time)

### 2.4 Linking back to the portfolio
- [ ] Add a "Projects" section to the portfolio site with empty/"coming soon" cards, with the visual structure already in place to link out as soon as you deploy the first one

**✅ End of Phase 2:** the VPS runs Docker + Traefik with backups and basic monitoring, a test subdomain responds correctly over HTTPS, and there's a clear template (with secrets handling) for adding any project in minutes.

---

## Phase 3 (future, outline)

Dockerize and deploy each real project following the Phase 2.3 template:

1. Start with an already-finished project as an end-to-end test case for the template.
2. Add the restaurant reservation project once it's ready — it handles real user data, so before publishing it, make sure the following are in place: database backups, and a basic legal notice + privacy policy on the portfolio (mandatory in Spain/EU as soon as personal data is collected, even just a name and phone number).
3. Link each project from the portfolio's "Projects" section (replacing the "coming soon" cards from Phase 1.2/2.4).

---

## Estimated cost notes (approximate)

- Domain: ~€8-15/year depending on the TLD
- Vercel/Netlify (hobby tier): €0
- Cloudflare (DNS + registrar): €0 management fee, cost = domain price
- Hetzner CX22: ~€4-5/month
- Resend (free tier, contact form): €0 up to 3,000 emails/month

Approximate total to have everything running (Phases 1+2): **~€5/month + the domain's annual cost**.
