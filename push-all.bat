@echo off
cd C:\Users\madhu\workspace\FinApp

REM Clean Git cache
"C:\Program Files\Git\cmd\git.exe" rm -r --cached .

REM Configure Git to track all files
"C:\Program Files\Git\cmd\git.exe" config --global core.safecrlf false
"C:\Program Files\Git\cmd\git.exe" config --global core.autocrlf false

REM Add all files including hidden ones
"C:\Program Files\Git\cmd\git.exe" add -f .
"C:\Program Files\Git\cmd\git.exe" add -f *.db
"C:\Program Files\Git\cmd\git.exe" add -f Thumbs.db

REM Commit and push
"C:\Program Files\Git\cmd\git.exe" commit -m "Push all files including database files"
"C:\Program Files\Git\cmd\git.exe" push -f origin main

echo Repository updated with all files including databases
pause 