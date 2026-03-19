@echo off
cd /d "%~dp0"

echo 1. Copiando .env...
if not exist .env copy .env.example .env

echo 2. Instalando dependencias...
call npm install
if errorlevel 1 goto error

echo 3. Generando cliente Prisma...
call npx prisma generate
if errorlevel 1 goto error

echo 4. Aplicando esquema a la base de datos...
call npx prisma db push
if errorlevel 1 goto error

echo 5. Ejecutando seed...
call npx prisma db seed
if errorlevel 1 goto error

echo 6. Iniciando servidor...
call npm run dev
goto end

:error
echo Error en algun paso. Revisa que tengas Node.js y PostgreSQL configurado.
pause
exit /b 1

:end
pause
