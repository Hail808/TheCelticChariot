@echo off

echo Starting dev server...
start "Server" /min cmd /k "npm run dev"

timeout /t 2 /nobreak

echo Running Selenium test...
python ".\test_image_upload.py"

pause
