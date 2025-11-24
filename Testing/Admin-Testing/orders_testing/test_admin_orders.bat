@echo off
echo ============================================================
echo ADMIN ORDERS TESTING
echo ============================================================
echo.
echo Starting dev server...
start "Dev Server" /min cmd /k "npm run dev"
echo.
echo Waiting for server to start...
timeout /t 5 /nobreak
echo.
echo Running Selenium test...
python ".\test_admin_orders.py"
echo.
echo Test completed. Closing dev server...
taskkill /FI "WindowTitle eq Dev Server*" /T /F
echo.
echo Done!
pause