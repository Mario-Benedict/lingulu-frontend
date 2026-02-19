import { useState, useRef } from 'react';
import userIcon from '@assets/auth/user-icon.svg';
import lockIcon from '@assets/auth/lock-icon.svg';
import eyeIcon from '@assets/auth/eye-icon.png';
import closedEyeIcon from '@assets/auth/closedeye-icon.png';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  onSubmit: (email: string, password: string, isRememberMe: boolean) => Promise<void>;
  loading?: boolean;
  hasGlobalError?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading = false, hasGlobalError = false }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const passwordRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = t('auth.emailRequired');
    } else if (!validateEmail(email)) {
      newErrors.email = t('auth.invalidEmailFormat');
    }

    if (!password) {
      newErrors.password = t('auth.passwordRequired');
    } else if (password.length < 8) {
      newErrors.password = t('auth.passwordTooShort');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(email, password, isRememberMe);
    } catch (error: unknown) {
      // Jangan tampilkan error form jika sudah ada error global di parent
      if (hasGlobalError) {
        return;
      }
      
      let errorMessage = t('auth.loginFailed');
      
      // Handle axios error response
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setErrors({ submit: errorMessage });
    }
  };

  const handleTogglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
    setTimeout(() => {
      if (passwordRef.current) {
        passwordRef.current.focus();
        passwordRef.current.setSelectionRange(password.length, password.length);
      }
    }, 0);
  };

  const clearError = (field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col font-poppins">
      {errors.submit && (
        <div className="bg-errorBg text-error px-2.5 py-2 rounded-md mb-3 border-l-4 border-error text-xs flex items-center gap-1.5 before:content-['⚠️'] before:flex-shrink-0 before:text-sm">
          {errors.submit}
        </div>
      )}

      <div className="mb-3.5">
        <div className="relative flex items-center border-2 border-border rounded-lg bg-inputBg transition-all duration-500 w-full font-poppins focus-within:border-primary focus-within:bg-white">
          <label htmlFor="email" className="ml-3 mr-0 mb-0 cursor-pointer">
            <img src={userIcon} alt="user" className="w-6 h-6 mr-2 ml-1.5 flex-shrink-0 object-contain" />
          </label>
          <input
            id="email"
            // type="email"
            placeholder={t('auth.email')}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) clearError('email');
            }}
            // required
            className="flex-1 border-none bg-transparent py-2.5 px-0 text-sm text-secondary outline-none placeholder:text-neutral disabled:bg-disabled disabled:cursor-not-allowed"
          />
        </div>
        {errors.email && <span className="block text-error text-[11px] mt-0.5 ml-1.5">{errors.email}</span>}
      </div>

      <div className="mb-3.5">
        <div className="relative flex items-center border-2 border-border rounded-lg bg-inputBg transition-all duration-500 w-full font-poppins focus-within:border-primary focus-within:bg-white">
          <label htmlFor="password" className="ml-3 mr-0 mb-0 cursor-pointer">
            <img src={lockIcon} alt="user" className="w-6 h-6 mr-2 ml-1.5 flex-shrink-0 object-contain" />
          </label>
          <input
            ref={passwordRef}
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder={t('auth.password')}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) clearError('password');
            }}
            // required
            className="flex-1 border-none bg-transparent py-2.5 px-0 text-sm text-secondary outline-none placeholder:text-neutral disabled:bg-disabled disabled:cursor-not-allowed"
          />
          <button
            type="button"
            className="bg-transparent border-none p-0 cursor-pointer ml-2 w-fit mr-3 flex items-center justify-center hover:text-primary"
            onClick={handleTogglePassword}
          >
            <img src={showPassword ? eyeIcon : closedEyeIcon} alt="toggle password" className="w-6 h-6 object-contain" />
          </button>
        </div>
        {errors.password && <span className="block text-error text-[11px] mt-0.5 ml-1.5">{errors.password}</span>}
      </div>

      <div className="flex items-center mb-3 mt-2 gap-2">
        <input
          type="checkbox"
          id="remember"
          className="auth-checkbox"
          checked={isRememberMe}
          onChange={(e) => setIsRememberMe(e.target.checked)}
        />
        <label htmlFor="remember" className="text-neutral text-sm cursor-pointer">
          {t('auth.rememberMe')}
        </label>
      </div>

      <button type="submit" disabled={loading} className="auth-button mb-3">
        {loading ? t('auth.loggingIn') : t('auth.login')}
      </button>
    </form>
  );
};

export default LoginForm;
