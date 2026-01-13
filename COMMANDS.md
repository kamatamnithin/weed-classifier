# 📝 Command Sheet - Quick Reference

## 🚀 Essential Commands

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Stop Server
```
Press Ctrl+C in terminal
```

---

## 📂 File Commands

### Backup Your App
```bash
cp src/app/App.tsx src/app/App.BACKUP.tsx
```

### Create .env File
```bash
cp .env.example .env
```

### Make Setup Script Executable (Mac/Linux)
```bash
chmod +x setup.sh
./setup.sh
```

---

## 🔍 Debugging Commands

### Check Node Version
```bash
node --version
# Should be v18 or higher
```

### Check npm Version
```bash
npm --version
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Everything
```bash
rm -rf node_modules package-lock.json
npm install
```

### Install with Legacy Peer Deps (if errors)
```bash
npm install --legacy-peer-deps
```

### Kill Port 5173
```bash
# Mac/Linux
npx kill-port 5173

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

---

## 🌐 Browser Commands

### Open Development Server
```
http://localhost:5173
```

### Open Developer Console
```
Press F12
or
Ctrl+Shift+I (Windows/Linux)
Cmd+Option+I (Mac)
```

### Clear Browser Cache
```
Ctrl+Shift+Delete (Windows/Linux)
Cmd+Shift+Delete (Mac)
```

### Hard Refresh
```
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

---

## 📝 Git Commands (Optional)

### Initialize Git
```bash
git init
```

### Add All Files
```bash
git add .
```

### Commit Changes
```bash
git commit -m "Initial commit"
```

### Create .gitignore (already exists)
```bash
# .env is already in .gitignore - good!
```

---

## 🔐 Environment Commands

### Check if .env Exists
```bash
# Mac/Linux
ls -la .env

# Windows
dir .env
```

### View .env Contents (careful!)
```bash
# Mac/Linux
cat .env

# Windows
type .env
```

### Verify API Key Format
```bash
# Should see something like:
# HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxx
```

---

## 🧪 Testing Commands

### Test Server is Running
```bash
curl http://localhost:5173
```

### Check Open Ports
```bash
# Mac/Linux
lsof -i :5173

# Windows
netstat -ano | findstr :5173
```

---

## 📦 Package Commands

### List Installed Packages
```bash
npm list --depth=0
```

### Check for Updates
```bash
npm outdated
```

### Install Specific Package
```bash
npm install package-name
```

### Uninstall Package
```bash
npm uninstall package-name
```

---

## 🔧 VS Code Commands

### Open in VS Code
```bash
code .
```

### Open Specific File
```bash
code src/app/App.tsx
```

### Format Code (in VS Code)
```
Shift+Alt+F (Windows/Linux)
Shift+Option+F (Mac)
```

---

## 📊 Project Info Commands

### Count Lines of Code
```bash
# Mac/Linux
find src -name '*.tsx' -o -name '*.ts' | xargs wc -l

# Windows
# Use VS Code extension or manual count
```

### Check Project Size
```bash
# Mac/Linux
du -sh .

# Windows
dir /s
```

### List All React Components
```bash
# Mac/Linux
find src -name '*.tsx' -type f

# Windows
dir /s /b *.tsx
```

---

## 🆘 Troubleshooting Commands

### If Port is Busy
```bash
npx kill-port 5173
npm run dev
```

### If Packages Won't Install
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### If TypeScript Errors
```bash
npm install --save-dev typescript @types/react @types/react-dom
```

### If Vite Won't Start
```bash
rm -rf node_modules/.vite
npm run dev
```

---

## 📱 Localhost Variations

### Access from Other Devices (same network)
```bash
# Start with host flag
npm run dev -- --host

# Then access from phone/tablet:
# http://YOUR_IP:5173
# Example: http://192.168.1.100:5173
```

### Use Different Port
```bash
npm run dev -- --port 3000
# Then open http://localhost:3000
```

---

## 🎯 Quick Workflow

### Daily Development
```bash
# 1. Start
npm run dev

# 2. Code in VS Code
# Make changes to src/app/App.tsx

# 3. Browser auto-refreshes
# No need to restart

# 4. Stop when done
# Ctrl+C
```

### After Changing .env
```bash
# 1. Stop server (Ctrl+C)
# 2. Restart
npm run dev
```

### After Installing Package
```bash
# No restart needed!
# Vite handles it automatically
```

---

## 🔥 Emergency Reset

### Nuclear Option (if everything breaks)
```bash
# 1. Stop server
# Ctrl+C

# 2. Delete everything
rm -rf node_modules package-lock.json .vite

# 3. Reinstall
npm install

# 4. Restart
npm run dev
```

---

## ✅ Verification Commands

### Check Everything is Working
```bash
# 1. Node installed?
node --version

# 2. Dependencies installed?
ls node_modules

# 3. .env exists?
cat .env

# 4. Server can start?
npm run dev

# 5. Browser opens?
# http://localhost:5173
```

---

## 📝 Log Files

### View Server Logs
```
# They appear in the same terminal where you ran:
npm run dev
```

### View Browser Logs
```
# Open browser console (F12)
# Click "Console" tab
```

---

## 🎨 UI Development Commands

### Watch for Changes
```bash
# Vite watches automatically
# Just save file and browser refreshes
```

### Clear Vite Cache
```bash
rm -rf node_modules/.vite
```

---

## 🚀 Quick Reference

**Most Used:**
```bash
npm install          # First time setup
npm run dev          # Start development
Ctrl+C               # Stop server
F12                  # Open browser console
```

**If Issues:**
```bash
npx kill-port 5173              # Port busy
npm cache clean --force         # Cache issues
rm -rf node_modules && npm i    # Nuclear option
```

**Check Status:**
```bash
node --version       # Node installed?
cat .env            # API key set?
ls src/app          # Files exist?
```

---

Save this file for quick reference! 📌
