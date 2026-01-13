# 🔄 Quick Integration Guide

## What You Have Now

✅ **Backend Server** - `/supabase/functions/server/index.tsx`
  - ML predictions via Hugging Face
  - User authentication
  - Database storage
  - Image uploads

✅ **API Layer** - `/src/utils/supabase/api.ts`
  - All backend functions wrapped

✅ **Auth Component** - `/src/app/components/Auth.tsx`
  - Beautiful sign in/up UI

✅ **Original App** - `/src/app/App.tsx`
  - All pages fully implemented (Home, History, Stats, About, Compare)
  - Complete UI/UX

✅ **Backend Template** - `/src/app/AppBackend.tsx`
  - Authentication logic
  - Backend integration
  - BUT: Placeholder page components

## What You Need To Do

### Option 1: Copy Pages to AppBackend.tsx (Recommended)

1. Open both files side-by-side in VS Code
2. From `App.tsx` copy these functions to `AppBackend.tsx`:
   - `PredictionPage` (entire function)
   - `AboutPage` (entire function)
   - `HistoryPage` (entire function)
   - `StatsPage` (entire function)
   - `ComparePage` (entire function)

3. For EACH page, add this to the props interface:
   ```tsx
   onSignOut: () => void;
   userEmail?: string;
   ```

4. For EACH page header, add Sign Out button after theme toggle:
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

5. Add LogOut icon import at top:
   ```tsx
   import { ..., LogOut } from 'lucide-react';
   ```

6. Rename `AppBackend.tsx` to `App.tsx` (backup original first!)

### Option 2: Add Auth to Existing App.tsx

Add these changes to your current `App.tsx`:

**1. Add imports:**
```tsx
import { Auth } from './components/Auth';
import { getSession, signOut, getPrediction, savePrediction, getPredictionHistory } from '../utils/supabase/api';
import type { Session } from '@supabase/supabase-js';
import { LogOut } from 'lucide-react';
```

**2. Add state:**
```tsx
const [session, setSession] = useState<Session | null>(null);
const [authLoading, setAuthLoading] = useState(true);
```

**3. Add session check:**
```tsx
useEffect(() => {
  checkSession();
}, []);

const checkSession = async () => {
  const currentSession = await getSession();
  setSession(currentSession);
  setAuthLoading(false);
  if (currentSession) {
    loadHistory();
  }
};
```

**4. Update handleImageFile to use real API:**
Replace the setTimeout mock with:
```tsx
const predictionData = await getPrediction(
  imageDataUrl, 
  file.name, 
  session.access_token
);

await savePrediction({
  prediction: newResult.prediction,
  confidence: newResult.confidence,
  imageName: newResult.imageName,
  timestamp: newResult.timestamp
}, session.access_token);
```

**5. Add auth check before render:**
```tsx
if (authLoading) {
  return <div>Loading...</div>;
}

if (!session) {
  return <Auth onAuthSuccess={checkSession} />;
}
```

**6. Add Sign Out button to all page headers**

**7. Add signOut handler:**
```tsx
const handleSignOut = async () => {
  await signOut();
  setSession(null);
  setHistory([]);
  setCurrentPage('landing');
};
```

## Environment Variables

Create `.env`:
```env
HUGGINGFACE_API_KEY=hf_your_key_here
```

Get key from: https://huggingface.co/settings/tokens

## Testing Checklist

- [ ] Sign up with new account
- [ ] Sign in works
- [ ] Upload image shows prediction
- [ ] History saves to server
- [ ] Statistics load correctly
- [ ] Sign out works
- [ ] Dark mode persists
- [ ] PDF export works
- [ ] All pages accessible

## Files You Should NOT Edit

❌ `/supabase/functions/server/kv_store.tsx`
❌ `/utils/supabase/info.tsx` (auto-generated)
❌ `.env` (don't commit this!)

## Files You CAN Edit

✅ `/src/app/App.tsx` - Your main app
✅ `/src/app/components/Auth.tsx` - Sign in/up UI
✅ `/src/utils/supabase/api.ts` - API functions
✅ `/supabase/functions/server/index.tsx` - Backend logic

## Quick Commands

```bash
# Install packages
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Architecture Diagram

```
User Browser
    ↓
React App (App.tsx)
    ↓
API Layer (api.ts)
    ↓
Supabase Server (/supabase/functions/server/index.tsx)
    ↓
- Supabase Auth (login/signup)
- Supabase Storage (images)
- Supabase KV Store (predictions)
- Hugging Face API (ML predictions)
```

## Need More Help?

Check `README_VSCODE_SETUP.md` for detailed setup instructions!
