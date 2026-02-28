# 🐯 Lingulu — Frontend Application

This module is the main user interface for Lingulu.

It connects:
- Users
- Backend API service
- Machine Learning pronunciation evaluation
- Authentication system
- Dashboard & learning modules

The frontend is responsible for handling user interaction, voice recording UI, displaying pronunciation feedback, and managing the overall learning experience.

---

## 🎯 Responsibilities

The frontend handles:
- User authentication (login / register)
- Voice recording interface
- Sending audio to backend API
- Displaying pronunciation scores & feedback
- Rendering lessons and AI conversation modules
- Showing leaderboard and user progress
- Managing protected routes
- Multi-language interface support (i18n)

---

## 🏗️ Architecture Flow

```pgsql
User interacts with UI
↓
React Components (Pages + Feature Modules)
↓
Auth Context / Hooks
↓
API Service Layer (Axios)
↓
Backend API
↓
Receive JSON response
↓
Render UI updates
```

---

## 🛠️ Tech Stack

- React (TypeScript)
- Vite
- TailwindCSS
- Axios
- React Router
- Context API (AuthProvider)
- i18n (Internationalization)
- ESLint

---

## ⚙️ Installation

**Requirements**
- Node.js 18+
- npm or yarn

Install dependencies

```bash
npm install
```

---

## ▶️ Running the Application

```bash
npm run dev
```

Application runs on:

```arduino
http://localhost:5173
```

---

## 📦 Production Build

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## 🚀 Deployment to Vercel

### 📋 Prerequisites

Before deploying this frontend application, ensure the following services are already deployed and running:

