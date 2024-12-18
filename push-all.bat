@echo off
cd C:\Users\madhu\workspace\FinApp
"C:\Program Files\Git\cmd\git.exe" rm -r --cached .
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Push all files including Thumbs.db"
"C:\Program Files\Git\cmd\git.exe" push -f origin main
pause 