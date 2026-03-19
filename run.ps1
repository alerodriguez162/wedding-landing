# Ejecutar todo: instalar, DB y dev server
# Si PowerShell dice "running scripts is disabled", ejecuta una vez:
#   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
# O usa en su lugar:  run.bat

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

# Asegurar que npm esté en el PATH (Node suele instalarse aquí en Windows)
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    $nodePaths = @(
        "C:\Program Files\nodejs",
        "${env:ProgramFiles(x86)}\nodejs",
        "$env:APPDATA\npm",
        "$env:LOCALAPPDATA\Programs\nodejs"
    )
    if ($env:NVM_SYMLINK) { $nodePaths = @($env:NVM_SYMLINK; "$env:NVM_SYMLINK\node_modules\npm\bin") + $nodePaths }
    foreach ($p in $nodePaths) {
        if (Test-Path $p) {
            $env:Path = "$p;$env:Path"
            if (Get-Command npm -ErrorAction SilentlyContinue) { break }
        }
    }
}
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "No se encontró npm/Node.js en el PATH." -ForegroundColor Red
    Write-Host "  - Instala Node.js desde https://nodejs.org (LTS)" -ForegroundColor Yellow
    Write-Host "  - Cierra y vuelve a abrir la terminal, luego ejecuta .\run.ps1 de nuevo" -ForegroundColor Yellow
    exit 1
}

Write-Host "1. Copiando .env..." -ForegroundColor Cyan
if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "   Creado .env desde .env.example. Editalo con tu DATABASE_URL y ADMIN_PASSWORD." -ForegroundColor Yellow
} else {
    Write-Host "   .env ya existe." -ForegroundColor Green
}

Write-Host "2. Instalando dependencias..." -ForegroundColor Cyan
npm install

Write-Host "3. Generando cliente Prisma..." -ForegroundColor Cyan
npx prisma generate

Write-Host "4. Aplicando esquema a la base de datos..." -ForegroundColor Cyan
npx prisma db push

Write-Host "5. Ejecutando seed (datos iniciales)..." -ForegroundColor Cyan
npx prisma db seed

Write-Host "6. Iniciando servidor de desarrollo..." -ForegroundColor Cyan
npm run dev
