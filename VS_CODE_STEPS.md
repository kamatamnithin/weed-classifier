# 📸 Visual Step-by-Step Guide for VS Code

## 🎯 Goal
Get your Weed Classifier app running with real ML predictions in VS Code

---

## Step 1: Export from Figma Make

### In Figma Make:
1. Click "Export" button
2. Download ZIP file
3. Extract to a folder (e.g., `weed-classifier`)

### You should have:
```
weed-classifier/
├── src/
├── supabase/
├── package.json
├── .env.example
├── README_VSCODE_SETUP.md
└── ... other files
```

---

## Step 2: Open in VS Code

### Open VS Code:
1. File → Open Folder
2. Select `weed-classifier` folder
3. Trust the folder when prompted

### You should see:
```
EXPLORER
└── weed-classifier
    ├── src
    ├── supabase
    ├── .env.example
    └── package.json
```

---

## Step 3: Create .env File

### In VS Code:
1. Right-click on `.env.example`
2. Select "Duplicate"
3. Rename to `.env`

### Edit .env file:
```env
# Change this line:
HUGGINGFACE_API_KEY=hf_your_key_here

# To your actual key:
HUGGINGFACE_API_KEY=hf_YourActualKeyGoesHere
```

### Where to get the key:
1. Open browser → https://huggingface.co/settings/tokens
2. Click "New token"
3. Copy the token (starts with `hf_`)
4. Paste in `.env`

---

## Step 4: Open Terminal in VS Code

### Method 1:
- Press `` Ctrl + ` `` (backtick)

### Method 2:
- Menu: Terminal → New Terminal

### You should see:
```
PS C:\Users\YourName\weed-classifier>
```
or
```
user@computer:~/weed-classifier$
```

---

## Step 5: Install Dependencies

### In Terminal, type:
```bash
npm install
```

### Press Enter and wait...

### You should see:
```
added 234 packages, and audited 235 packages in 45s
```

### If you see errors:
- Make sure Node.js is installed
- Check internet connection
- Try: `npm install --legacy-peer-deps`

---

## Step 6: Integration Choice

### Option A: Quick Test (Run as-is)
Your current `App.tsx` will work, but uses mock predictions.

Skip to Step 8 to test immediately.

### Option B: Add Real Backend (Recommended)

Follow these sub-steps:

#### 6.1: Backup Original App
```bash
cp src/app/App.tsx src/app/App.original.tsx
```

#### 6.2: Open Two Files
- Left side: `src/app/App.original.tsx`
- Right side: `src/app/AppBackend.tsx`

#### 6.3: Copy Page Components
From `App.original.tsx`, copy these ENTIRE functions to `AppBackend.tsx`:

1. Find `function PredictionPage(...)` → Copy entire function
2. Find `function AboutPage(...)` → Copy entire function
3. Find `function HistoryPage(...)` → Copy entire function
4. Find `function StatsPage(...)` → Copy entire function
5. Find `function ComparePage(...)` → Copy entire function

Paste each one into `AppBackend.tsx`, replacing the placeholder versions.

#### 6.4: Add Sign Out to Each Page
In EACH page's header (after the theme toggle button), add:

```tsx
{userEmail && (
  <div className="flex items-center gap-2 pl-4 border-l border-gray-200 dark:border-gray-700">
    <span className="text-sm text-gray-600 dark:text-gray-400">{userEmail}</span>
    <button
      onClick={onSignOut}
      className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
    >
      <LogOut className="size-4" />
      Sign Out
    </button>
  </div>
)}
```

#### 6.5: Rename File
```bash
mv src/app/AppBackend.tsx src/app/App.tsx
```

---

## Step 7: Verify Integration

### Check that App.tsx has:
- [ ] `import { Auth } from './components/Auth';` at top
- [ ] `const [session, setSession] = useState<Session | null>(null);`
- [ ] `if (!session) return <Auth onAuthSuccess={checkSession} />;`
- [ ] All 5 page components fully implemented
- [ ] Sign Out button in each page header

---

## Step 8: Run Development Server

### In Terminal:
```bash
npm run dev
```

### You should see:
```
  VITE v6.3.5  ready in 543 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

## Step 9: Open in Browser

### Click the link or open manually:
```
http://localhost:5173
```

### You should see:
- Sign In / Sign Up page
- Green leaf logo
- Beautiful gradient background

---

## Step 10: Test the App

