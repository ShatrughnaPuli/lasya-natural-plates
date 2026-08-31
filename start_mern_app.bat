@echo off
cd /d "%~dp0"
title Lasya Natural Plates Launcher

echo ==================================================================
echo   Starting Lasya Natural Plates
echo   - Backend Server: http://localhost:5000
echo   - React Frontend: http://localhost:5173
echo ==================================================================
echo.

echo [1/3] Starting Backend API Server...
start "Lasya Backend" cmd /c "cd /d %~dp0server && node server.js"
timeout /t 2 /nobreak >nul

echo [2/3] Starting Frontend Dev Server...
start "Lasya Frontend" cmd /c "cd /d %~dp0client && npm run dev"
timeout /t 3 /nobreak >nul

echo [3/3] Opening browser at http://localhost:5173...
start http://localhost:5173

echo.
echo ==================================================================
echo   Application is running!
echo   Keep the terminal windows open while browsing.
echo ==================================================================
