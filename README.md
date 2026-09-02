# 🇦🇷 Artrends

**Qué se dice, se escucha, se ve y se busca en Argentina, en un solo lugar.**

Artrends recolecta y muestra en tiempo real las tendencias de Twitter/X, Google, YouTube, Spotify y los principales portales de noticias argentinos.

🔗 **[artrends.vercel.app](https://artrends.vercel.app)** — sitio en producción

---

## Índice

- [Arquitectura](#arquitectura)
- [Stack](#stack)
- [Estructura del repo](#estructura-del-repo)
- [Desarrollo local](#desarrollo-local)
- [Variables de entorno](#variables-de-entorno)
- [Tests](#tests)
- [CI/CD y scrapers programados](#cicd-y-scrapers-programados)
- [Deploy](#deploy)
- [Licencia](#licencia)

---

## Arquitectura

```
┌─────────────┐      cron (GitHub Actions)      ┌──────────────┐
│   workers    │ ───────────────────────────────▶│  MongoDB     │
│  (scrapers)  │      escribe trends              │  Atlas       │
└─────────────┘                                   └──────┬───────┘
                                                          │ lee
┌─────────────┐        HTTP / REST + Swagger      ┌──────▼───────┐
│  frontend    │ ◀────────────────────────────────│   backend    │
│  (Next.js)   │                                   │  (Fastify)   │
└─────────────┘                                   └──────┬───────┘
                                                          │ cachea
                                                    ┌──────▼───────┐
                                                    │    Redis      │
                                                    │  (Upstash)    │
                                                    └───────────────┘
```

- **`workers`** — jobs de scraping (Playwright + APIs oficiales) que actualizan las tendencias. Corren por *cron* en GitHub Actions, sin necesidad de un proceso siempre activo.
- **`backend`** — API REST (Fastify + TypeScript) que expone las tendencias guardadas en MongoDB, con caché en Redis y documentación Swagger.
- **`frontend`** — sitio público (Next.js, Pages Router) que consume la API y presenta las tendencias.
- **MongoDB Atlas** — persistencia de los datos recolectados.
- **Redis (Upstash)** — caché de respuestas de la API para reducir tiempos y carga sobre Mongo.

## Stack

| Servicio   | Tecnología principal                                      |
| ---------- | ----------------------------------------------------------- |
| `frontend` | Next.js (Pages Router), React, Chakra UI v3, TanStack Query |
| `backend`  | Fastify, TypeScript, TypeBox, Swagger                       |
| `workers`  | TypeScript, Playwright, APIs oficiales (YouTube, Spotify)    |
| Base de datos | MongoDB Atlas                                             |
| Caché      | Redis (Upstash)                                              |
| CI/CD      | GitHub Actions                                               |

## Estructura del repo

```
artrends/
├── frontend/    # Sitio público (Next.js)
├── backend/     # API REST (Fastify)
├── workers/     # Scrapers y jobs de recolección de datos
├── dev-infra/   # Infraestructura efímera para desarrollo local (ver abajo)
└── .github/     # CI (tests) y cron de scrapers
```

## Desarrollo local

No hace falta Docker ni cuentas en la nube para desarrollar: `dev-infra/` levanta una instancia efímera de **MongoDB y Redis en memoria**, la puebla con datos de ejemplo y escribe los `.env` que `backend`/`frontend` necesitan.

> El backend usa herramientas (`ts-node`/`node-dev`) que no son compatibles con Node 24+, por eso `dev-infra/` incluye un binario de **Node 20** propio (`dev-infra/node20/`) para correrlo. No hace falta instalar nada extra: los scripts ya apuntan ahí.

### 1. Infraestructura local (Mongo + Redis + datos de ejemplo)

```bash
cd dev-infra
npm install
node start.js
```

Dejá esta terminal abierta — al cerrarla (`Ctrl+C`) apaga Mongo y Redis. Cada corrida reescribe `backend/.env` y `frontend/.env.local` apuntando a la instancia local.

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

Corre en `http://localhost:3500`. Documentación de la API (Swagger) en `http://localhost:3500/docs`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Corre en `http://localhost:3000`.

### 4. Workers (opcional)

Solo necesario si estás tocando los scrapers. Usan su propio `.env` (ver `workers/.env.example`) y también corren con el Node 20 de `dev-infra/`:

```bash
cd workers
npm install
npm run dev
```

## Variables de entorno

Cada servicio tiene su propio `.env.example` como referencia. Resumen:

| Servicio  | Variables clave                                                                 |
| --------- | -------------------------------------------------------------------------------- |
| `backend` | `DATABASE_CONNECTION_URI`, `REDISHOST`/`REDISPORT`/`REDISPASSWORD`/`REDISTLS`, `DISCORD_BOT_TOKEN` |
| `workers` | `DATABASE_CONNECTION_URI`, URLs de las fuentes a scrapear, `YOUTUBE_API_KEY`      |
| `frontend`| `NEXT_PUBLIC_API_URL`                                                              |

En desarrollo local, `dev-infra/start.js` completa las de Mongo/Redis automáticamente — solo hace falta cargar credenciales propias si vas a tocar `workers` (URLs de scraping, API keys) o el bot de Discord del formulario de contacto.

## Tests

```bash
cd backend && npm test    # Fastify inject() + dobles de caché, sin servicios externos
cd frontend && npm test   # utils puros
```

Ambas suites corren en cada push/PR vía GitHub Actions (`.github/workflows/test.yml`).

## CI/CD y scrapers programados

- **`.github/workflows/test.yml`** — corre los tests de `backend` y `frontend` en cada push/PR.
- **`.github/workflows/scrape.yml`** — dispara cada job de scraping (`google`, `twitter`, `youtube`, `portals`, `spotify-songs-artists`, `spotify-podcasts`) por *cron*, replicando los horarios que antes manejaba un proceso persistente. También puede dispararse manualmente desde la pestaña Actions.

Esto hace que `workers` no necesite un servidor siempre encendido: cada corrida es un job aislado que escribe directo en MongoDB Atlas.

## Deploy

| Servicio   | Proveedor                          |
| ---------- | ----------------------------------- |
| `frontend` | Vercel — auto-deploy en push a `main` |
| `backend`  | Render (free tier, Docker) — se duerme tras 15 min de inactividad |
| `workers`  | GitHub Actions (cron, sin hosting propio) |
| MongoDB    | MongoDB Atlas                        |
| Redis      | Upstash                              |

## Licencia

MIT
