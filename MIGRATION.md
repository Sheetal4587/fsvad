# Repository Migration Guide

## On the Source Machine (Current Machine)

1. Run the `migrate-repo.bat` script to backup all files:
   ```bash
   .\migrate-repo.bat
   ```

## On the Target Machine (New Machine)

### Prerequisites
1. Install Git from: https://git-scm.com/downloads
2. Install Node.js from: https://nodejs.org/ (LTS version recommended)

### Steps to Migrate

1. Open terminal or command prompt

2. Clone the repository:
   ```bash
   git clone https://github.com/Sheetal4587/fsvad.git
   ```

3. Navigate to the project directory:
   ```bash
   cd fsvad
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start the backend server:
   ```bash
   cd project/server
   npm install
   npm start
   ```

6. In a new terminal, start the frontend:
   ```bash
   cd project
   npm install
   npm run dev
   ```

### Verifying the Migration

1. Open your browser and navigate to: `http://localhost:5173`
2. Check if you can see:
   - Employee list
   - Special day menu
   - All database records

### Troubleshooting

If you encounter any issues:

1. Make sure both backend (port 5001) and frontend (port 5173) servers are running
2. Check if the database files are present in the correct locations
3. Verify Git and Node.js are properly installed
4. Check if all environment variables are set correctly

For any issues, please refer to the main README.md or contact support. 