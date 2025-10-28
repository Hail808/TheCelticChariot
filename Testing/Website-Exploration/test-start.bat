@echo off

echo Starting dev server...
start "Server" /min cmd /k "npm run dev"

echo Starting webhook listener...
start "Webhook" /min cmd /k "..\..\stripe.exe listen --forward-to localhost:3000/api/webhook"

timeout /t 5 /nobreak

echo Running Selenium test...
python ".\test_order.py"

pause