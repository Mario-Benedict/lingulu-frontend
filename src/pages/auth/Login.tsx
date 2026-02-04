import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mascotLogin from '@assets/auth/mascot-login.svg';
import LoginForm from '@components/auth/login/LoginForm';
import ForgotPasswordLink from '@components/auth/login/ForgotPasswordLink';
import GoogleLoginButton from '@components/auth/login/GoogleLoginButton';
import SignUpLink from '@components/auth/login/SignUpLink';
import { useAuth } from '@/hooks/useAuth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/account/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          email: email,
          password: password,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Login gagal');
      }

      setIsAuthenticated(true);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div className="flex w-screen h-screen bg-dark overflow-hidden">
      {/* Left Side - Orange Background with Mascot */}
      <div className="flex-1 auth-gradient flex justify-center items-center p-10 relative">
        <div className="text-center text-white relative z-10">
          <img src={mascotLogin} alt="" className="w-[clamp(15em,40vw,35em)] m-0 p-0 animate-bounce-slow block" />
        </div>
      </div>

      {/* Right Side - White Background with Form */}
      <div className="flex-1 bg-background flex justify-center items-center px-10 py-5 overflow-hidden h-full relative max-md:flex-none max-md:min-h-[60vh] max-md:px-5 max-md:pt-10">
        <div className="bg-background w-full max-w-[420px] px-10 py-7 flex flex-col justify-start my-auto max-md:px-6">
          <h1 className="text-center text-primary text-title font-bold font-rubik m-0 mb-5">WELCOME BACK</h1>

          <LoginForm onSubmit={handleLoginSubmit} loading={loading} />

          {/* Forgot Password Link */}
          <div className="text-center mb-3">
            <ForgotPasswordLink />
          </div>

          {/* Divider */}
          <div className="text-center text-neutral text-xs my-3 relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[35%] before:h-px before:bg-border after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[35%] after:h-px after:bg-border">
            Or Login with
          </div>

          {/* Google Login Button */}
          <GoogleLoginButton onClick={handleGoogleLogin} />

          {/* Sign Up Link */}
          <SignUpLink />
        </div>
      </div>
    </div>
  );
}

export default Login;