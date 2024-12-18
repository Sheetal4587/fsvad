@echo off
echo Starting repository migration process...

REM Set Git path
set GIT="C:\Program Files\Git\cmd\git.exe"

REM Add all files including database
%GIT% add -f .
%GIT% add -f *.db
%GIT% add -f Thumbs.db

REM Commit changes
%GIT% commit -m "Full repository backup for migration"

REM Push to remote
%GIT% push -f origin main

echo Migration backup completed.
echo.
echo To migrate to another machine:
echo 1. Install Git on the new machine
echo 2. Open terminal/command prompt
echo 3. Run: git clone https://github.com/Sheetal4587/fsvad.git
echo 4. Run: cd fsvad
echo 5. Run: npm install
echo.
pause 