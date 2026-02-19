import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const { t } = useTranslation();

  if (loading) return <p>{t('common.loading')}</p>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};