# Synthèse — Landing site (`te`)

Marketing / landing site for Synthèse, served at **https://synthèse.fr**.

This repo is **not** the actual product. The product (and its backend) lives
in a separate repo, **TE-main**, deployed at **https://app.synthese.fr**. The
landing site only ships:

- A static React/Vite frontend with the marketing pages (Comprendre, Tarification, RGPD, Contact, etc.)
- A thin FastAPI backend that handles the contact form and a few demo features
- A 14-day trial entry flow that hands visitors over to the TE-main app

## How the trial flow works

1. Visitor clicks any "démo" CTA on the landing site.
2. If they already have a trial cookie (`synthese_trial`) with a `resumeUrl`,
   the browser jumps straight to that URL (the TE-main app).
3. Otherwise they land on `/demo`. Clicking **Commencer ma démo gratuite**
   POSTs to `${VITE_TRIAL_API_BASE}/api/auth/start-anonymous-trial` (TE-main),
   stores the returned `access_url` in the cookie, and redirects there.

If the call fails, the user sees **"Load failed · Réessayez dans un instant."**
That almost always means `VITE_TRIAL_API_BASE` was missing at build time and
the frontend tried `http://localhost:8000`.

## Deployment configuration (Railway)

### Project `te` (this repo)

| Variable | Value | Why |
| --- | --- | --- |
| `VITE_TRIAL_API_BASE` | `https://app.synthese.fr` | Build-time. Tells the frontend where to POST trial creations. |

After updating, **trigger a fresh deploy** — Vite bakes env vars into the
JS bundle at build time, so changing the variable without rebuilding does
nothing.

### Project `TE-main` (the app backend)

| Variable | Value | Why |
| --- | --- | --- |
| `ALLOWED_ORIGINS` | `https://synthèse.fr,https://synthese.fr` | CORS allow-list. Both spellings — the IDN form (`synthèse.fr`) and the punycode-equivalent ASCII form (`synthese.fr`) — must be present so the trial POST from the landing site isn't blocked. |

## Local development

```bash
# In one terminal — the landing-site backend
cd backend && uvicorn main:app --reload --port 8001

# In another — the landing-site frontend
cd frontend && npm install && npm run dev

# In a third — the TE-main backend so the trial flow actually works
cd ../TE-main/backend && uvicorn main:app --reload --port 8000
```

For the trial flow in dev, no env var is needed: the fallback in
[`frontend/src/lib/trialApi.ts`](frontend/src/lib/trialApi.ts) is
`http://localhost:8000`, which matches the TE-main dev port.

See [`frontend/.env.example`](frontend/.env.example) for the full list of
build-time env vars consumed by the frontend.
