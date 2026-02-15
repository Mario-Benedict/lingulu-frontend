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

## 🔗 API Integration Example

User wants to login

Frontend sends:

```bash
POST /api/account/login
```

Request body:
```json
{
  "username": "string",
  "password": "********"
}
```

Backend response:

1. Login successful

```json
{
  "token": "string",
  "user": {
    "id": "string",
    "username": "string",
    "email": "user@example.com"
  }
}
```

2. Invalid username or password

```json
{
  "error": "Invalid username or password"
}
```

3. Server error

```json
{
  "error": "string"
}
```

Frontend then:
- Goes to dashboard if successful
- Show error message
- Show invalid username or password message

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
Token stored (localStorage)
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
