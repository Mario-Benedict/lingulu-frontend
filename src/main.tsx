import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Login  from '@pages/auth/Login.tsx';
import Register from '@pages/auth/Register.tsx';
import NotFoundPage from '@pages/NotFoundPage.tsx';
import Dashboard from '@pages/dashboard/Dashboard.tsx';
import Lessons from '@pages/lessons/Lessons.tsx';
import LearningMap from '@pages/lessons/LearningMap.tsx';
import Sublessons from '@pages/lessons/Sublessons.tsx';
import Materials from '@pages/lessons/Materials.tsx';
import Exercises from '@pages/lessons/Exercises.tsx';
import OAuthSuccess from './components/auth/OAuthSuccess';
import Leaderboard from '@pages/dashboard/Leaderboard.tsx';
import Aiconversation from '@pages/aiconversation/Aiconversation.tsx';
import Profile from '@pages/profile/Profile.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoutes';
import { AuthProvider } from './contexts/AuthProvider';
// export { default as ProfileCard } from './ProfileCard';
// export { default as StatsCard } from './StatsCard';
// export { default as AccountSettings } from './AccountSettings';
// export { default as StatItem } from './StatItem';


const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/oauth2/success', element: <OAuthSuccess /> },
  { path: '/profile', element: <Profile /> },

  {
    element: (
      <ProtectedRoute />
    ),
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/lessons', element: <Lessons /> },
      { path: '/lessons/map', element: <LearningMap /> },
      { path: '/lessons/:LevelId', element: <Sublessons /> },
      { path: '/lessons/materials/:materialId', element: <Materials /> },
      { path: '/lessons/exercises/:exerciseId', element: <Exercises /> },
      { path: '/leaderboard', element: <Leaderboard /> },
      { path: '/conversation', element: <Aiconversation /> },
      { path: '/profile', element: <Profile /> },
    ],
  },

  { path: '*', element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
