import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import mascotLogin from '@assets/auth/mascot-login.svg';
import LoginForm from '@components/auth/login/LoginForm';
import ForgotPasswordLink from '@components/auth/login/ForgotPasswordLink';
import GoogleLoginButton from '@components/auth/login/GoogleLoginButton';
import SignUpLink from '@components/auth/login/SignUpLink';
import { useAuth } from '@/hooks/useAuth';
import { loginUser } from '@api/services/user';

const Login: React.FC = () => {
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
    try {
      const response = await loginUser({ email, password, isRememberMe });

      if (!response.success) {
        throw new Error(response.message || 'Login gagal');
      }

      setIsAuthenticated(true);
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      // Backend return validation errors di data field
      let errorMessage = error.response?.data?.message || error.message || 'Login gagal';
      
      // Jika ada validation errors di data field, extract first error
      if (error.response?.data?.data && typeof error.response.data.data === 'object') {
        const errors = error.response.data.data;
        // Ambil error pertama yang ada
        for (const [field, messages] of Object.entries(errors)) {
          if (Array.isArray(messages) && messages.length > 0) {
            errorMessage = messages[0] as string;
            break;
          }
        }
      }
      
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div className="flex w-screen h-screen bg-dark overflow-hidden">
      <div className="flex-1 auth-gradient flex justify-center items-center p-10 relative">
        <div className="text-center text-white relative z-10">
          <img src={mascotLogin} alt="" className="w-[clamp(15em,40vw,35em)] m-0 p-0 animate-bounce-slow block" />
        </div>
      </div>

      <div className="flex-1 bg-background flex justify-center items-center px-10 py-5 overflow-hidden h-full relative max-md:flex-none max-md:min-h-[60vh] max-md:px-5 max-md:pt-10">
        <div className="bg-background w-full max-w-[420px] px-10 py-7 flex flex-col justify-start my-auto max-md:px-6">
          <h1 className="text-center text-primary text-title font-bold font-rubik m-0 mb-5">WELCOME BACK</h1>

          {oauthError && (
            <div className="bg-red-50 text-red-600 px-3 py-2 rounded-md mb-4 border-l-4 border-red-500 text-xs">
              {oauthError}
            </div>
          )}

          <LoginForm onSubmit={handleLoginSubmit} loading={isLoading} />
          
          <div className="text-center mb-3">
            <ForgotPasswordLink />
          </div>

          <div className="text-center text-neutral text-xs my-3 relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[35%] before:h-px before:bg-border after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[35%] after:h-px after:bg-border">
            Or Login with
          </div>

          <GoogleLoginButton onClick={handleGoogleLogin} />

          <SignUpLink />
        </div>
      </div>
    </div>
  );
}

export default Login;