import { useState, useEffect } from 'react';
import {useTranslation} from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import mascotLogin from '@assets/auth/mascot-login.svg';
import logoVertical from '@assets/auth/logo-vertical.svg';
import LoginForm from '@components/auth/login/LoginForm';
import ForgotPasswordLink from '@components/auth/login/ForgotPasswordLink';
import GoogleLoginButton from '@components/auth/login/GoogleLoginButton';
import SignUpLink from '@components/auth/login/SignUpLink';
import { useAuth } from '@/hooks/useAuth';
import { loginUser } from '@/api/services';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [oauthError, setOauthError] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.error) {
      setOauthError(location.state.error);
    }
  }, [location.state]);

  const handleLoginSubmit = async (email: string, password: string, isRememberMe: boolean) => {
    setIsLoading(true);
    setOauthError(null);

    try {
      const response = await loginUser({ email, password, isRememberMe });

      if (response.success) {
        setIsAuthenticated(true);
        navigate('/dashboard', { replace: true });
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string;
              data?: {
                authenticated?: boolean;
              };
            };
          };
        };

        const data = axiosError.response?.data;
        const message = data?.message || 'Login failed';
        const authenticated = data?.data?.authenticated;

        // Check if user is registered but not verified
        if (authenticated === false) {
          setOauthError('Email not verified. Redirecting to verification...');
          setTimeout(() => {
            navigate('/otp-verify', { state: { email } });
          }, 1500);
          return;
        }

        // Check if account is linked with Google
        if (message.toLowerCase().includes('google')) {
          setOauthError('This email is already registered with Google. Please use Google Login to continue.');
          return;
        }

        setOauthError(message);
      } else {
        setOauthError('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };


  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div className="flex w-screen h-screen bg-dark overflow-hidden">
      {/* Mascot section - hidden on mobile */}
      <div className="hidden md:flex flex-1 auth-gradient justify-center items-center p-10 relative">
        <div className="text-center text-white relative z-10">
          <img src={mascotLogin} alt="" className="w-[clamp(15em,40vw,35em)] m-0 p-0 animate-bounce-slow block" />
        </div>
      </div>

      {/* Form section - full width on mobile */}
      <div className="w-full md:flex-1 bg-background flex justify-center items-center px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-5 overflow-y-auto h-full">
        <div className="bg-background w-full max-w-[420px] px-4 sm:px-6 md:px-10 py-6 sm:py-7 flex flex-col justify-center my-auto">
          {/* Logo */}
          <div className="flex justify-center mb-3 sm:mb-4">
            <img src={logoVertical} alt="Lingulu" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
          </div>
          
          <h1 className="text-center text-primary text-2xl sm:text-3xl md:text-title font-bold font-rubik m-0 mb-4 sm:mb-5">{t('auth.welcomeBack')}</h1>

          {oauthError && (
            <div className="bg-red-50 text-red-600 px-3 py-2 rounded-md mb-3 sm:mb-4 border-l-4 border-red-500 text-xs">
              {oauthError}
            </div>
          )}

          <LoginForm onSubmit={handleLoginSubmit} loading={isLoading} hasGlobalError={!!oauthError} />
          
          <div className="text-center mb-2 sm:mb-3">
            <ForgotPasswordLink />
          </div>

          <div className="text-center text-neutral text-xs my-2 sm:my-3 relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[35%] before:h-px before:bg-border after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[35%] after:h-px after:bg-border">
            {t('auth.orContinueWith')}
          </div>

          <GoogleLoginButton onClick={handleGoogleLogin} />

          <SignUpLink />
        </div>
      </div>
    </div>
  );
}

export default Login;