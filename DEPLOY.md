Deployment (local with Docker Compose)

Overview
- This project includes two services: the React frontend and a FastAPI ML backend.
- `docker-compose.yml` builds both images and runs them locally.

Preflight
1. Install Docker Desktop (Windows) and ensure `docker` and `docker-compose` are available.
2. Copy `.env.example` to `.env` and fill required variables:
   - `ML_API_KEY` (optional for dev)
   - `VITE_API_URL` (not required for local compose; compose sets it)
   - Supabase keys if you want full auth integration

Build and run locally

```powershell
# From the repo root
copy .env.example .env   # Windows PowerShell
# Edit .env and set ML_API_KEY if you want API key protection

docker-compose up --build
```

Services (defaults)
- Frontend: http://localhost:5000
- Backend (FastAPI): http://localhost:8001

Notes
- The frontend is built during the Docker build; `VITE_API_URL` must point to the backend URL used at runtime. `docker-compose.yml` sets the runtime env pointing to `http://localhost:8001`, but inside the docker network the backend service is reachable at `http://backend:8000` if you rebuild with that env.
- To run production with a remote backend, set `VITE_API_URL` to the backend endpoint before building the frontend image.

CI/CD
- Recommended: build and push images to GitHub Container Registry, then deploy to Render/Azure/etc.
- If you want, I can add a GitHub Actions workflow to build and push images automatically.

GitHub Container Registry (GHCR) guide

1. Create a Personal Access Token (PAT) with `write:packages` scope, or create a repository `GHCR_TOKEN` secret.
2. In GitHub repository Settings → Secrets → Actions, add:
   - `GHCR_TOKEN` — your registry PAT (or use package write permission with `GITHUB_TOKEN`).
3. The included workflow `.github/workflows/build-and-push.yml` will build both images and push to GHCR on push to `main`.

After pushing images you can deploy them to any host (Render, Azure, etc.) by referencing the image URIs:

```
ghcr.io/<your-org-or-username>/weed-frontend:latest
ghcr.io/<your-org-or-username>/weed-backend:latest
```

Render / Deployment (example)

- On Render you can create two services (Web Service for frontend and Web Service for backend) and set the image to the GHCR URI above. Provide `ML_API_KEY` and any Supabase secrets as environment variables in the Render dashboard.

If you want, I can also add a workflow step to call Render's deploy API automatically after images are pushed (requires `RENDER_SERVICE_ID` and `RENDER_API_KEY` repository secrets).

Troubleshooting
- If ports 5000 or 8001 are in use, stop the processes or change the port mappings in `docker-compose.yml`.
- If the frontend shows stale content, rebuild with `docker-compose build --no-cache frontend`.
