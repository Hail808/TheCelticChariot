@echo off
echo ============================================================
echo USER DASHBOARD AND SETTINGS TEST
echo ============================================================
echo.
echo Starting dev server...
start "Dev Server" /min cmd /k "npm run dev"
echo.
echo Waiting for server to start...
timeout /t 5 /nobreak
echo.
echo Running Selenium test...
python ".\test_userdashboard.py"
echo.
echo Test completed. Closing dev server...
taskkill /FI "WindowTitle eq Dev Server*" /T /F
echo.
echo Done!
pause