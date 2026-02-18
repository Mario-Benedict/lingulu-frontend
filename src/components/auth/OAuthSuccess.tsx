import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';

const OAuthSuccess: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      console.error("OAuth error:", errorParam);
      const errorMessage = errorParam;
      
      navigate("/login", { state: { error: errorMessage }, replace: true });
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/account/authenticated",
          {
            method: "GET",
            credentials: "include",
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.ok) {
          const result = await response.json();

          if (result.success && result.data) {
            setIsAuthenticated(true);
            navigate("/dashboard", { replace: true });
          } else {
            console.error(t('auth.authenticationFailed'), result);
            navigate("/login", { replace: true });
          }
        } else if (response.status === 500) {
          console.error(t('auth.backendError500'));
          navigate("/login", { 
            state: { error: t('auth.emailAlreadyRegistered') }, 
            replace: true 
          });
        } else {
          console.error(t('auth.failedAuthCheck'), response.status);
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("Fetch error:", error);
        navigate("/login", { replace: true });
      }
    };
    // Run once on mount
    fetchUserData();
  }, [navigate, setIsAuthenticated, searchParams]);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="text-center">
        <p className="text-xl font-semibold">{t('auth.completingSignUp')}</p>
      </div>
    </div>
  );
};

export default OAuthSuccess;
