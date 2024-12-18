@echo off
echo Setting up GitHub Pages deployment...

REM Set Git path
set GIT="C:\Program Files\Git\cmd\git.exe"

REM Add all files
%GIT% add .

REM Commit changes
%GIT% commit -m "Setup GitHub Pages deployment"

REM Push to main branch
%GIT% push origin main

echo.
echo Changes pushed to GitHub. Your app will be deployed automatically.
echo Once deployment is complete, your app will be available at:
echo https://sheetal4587.github.io/fsvad/
echo.
echo Please wait a few minutes for the deployment to complete.
pause 