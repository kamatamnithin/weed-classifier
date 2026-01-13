<#
PowerShell helper to run local Docker Compose and wait for services to come up.
Usage: Open PowerShell as admin and run: .\scripts\run_local_deploy.ps1
#>

param(
  [switch]$Detach
)

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
  Write-Error "Docker CLI not found. Install Docker Desktop and ensure 'docker' is on PATH."
  exit 1
}

# Ensure env file exists
if (-not (Test-Path -Path .env)) {
  Copy-Item .env.example .env -Force
  Write-Host ".env created from .env.example — update it with secrets before running in production."
}

# Bring up services
if ($Detach) {
  docker compose up --build -d
} else {
  docker compose up --build
}

# Wait and validate backend health
Write-Host "Waiting for backend to respond (http://localhost:8001/health)..."
$tries = 0
while ($tries -lt 30) {
  try {
    $resp = curl -s http://localhost:8001/health
    if ($resp -and $resp -match 'ok') {
      Write-Host "Backend healthy: $resp"
      break
    }
  } catch {
    # ignore
  }
  Start-Sleep -Seconds 2
  $tries++
}
if ($tries -ge 30) { Write-Warning "Backend did not become healthy within timeout." }

Write-Host "Check frontend at http://localhost:5000 (or use dev server at http://localhost:5173)."