1. **Backend Core API** - [lingulu-backend-core](https://github.com/Mario-Benedict/lingulu-backend-core/)
   - This is the main backend service that handles authentication, user data, lessons, and business logic
   - Must be deployed and accessible via HTTPS
   - Note the deployed URL (e.g., `https://your-backend-api.com`)

2. **Machine Learning Service** - [lingulu-machine-learning](https://github.com/Mario-Benedict/lingulu-machine-learning)
   - This service handles pronunciation evaluation and AI conversation features
   - Must be deployed and accessible via HTTPS
   - Note the deployed URL (e.g., `https://your-ml-service.com`)

> ⚠️ **Important**: Without these services running, the frontend will not function properly as it depends on them for core features.

---

### 📝 Deployment Steps

#### 1. Import Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select or authenticate your GitHub account
5. Search for and select the `lingulu-frontend` repository
6. Click **"Import"**

#### 2. Configure Project Settings

When prompted with the project configuration screen:

**Framework Preset**: Vercel should auto-detect **Vite**

**Root Directory**: `.` (leave as default)

**Build Command**: 
```bash
npm run build
```

**Output Directory**: 
```
dist
```

**Install Command**:
```bash
npm install
```

#### 3. Configure Environment Variables

Add the following environment variables in the **"Environment Variables"** section:

| Variable Name | Description | Example Value |
|---------------|-------------|---------------|
| `VITE_BASE_API_URL` | URL of the deployed backend core API | `https://your-backend-api.com` |
| `VITE_MODEL_API_URL` | URL of the deployed ML service | `https://your-ml-service.com` |
| `VITE_API_TIMEOUT` | API request timeout in milliseconds (optional) | `30000` |

**How to add:**
1. In the Environment Variables section, enter the variable name
2. Enter the corresponding value
3. Select environment: **Production**, **Preview**, and **Development** (check all three)
4. Click **"Add"**
5. Repeat for each variable

> 💡 **Tip**: Make sure to use the actual deployed URLs from your backend and ML services, not localhost URLs!

#### 4. Deploy

1. Review all settings
2. Click **"Deploy"**
3. Wait for the deployment to complete (usually 1-3 minutes)
4. Once deployed, Vercel will provide you with a URL (e.g., `https://lingulu-frontend.vercel.app`)

---

### 🔧 Post-Deployment Configuration

#### Vercel Configuration File

The repository already includes a `vercel.json` file with the following configuration:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This configuration ensures that all routes are handled by React Router (client-side routing), which is essential for SPAs.

#### Custom Domain (Optional)

To add a custom domain:
1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Domains**
3. Click **"Add"**
4. Enter your domain name
5. Follow the DNS configuration instructions provided by Vercel

---

### ✅ Verification Steps

After deployment, verify that everything works:

1. **Access the application**: Visit your Vercel URL
2. **Test authentication**: Try logging in or registering a new account
3. **Check API connectivity**: 
   - Open browser DevTools (F12)
   - Go to Network tab
   - Perform actions that call the backend (e.g., login)
   - Verify requests are going to the correct backend URLs
4. **Test pronounciation features**: Try the voice recording features to ensure ML service connection
5. **Check console for errors**: Look for any CORS or API connection errors

#### Common Issues & Solutions

**CORS Errors**:
- Ensure your backend is configured to allow requests from your Vercel domain
- Check backend CORS configuration to include your frontend URL

**API Connection Failed**:
- Verify environment variables are set correctly
- Ensure backend and ML services are running and accessible
- Check that URLs don't have trailing slashes if not expected

**404 on Page Refresh**:
- Verify `vercel.json` is present in the repository
- Check that the rewrite rules are applied

---

### 🔄 Continuous Deployment

Vercel automatically sets up continuous deployment:

- **Main branch**: Auto-deploys to production on every push to `main`
- **Other branches**: Creates preview deployments for pull requests
- **Rollback**: Use Vercel dashboard to rollback to previous deployments if needed

---

### 📊 Monitoring

After deployment, you can monitor your application:

1. **Analytics**: Visit **Analytics** tab in Vercel Dashboard
2. **Logs**: Check **Deployments** → Select a deployment → **View Function Logs**
3. **Performance**: Monitor Core Web Vitals in the Speed Insights tab

---

## 🌍 Multi-Language Support

The project supports internationalization through:

```bash
src/i18n/
```

Allows dynamic language switching for UI content.

---
## 🏛️ Application Flows 

### 🔐 1. Authentication Flow

```pgsql
User opens Login/Register page
↓
User submits credentials
↓
Frontend sends request to Backend
↓
Backend validates user
↓
JWT token returned
↓
Token stored (cookie)
↓
AuthProvider updates global state
↓
User redirected to Dashboard
```

Frontend responsibilities:
- Form validation
- Error handling
- Token storage
- Route protection using ProtectedRoutes
- Auto-login check on page reload

### 📚 2. Lesson Flow

```pgsql
User opens Lessons page
↓
Frontend requests lesson list
↓
Backend returns lesson data (JSON)
↓
Frontend renders lesson cards
↓
User selects a lesson
↓
Frontend loads lesson detail
```

Includes:
- Fetching lesson content
- Displaying exercises
- Navigating between sections
- Sending completion status to backend

### 🤖 3. AI Conversation Flow

```pgsql
User opens AI Conversation
↓
User speaks
↓
Frontend sends audio to Backend
↓
Backend processes with AI model
↓
Response returned
↓
Frontend renders conversation bubble
```

Frontend handles:
- Conversation state
- Message history rendering
- Loading states
- Error fallback UI

### 🎙️ 4. Pronunciation Evaluation Flow

```pgsql
User records voice
↓
Audio converted to blob
↓
Frontend sends multipart/form-data
↓
Backend forwards to ML module
↓
ML returns pronunciation score
↓
Backend formats JSON
↓
Frontend displays:
   - Overall score
   - Word-level scores
   - Feedback
```

Frontend also:
- Shows recording animation
- Handles microphone permissions
- Displays weak word highlights
- Stores practice history

### 🏆 5. Leaderboard Flow

```pgsql
User opens Leaderboard page
↓
Frontend requests ranking data
↓
Backend returns sorted user scores
↓
Frontend renders ranking list
```

Frontend responsibilities:
- Sorting display
- Highlighting current user rank

### 👤 6. Profile & Progress Flow

```pgsql
User opens Profile
↓
Frontend requests user data
↓
Backend returns:
   - Practice history
   - Scores
   - Progress stats
↓
Frontend renders charts / statistics
```

Frontend handles:
- Profile editing
- Progress visualization

### 🌍 7. Language Switching Flow (i18n)

```pgsql
User changes language
↓
Frontend updates i18n context
↓
All UI text re-renders
```

No backend call required.

---

## 🧠 Connection to Backend

The frontend communicates with backend by:
- Sending HTTP requests via Axios
- Receiving structured JSON responses
- Rendering UI based on evaluation results
- Handling error responses gracefully

---

## 🧪 Testing

You can test frontend manually by:
- Running backend locally
- Recording voice input
- Inspecting network calls in browser DevTools

---

## 🚀 Future Improvements

- Global state management (Zustand / Redux)
- Unit testing (Vitest / React Testing Library)
- Component documentation (Storybook)

---

Made with love ❤️, lack of sleep 🥱 and tears 🥹 by MACAN MULAZ 🐅

---