### 1. Sign Up
- Enter email: `test@example.com`
- Enter password: `test1234`
- Enter name: `Test User`
- Click "Create Account"

### 2. Upload Image
- Drag & drop any image
- OR click "Choose Image"
- Select a plant image

### 3. View Result
- Wait 2-3 seconds
- See prediction: "Weed" or "Crop"
- See confidence score: e.g., "87%"

### 4. Check History
- Click "History" in header
- See your prediction saved

### 5. View Stats
- Click "Stats" in header
- See charts and metrics

### 6. Sign Out
- Click "Sign Out" in header
- Back to login page

---

## 🎉 Success Indicators

✅ App runs without errors
✅ Can sign up/sign in
✅ Can upload images
✅ See ML predictions (not mock)
✅ History saves to server
✅ Stats page works
✅ Can sign out

---

## ❌ Common Issues & Fixes

### Issue: "npm: command not found"
**Fix**: Install Node.js from https://nodejs.org

### Issue: Port 5173 already in use
**Fix**: 
```bash
# Kill existing process
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

### Issue: Module not found errors
**Fix**:
```bash
rm -rf node_modules
npm install
```

### Issue: Blank white screen
**Fix**:
1. Open browser console (F12)
2. Check for React errors
3. Make sure imports are correct
4. Restart dev server

### Issue: "Unauthorized" after login
**Fix**:
1. Check `.env` file exists
2. Verify API key is correct
3. Clear browser cache
4. Sign out and sign in again

### Issue: Predictions are mock data
**Fix**:
1. Verify `.env` has `HUGGINGFACE_API_KEY=hf_...`
2. Check key is valid at huggingface.co
3. Restart server: `Ctrl+C` then `npm run dev`

---

## 🔍 Viewing Logs

### Frontend Errors:
- Open Browser Console: `F12` or `Ctrl+Shift+I`
- Click "Console" tab
- Red text = errors

### Backend Errors:
- Look in VS Code terminal
- Server logs appear below your code
- Red text = errors

---

## 📂 File Structure Reference

```
weed-classifier/
├── .env                         ← YOUR API KEY (created by you)
├── .env.example                 ← Template
├── .gitignore                   ← Security
├── package.json                 ← Dependencies
├── README_VSCODE_SETUP.md       ← Full setup guide
├── QUICKSTART.md                ← 5-minute guide
├── INTEGRATION_GUIDE.md         ← Integration steps
├── VS_CODE_STEPS.md             ← This file
├── src/
│   ├── app/
│   │   ├── App.tsx             ← Main app (you edit this)
│   │   ├── App.original.tsx    ← Backup (created by you)
│   │   ├── AppBackend.tsx      ← Template with auth
│   │   └── components/
│   │       └── Auth.tsx        ← Sign in/up UI
│   ├── utils/
│   │   └── supabase/
│   │       ├── api.ts          ← Backend functions
│   │       ├── client.ts       ← Supabase setup
│   │       └── info.tsx        ← Auto-generated (don't edit)
│   └── styles/
└── supabase/
    └── functions/
        └── server/
            ├── index.tsx        ← ML backend
            └── kv_store.tsx     ← Database (don't edit)
```

---

## 🎓 What's Happening Behind the Scenes

### When you upload an image:

1. **Browser** → Reads file, converts to base64
2. **React App** → Sends to backend via API call
3. **Backend Server** → Receives image data
4. **Hugging Face API** → Processes with ML model
5. **Backend** → Returns prediction + confidence
6. **Database** → Saves prediction record
7. **React App** → Shows result to user
8. **History** → Updated with new prediction

---

## ✨ Tips for Development

### Auto-Reload
Changes to React files auto-reload browser

### Prettier
Install VS Code extension for auto-formatting

### ESLint
Install VS Code extension for error checking

### Git
```bash
git init
git add .
git commit -m "Initial commit"
```

### Stop Server
Press `Ctrl+C` in terminal

### Restart Server
```bash
npm run dev
```

---

## 🚀 Ready to Deploy?

Once working locally:
1. Push to GitHub
2. Deploy frontend to Vercel/Netlify
3. Backend already on Supabase
4. Add environment variables to hosting

---

## 📞 Need Help?

1. Read QUICKSTART.md
2. Check INTEGRATION_GUIDE.md
3. Read COMPLETE_SUMMARY.md
4. Check browser console
5. Check terminal output

---

**You've got this! 💪**

Just follow the steps above and you'll have a working ML app in minutes!
