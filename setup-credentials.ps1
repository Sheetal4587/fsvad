# Set Git global configurations
& 'C:\Program Files\Git\cmd\git.exe' config --global user.name "Sheetal4587"
& 'C:\Program Files\Git\cmd\git.exe' config --global user.email "nandargimadhu@gmail.com"

# Configure credential helper
& 'C:\Program Files\Git\cmd\git.exe' config --global credential.helper manager
& 'C:\Program Files\Git\cmd\git.exe' config --global credential.https://github.com.username Sheetal4587

# Store GitHub credentials in Windows Credential Manager
# Replace YOUR_TOKEN with your actual GitHub token when running the script
$token = Read-Host -Prompt "Enter your GitHub token" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
$tokenText = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
cmdkey /generic:LegacyGeneric:target=git:https://github.com /user:Sheetal4587 /pass:$tokenText

# Configure Git to use HTTPS with credentials
& 'C:\Program Files\Git\cmd\git.exe' config --global url."https://Sheetal4587@github.com".insteadOf "https://github.com"

# Clean up sensitive data from memory
Remove-Variable -Name token
Remove-Variable -Name BSTR
Remove-Variable -Name tokenText

Write-Host "Git credentials have been configured globally. You can now use Git commands without re-entering credentials." 