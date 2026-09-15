# Infrastructure

Reference copies of what's deployed on the VPS (`116.203.225.167`), plus a
reusable template for adding new projects. This is documentation and a
starting point, not something deployed automatically from this repo — the
actual `docker-compose.yml` files live on the server under `~/traefik` and
`~/apps/<project-name>`.

## Server

- Hetzner CX23 (2 vCPU / 4GB RAM), Ubuntu 24.04, `116.203.225.167`.
- SSH: key-only, non-root user `sergio` (in the `sudo` and `docker` groups).
  Root login and password auth are disabled.
- Firewall: `ufw`, only 22/80/443 open.
- `fail2ban` watching sshd.
- Docker Engine pinned to `28.5.2` via `apt-mark hold` — see the note in
  `traefik/docker-compose.yml`.

## Traefik

`traefik/docker-compose.yml` is the reverse proxy: it terminates HTTPS
(Let's Encrypt, HTTP challenge) for every subdomain of `sergiojover.dev` and
routes to the right container based on Docker labels. Its dashboard is at
`traefik.sergiojover.dev`, behind basic auth.

All containers that should be reachable from the internet must join the
external `web` Docker network (created once with `docker network create
web`) and carry `traefik.enable=true` plus routing labels — see
`project-template/docker-compose.yml`.

DNS: a wildcard `A` record (`*.sergiojover.dev` → `116.203.225.167`) is set
in Cloudflare with the proxy disabled ("DNS only"), so any subdomain works
without touching DNS again.

## Adding a new project

1. On the VPS: `mkdir -p ~/apps/<project-name>`
2. Copy `project-template/docker-compose.yml` and `.env.example` there,
   rename `.env.example` to `.env`, and fill in the real values (registry,
   project name, subdomain, DB credentials). **Never commit `.env`.**
3. Remove the `db` service and the `internal` network from the compose file
   if the project doesn't need a database.
4. Push the project's backend/frontend images to a registry the VPS can
   pull from (e.g. `ghcr.io/jovermprs-dev/<project>-backend`).
5. From `~/apps/<project-name>`: `docker compose pull && docker compose up
   -d`.
6. Visit `https://<subdomain>.sergiojover.dev` — Traefik picks up the new
   container automatically (Docker provider, no restart needed) and
   requests its own Let's Encrypt certificate on first request.

### Deployment strategy

For now: manual, over SSH, as in step 5 above — fine while there's a
single project. Once there's more than one project being updated
regularly, move to a GitHub Actions workflow per project that SSHes into
the VPS and runs the same `pull && up -d` on push to `main`, using a
deploy key restricted to that project's directory.
