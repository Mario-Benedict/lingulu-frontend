import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';
import Landing from '@pages/landing/Landing.tsx';
import Login  from '@pages/auth/Login.tsx';
import Register from '@pages/auth/Register.tsx';
import Otp from '@pages/auth/Otp.tsx';
import ResetPass from '@pages/auth/ResetPass.tsx';
import ChangePass from '@pages/auth/ChangePass.tsx';
import NotFoundPage from '@pages/NotFoundPage.tsx';
import Dashboard from '@pages/dashboard/Dashboard.tsx';
import Lessons from '@pages/lessons/Lessons.tsx';
import LearningMap from '@pages/lessons/LearningMap.tsx';
import Section from '@pages/lessons/Section.tsx';
import Materials from '@pages/lessons/Materials.tsx';
import Exercises from '@pages/lessons/Exercises.tsx';
import PronunciationExercise from '@pages/lessons/PronunciationExercise.tsx';
import OAuthSuccess from './components/auth/OAuthSuccess';
import LeaderboardPage from '@pages/leaderboard/Leaderboard';
import Aiconversation from '@pages/aiconversation/Aiconversation.tsx';
import Profile from '@pages/profile/Profile.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoutes';
import { AuthProvider } from './contexts/AuthProvider';


const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/otp-verify', element: <Otp /> },
  { path: '/reset-password', element: <ResetPass /> },
  { path: '/oauth2/success', element: <OAuthSuccess /> },
  { path: '/dashboard', element: <Dashboard /> },
      { path: '/lessons', element: <Lessons /> },
      { path: '/lessons/:courseId/map', element: <LearningMap /> },
      { path: '/lessons/:courseId/:lessonId', element: <Section /> },
      { path: '/lessons/materials/:materialId', element: <Materials /> },
      { path: '/lessons/exercises/:sectionId', element: <Exercises /> },
      { path: '/lessons/pronunciation/:sectionId', element: <PronunciationExercise /> },
      { path: '/leaderboard', element: <LeaderboardPage /> },
      { path: '/conversation', element: <Aiconversation /> },
      { path: '/profile', element: <Profile /> },
      { path: '/change-password', element: <ChangePass /> },
  {
    element: (
      <ProtectedRoute />
    ),
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/lessons', element: <Lessons /> },
      { path: '/lessons/map', element: <LearningMap /> },
      { path: '/lessons/:lessonId', element: <Section /> },
      { path: '/lessons/materials/:materialId', element: <Materials /> },
      { path: '/lessons/exercises/:exerciseId', element: <Exercises /> },
      { path: '/lessons/pronunciation/:exerciseId', element: <PronunciationExercise /> },
      { path: '/leaderboard', element: <LeaderboardPage /> },
      { path: '/conversation', element: <Aiconversation /> },
      { path: '/profile', element: <Profile /> },
      { path: '/change-password', element: <ChangePass /> },
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
