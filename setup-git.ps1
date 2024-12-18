$env:Path += ";C:\Program Files\Git\cmd"

# Configure Git
& 'C:\Program Files\Git\cmd\git.exe' config --global user.name "Sheetal4587"
& 'C:\Program Files\Git\cmd\git.exe' config --global user.email "your.email@example.com"

# Initialize and commit
& 'C:\Program Files\Git\cmd\git.exe' init
& 'C:\Program Files\Git\cmd\git.exe' add .
& 'C:\Program Files\Git\cmd\git.exe' commit -m "Initial commit"

# Set up remote and push
& 'C:\Program Files\Git\cmd\git.exe' remote add origin https://github.com/Sheetal4587/fsvad.git
& 'C:\Program Files\Git\cmd\git.exe' push -u origin master 