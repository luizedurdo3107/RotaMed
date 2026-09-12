Write-Host "Iniciando RotaMed - Backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$PSScriptRoot\server`"; npm install; npm start"
Start-Sleep -Seconds 2
Write-Host "Iniciando RotaMed - Frontend..." -ForegroundColor Green
npm install
npm run dev
