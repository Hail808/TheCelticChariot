@echo off
echo ============================================================
echo DELETE PRODUCT TESTING - Celtic Chariot Admin
echo ============================================================
echo.
echo Starting dev server...
start "Dev Server" /min cmd /k "npm run dev"
echo.
echo Waiting for server to start...
timeout /t 10 /nobreak
echo.
echo Running Delete Product tests...
python -m pytest test_delete_product.py -v -s
echo.
echo Test completed. Closing dev server...
taskkill /FI "WindowTitle eq Dev Server*" /T /F
echo.
echo Done!
pause