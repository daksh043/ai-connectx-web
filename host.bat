@echo off
title AI Connect X - Local Network Host
echo ===================================================
echo Starting AI Connect X on Local Network (0.0.0.0)...
echo ===================================================

:: Start Backend
start "AI Connect X - Backend (FastAPI)" cmd /k "cd /d %~dp0backend && .venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8000"

:: Start Frontend
start "AI Connect X - Frontend (Vite)" cmd /k "cd /d %~dp0frontend && npm run dev -- --host 0.0.0.0 --port 5173"

echo.
echo Both servers are launching:
echo   Local:   http://localhost:5173
echo   Network: http://192.168.1.7:5173
echo.
echo Check the newly opened terminal windows for logs.
pause
