import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login  from '@pages/auth/Login.tsx'
import Register from '@pages/auth/Register.tsx'
import NotFoundPage from '@pages/NotFoundPage.tsx'
import Dashboard from '@pages/dashboard/Dashboard.tsx'
import Lessons from '@pages/lessons/Lessons.tsx'
import LearningMap from '@pages/lessons/LearningMap.tsx'
import Sublessons from '@pages/lessons/Sublessons.tsx'
import OAuthSuccess from './components/OAuthSuccess'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Leaderboard from '@pages/dashboard/Leaderboard.tsx'

const router = createBrowserRouter([
  {path: '/', element: <Login />},
  {path: '/login', element: <Login />},
  {path: '/register', element: <Register />},
  {path: '/dashboard', element: <Dashboard />},
  {path: '/lessons', element: <Lessons />},
  {path: '/lessons/map', element: <LearningMap />},
  {path: '/lessons/:LevelId', element: <Sublessons />},
  {path: '/leaderboard', element: <div>Leaderboard Page</div>},
  {path: '/conversation', element: <div>AI Conversation Page</div>},
  {path: '/profile', element: <div>Profile Page</div>},
  {path: '/oauth2/success', element: <OAuthSuccess />},
  {path: '/leaderboard', element: <Leaderboard />},
  {path: '*', element: <NotFoundPage/>}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
