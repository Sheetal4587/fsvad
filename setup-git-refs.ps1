# Clean up any existing Git configuration
Remove-Item -Force -Recurse -ErrorAction SilentlyContinue .git/

# Initialize new repository
& 'C:\Program Files\Git\cmd\git.exe' init

# Configure default branch name
& 'C:\Program Files\Git\cmd\git.exe' config --global init.defaultBranch main

# Create and switch to main branch
& 'C:\Program Files\Git\cmd\git.exe' branch -M main

# Set up initial commit
& 'C:\Program Files\Git\cmd\git.exe' add .
& 'C:\Program Files\Git\cmd\git.exe' commit -m "Initial commit"

# Remove existing remote if any
& 'C:\Program Files\Git\cmd\git.exe' remote remove origin

# Add remote and fetch
& 'C:\Program Files\Git\cmd\git.exe' remote add origin https://github.com/Sheetal4587/fsvad.git
& 'C:\Program Files\Git\cmd\git.exe' fetch origin

# Configure branch tracking
& 'C:\Program Files\Git\cmd\git.exe' config --local branch.main.remote origin
& 'C:\Program Files\Git\cmd\git.exe' config --local branch.main.merge refs/heads/main

# Set up symbolic references properly
& 'C:\Program Files\Git\cmd\git.exe' symbolic-ref HEAD refs/heads/main
& 'C:\Program Files\Git\cmd\git.exe' symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/main

# Create the remote tracking branch
New-Item -ItemType Directory -Force -Path .git/refs/remotes/origin
Set-Content -Path .git/refs/remotes/origin/main -Value (& 'C:\Program Files\Git\cmd\git.exe' rev-parse HEAD)

# Force push to ensure clean state
& 'C:\Program Files\Git\cmd\git.exe' push -u origin main --force

Write-Host "Git repository has been properly initialized with main branch as default and all references configured."