import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '@components/auth/register/RegisterForm';
import GoogleSignUpButton from '@components/auth/register/GoogleSignUpButton';
import LoginLink from '@components/auth/register/LoginLink';
import mascotRegister from '@assets/auth/mascot-register.svg'
import logoVertical from '@assets/auth/logo-vertical.svg';
import { registerUser } from '@/api/services';

const Register: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const handleRegisterSubmit = async (username: string, email: string, password: string, confirmPassword: string) => {
    setIsLoading(true);

    try {
      const response = await registerUser({ username, email, password, confirmPassword });

      if (!response.success) {
        throw new Error('Registration failed');
      }

      navigate('/otp-verify', { state: { email } });
    }  finally {      
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen bg-dark overflow-hidden">
      {/* Mascot section - hidden on mobile */}
      <div className="hidden md:flex flex-1 auth-gradient justify-center items-center p-10 relative">
        <div className="text-center text-white relative z-10">
          <img src={mascotRegister} alt="" className="w-[clamp(15em,40vw,35em)] m-0 p-0 animate-bounce-slow block" />
        </div>
      </div>

      {/* Form section - full width on mobile */}
      <div className="w-full md:flex-1 bg-background flex justify-center items-center px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-5 overflow-y-auto h-full">
        <div className="bg-background w-full max-w-[420px] px-4 sm:px-6 md:px-10 py-6 sm:py-7 flex flex-col justify-center my-auto">
          {/* Logo */}
          <div className="flex justify-center mb-3 sm:mb-4">
            <img src={logoVertical} alt="Lingulu" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
          </div>
          
          <h1 className="text-center text-primary text-2xl sm:text-3xl md:text-title font-bold font-rubik m-0 mb-4 sm:mb-5">{t('auth.createAccount')}</h1>

          <RegisterForm onSubmit={handleRegisterSubmit} loading={isLoading} />

          <div className="text-center text-neutral text-xs my-2 sm:my-3 relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[35%] before:h-px before:bg-border after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[35%] after:h-px after:bg-border">
            {t('auth.orContinueWith')}
          </div>

          <GoogleSignUpButton />

          <LoginLink />
        </div>
      </div>
    </div>
  );
};

export default Register;
