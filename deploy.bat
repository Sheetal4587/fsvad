@echo off
echo Preparing for deployment...

REM Set Git path
set GIT="C:\Program Files\Git\cmd\git.exe"

REM Configure Git
%GIT% config --global core.safecrlf false
%GIT% config --global core.autocrlf false

REM Add all files
%GIT% add -f .

REM Commit changes
%GIT% commit -m "Prepare for deployment"

REM Push to GitHub
%GIT% push origin main

REM Create and switch to gh-pages branch
%GIT% checkout -b gh-pages

REM Build the project
cd project
call npm install
call npm run build

REM Move build files to root
xcopy /E /Y dist\* ..\

REM Add and commit build files
cd ..
%GIT% add -f .
%GIT% commit -m "Deploy to GitHub Pages"
%GIT% push -f origin gh-pages

REM Switch back to main branch
%GIT% checkout main

echo Deployment completed.
echo Your app will be available at: https://sheetal4587.github.io/fsvad/
pause 