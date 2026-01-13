# ⚡ Quick Start Checklist

## Before You Start

Make sure you have:
- [ ] Node.js v18+ installed
- [ ] VS Code installed
- [ ] Hugging Face account (free)

## 5-Minute Setup

### 1️⃣ Get Your API Key (2 min)

1. Go to https://huggingface.co/settings/tokens
2. Click "New token"
3. Name it "weed-classifier"
4. Click "Generate"
5. Copy the token (starts with `hf_`)

### 2️⃣ Create .env File (1 min)

```bash
# In project root
cp .env.example .env
```

Edit `.env` and paste your key:
```env
HUGGINGFACE_API_KEY=hf_paste_your_key_here
```

### 3️⃣ Install & Run (2 min)

```bash
npm install
npm run dev
```

Open http://localhost:5173

## What You'll See

1. **Sign In/Sign Up Page** 
   - Create an account or sign in
   
2. **Home Page**
   - Upload an image (drag & drop or click)
   - Get ML prediction (Weed or Crop)
   
3. **History Page**
   - See all your past predictions
   
4. **Stats Page**
   - View charts and statistics
   
5. **About Page**
   - Learn about the technology

## Complete Integration Steps

### If Using AppBackend.tsx:

1. **Backup original**:
   ```bash
   cp src/app/App.tsx src/app/App.original.tsx
   ```

2. **Copy page components** from `App.original.tsx` to `AppBackend.tsx`:
   - PredictionPage
   - AboutPage
   - HistoryPage
   - StatsPage
   - ComparePage

3. **Add Sign Out button** to each page header

4. **Rename**:
   ```bash
   mv src/app/AppBackend.tsx src/app/App.tsx
   ```

### If Adding Auth to Existing App.tsx:

Follow steps in `INTEGRATION_GUIDE.md`

## Files Checklist

- [ ] `.env` created with your API key
- [ ] `node_modules/` installed
- [ ] Can run `npm run dev` successfully
- [ ] See sign in page at localhost:5173
- [ ] Can create account
- [ ] Can upload image
- [ ] Can sign out

## Common Issues

### "Cannot find module"
```bash
npm install
```

### "Unauthorized" error
- Check `.env` file exists
- Check API key is correct
- Restart dev server

### Page shows blank
- Check browser console (F12)
- Make sure React app is running
- Clear browser cache

### ML predictions not working
- Verify HuggingFace API key
- Check internet connection
- App falls back to mock if API fails

## Test Your Setup

1. Sign up with test email: `test@example.com`
2. Upload any plant image
3. Should see prediction in ~2-3 seconds
4. Check History page - prediction saved
5. Check Stats page - shows in chart
6. Click Sign Out - back to auth page

## Project Structure Quick Ref

```
weed-classifier/
├── .env                    ← YOUR API KEY HERE
├── src/
│   ├── app/
│   │   ├── App.tsx        ← Main app
│   │   └── components/
│   │       └── Auth.tsx   ← Sign in/up
│   └── utils/
│       └── supabase/
│           ├── api.ts     ← Backend calls
│           └── client.ts  ← Supabase setup
└── supabase/
    └── functions/
        └── server/
            └── index.tsx  ← ML backend
```

## Next Steps

1. ✅ Get app running
2. ✅ Test all features
3. ✅ Customize UI (optional)
4. ✅ Deploy to production

## Production Deployment

For deploying to the web, you'll need:
- Deploy backend to Supabase
- Deploy frontend to Vercel/Netlify
- Add environment variables to hosting platform

## Need More Details?

- Setup Guide: `README_VSCODE_SETUP.md`
- Integration: `INTEGRATION_GUIDE.md`
- Code Examples: Check `src/app/AppBackend.tsx`

---

**Ready?** Run `npm run dev` and let's go! 🚀
