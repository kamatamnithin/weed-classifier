<#
Quick local validation script to test API endpoints against running services.
Usage: .\scripts\validate_local.ps1
#>

# Backend health
try {
  $health = curl -s http://localhost:8001/health
  Write-Host "Backend /health response: $health"
} catch {
  Write-Warning "Failed to reach backend /health"
}

# Example predict using sample image if present
$sample = "ml_backend/data/Fat Hen/1.png"
if (Test-Path $sample) {
  Write-Host "Running sample predict with $sample"
  $multipart = @{
    file = Get-Item $sample
  }
  $result = Invoke-RestMethod -Uri http://localhost:8001/predict -Method Post -Form $multipart -ContentType 'multipart/form-data' -ErrorAction SilentlyContinue
  if ($result) { Write-Host "Predict response: $($result | ConvertTo-Json)" } else { Write-Warning "Predict failed or returned no output" }
} else {
  Write-Host "No sample image found at $sample — skip predict test"
}