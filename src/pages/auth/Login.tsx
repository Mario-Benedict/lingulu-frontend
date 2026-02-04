import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mascotLogin from '@assets/auth/mascot-login.svg';
import LoginForm from '@components/auth/login/LoginForm';
import ForgotPasswordLink from '@components/auth/login/ForgotPasswordLink';
import GoogleLoginButton from '@components/auth/login/GoogleLoginButton';
import SignUpLink from '@components/auth/login/SignUpLink';
import { useAuth } from '@/hooks/useAuth';
import { loginUser } from '@api/services/user';

const Login: React.FC = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const passwordRef = useRef<HTMLInputElement>(null);

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
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!email.trim()) {
      newErrors.email = 'Email tidak boleh kosong'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Format email tidak valid'
    }

    if (!password) {
      newErrors.password = 'Password tidak boleh kosong'
    } else if (password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!validateForm()) return;

  setIsLoading(true);
  setErrors({});

  try {
    const result = await loginUser({
      email: email,
      password: password,
      isRememberMe: rememberMe
    });

    console.log("Login API Response:", result);

    if (!result.success) {
      setIsLoading(false);
      setErrors({ submit: result.message || "Login gagal" });
      return;
    }

    setIsAuthenticated(true);
    navigate("/dashboard", { replace: true });

  } catch (err: any) {
    console.error("Login error:", err);
    console.error("Error response:", err?.response?.data);
    
    const errorData = err?.response?.data;
    
    if (errorData?.data && typeof errorData.data === 'object') {
      const backendErrors: Record<string, string> = {};
      Object.keys(errorData.data).forEach(key => {
        backendErrors[key] = Array.isArray(errorData.data[key]) 
          ? errorData.data[key][0] 
          : errorData.data[key];
      });
      setErrors(backendErrors);
    } else if (errorData?.message) {
      setErrors({ submit: errorData.message });
    } else {
      setErrors({ submit: "Tidak dapat menghubungi server" });
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
            <div className="flex items-center mb-3 mt-2 gap-2">
              <input 
                type="checkbox" 
                id="remember" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="auth-checkbox" 
              />
              <label htmlFor="remember" className="text-neutral text-sm cursor-pointer">Remember me</label>
            </div>
          
            <div className="text-center mb-3">
              <ForgotPasswordLink />
            </div>

            <button type="submit" disabled={isLoading} className="auth-button mb-3 disabled:opacity-60 disabled:cursor-not-allowed">
              {isLoading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
            <button 
                type="button"
                onClick={() => navigate('/reset-password')}
                className="text-primary text-sm font-semibold hover:underline bg-transparent border-none cursor-pointer"
              >
                Forgot Password?
              </button>
          </form>

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