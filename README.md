# 🌿 Weed Classifier - AI-Powered Plant Classification

A production-ready web application that uses machine learning to classify weeds vs crops in real-time.

![Made with React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)
![ML Powered](https://img.shields.io/badge/ML-Hugging%20Face-yellow)

## ✨ Features

- 🤖 **Real ML Predictions** - Powered by Hugging Face Vision Transformer
- 🔐 **User Authentication** - Secure sign up/sign in with Supabase
- 📊 **Statistics Dashboard** - Charts, metrics, and analytics
- 📜 **History Tracking** - All predictions saved to cloud database
- 🌓 **Dark Mode** - Beautiful UI with theme persistence
- 📄 **PDF Export** - Download prediction reports
- 📱 **Responsive Design** - Works on desktop and mobile
- ⚡ **Real-time Processing** - Get results in seconds

## 🚀 Quick Start

### 1. Get API Key (2 minutes)
```bash
# Visit https://huggingface.co/settings/tokens
# Create a new token
# Copy it (starts with hf_)
```

### 2. Setup Environment (1 minute)
```bash
cp .env.example .env
# Edit .env and add your Hugging Face API key
```

### 3. Install & Run (2 minutes)
```bash
npm install
npm run dev
```

### 4. Open Browser
```
http://localhost:5173
```

## 📚 Documentation

- **[Quick Start](QUICKSTART.md)** - Get running in 5 minutes
- **[VS Code Setup](README_VSCODE_SETUP.md)** - Detailed setup guide
- **[Integration Guide](INTEGRATION_GUIDE.md)** - Add backend to your app
- **[Step-by-Step](VS_CODE_STEPS.md)** - Visual walkthrough
- **[Complete Summary](COMPLETE_SUMMARY.md)** - Full architecture
- **[Checklist](FINAL_CHECKLIST.md)** - Everything you need

## 🏗️ Tech Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS v4
- Vite (build tool)
- Recharts (visualizations)
- Lucide React (icons)

### Backend
- Supabase (BaaS)
- Edge Functions (Deno)
- PostgreSQL (database)
- Storage (images)
- Auth (JWT)

### ML
- Hugging Face Inference API
- Vision Transformer (ViT)
- Image classification
- Confidence scores

## 📦 Project Structure

```
weed-classifier/
├── src/
│   ├── app/
│   │   ├── App.tsx              # Main application
│   │   └── components/
│   │       └── Auth.tsx         # Authentication UI
│   └── utils/
│       └── supabase/
│           ├── api.ts           # API functions
│           ├── client.ts        # Supabase client
│           └── info.tsx         # Credentials (auto-generated)
├── supabase/
│   └── functions/
│       └── server/
│           └── index.tsx        # Backend with ML
├── .env.example                 # Environment template
└── README.md                    # This file
```

## 🎯 How It Works

```
1. User uploads image
         ↓
2. Sent to Supabase backend
         ↓
3. Backend calls Hugging Face API
         ↓
4. ML model processes image
         ↓
5. Returns prediction + confidence
         ↓
6. Saved to database
         ↓
7. Displayed to user
```

## 🔐 Environment Variables

Create a `.env` file:

```env
HUGGINGFACE_API_KEY=hf_your_key_here
```

**Where to get:**
- Hugging Face: https://huggingface.co/settings/tokens

## 📸 Screenshots

### Sign In Page
Beautiful authentication with gradient background

### Home Page
Drag & drop image upload with feature cards

### Prediction Results
Real-time ML classification with confidence scores

### History Page
Gallery view of all past predictions

### Statistics Dashboard
Charts and metrics for data analysis

## 🧪 Testing

```bash
# Run tests (when added)
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Supabase)
Already deployed! Just add your project credentials.

### Environment Variables
Add these to your hosting platform:
- `HUGGINGFACE_API_KEY`

## 🤝 Contributing

This is a demo project, but feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - feel free to use for your own projects!

## 🆘 Support

**Having issues?**
1. Check the [Quick Start Guide](QUICKSTART.md)
2. Read [VS Code Setup](README_VSCODE_SETUP.md)
3. Review browser console for errors
4. Check server logs in terminal

**Common issues:**
- "Module not found" → Run `npm install`
- Blank screen → Check browser console (F12)
- Mock predictions → Add Hugging Face API key to `.env`
- Auth errors → Clear localStorage and cookies

## 🎓 Learning Resources

This project demonstrates:
- Full-stack TypeScript development
- React Hooks & State Management
- RESTful API design
- Database operations (CRUD)
- File uploads & cloud storage
- External API integration
- ML model inference
- Authentication & Authorization
- Data visualization
- Responsive design

## 🌟 Features Roadmap

- [x] User authentication
- [x] Image upload
- [x] ML predictions
- [x] History tracking
- [x] Statistics dashboard
- [x] Dark mode
- [x] PDF export
- [ ] Batch upload
- [ ] Custom ML models
- [ ] Email notifications
- [ ] Social sharing
- [ ] Mobile app

## 👏 Credits

- **ML Model**: Hugging Face (google/vit-base-patch16-224)
- **Backend**: Supabase
- **Icons**: Lucide React
- **Charts**: Recharts
- **Built with**: React + TypeScript + Vite

## 📧 Contact

For questions or feedback, open an issue on GitHub.

---

**Made with ❤️ and 🤖 by AI-Powered Agriculture**

⭐ Star this repo if you found it helpful!

---

## 🎉 Ready to Start?

```bash
npm install && npm run dev
```

Then open http://localhost:5173 and start classifying! 🚀
