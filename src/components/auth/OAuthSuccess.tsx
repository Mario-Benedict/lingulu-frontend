import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getAuthenticatedUser } from '@/api/services';
import { useTranslation } from 'react-i18next';

const OAuthSuccess: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      const errorMessage = errorParam;
      
      navigate("/login", { state: { error: errorMessage }, replace: true });
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await getAuthenticatedUser();

        if (response.success && response.data) {
          setIsAuthenticated(true);
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/login", { 
            state: { error: response.message || t('auth.emailAlreadyRegistered') }, 
            replace: true 
          });
        }
      } catch {
        navigate("/login", { replace: true });
      }
    };
    // Run once on mount
    fetchUserData();
  }, [navigate, setIsAuthenticated, searchParams, t]);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="text-center">
        <p className="text-xl font-semibold">{t('auth.completingSignUp')}</p>
      </div>
    </div>
  );
};

export default OAuthSuccess;
