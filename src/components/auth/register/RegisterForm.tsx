import { useState, useRef } from 'react';
import userIcon from '@assets/auth/user-icon.svg';
import emailIcon from '@assets/auth/email-icon.png';
import lockIcon from '@assets/auth/lock-icon.svg';
import confirmIcon from '@assets/auth/confirm-icon.png';
import eyeIcon from '@assets/auth/eye-icon.png';
import closedEyeIcon from '@assets/auth/closedeye-icon.png';
import { useTranslation } from 'react-i18next';

interface RegisterFormProps {
  onSubmit: (username: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  loading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading = false }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (pwd: string, type: string): { valid: boolean; message?: string } => {
    if (pwd.length < 8) {
      return { valid: false, message: `${type} ${t('auth.passwordTooShort')}` };
    }
    if (!/[A-Z]/.test(pwd)) {
      return { valid: false, message: `${type} ${t('auth.passwordCapitalLetter')}` };
    }
    if (!/[a-z]/.test(pwd)) {
      return { valid: false, message: `${type} ${t('auth.passwordLowercaseLetter')}` };
    }
    if (!/[0-9]/.test(pwd)) {
      return { valid: false, message: `${type} ${t('auth.passwordNumber')}` };
    }
    return { valid: true };
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!username.trim()) {
      newErrors.username = t('auth.usernameRequired');
    } else if (username.length < 3) {
      newErrors.username = t('auth.usernameTooShort');
    }

    if (!email.trim()) {
      newErrors.email = t('auth.emailRequired');
    } else if (!validateEmail(email)) {
      newErrors.email = t('auth.invalidEmailFormat');
    }

    const passwordValidation = validatePassword(password, t('auth.password'));
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.message || t('auth.invalidPassword');
    }

    const confirmPasswordValidation = validatePassword(confirmPassword, t('auth.confirmPassword'));
    if (!confirmPasswordValidation.valid) {
      newErrors.confirmPassword = confirmPasswordValidation.message || t('auth.invalidConfirmPassword');
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = t('auth.passwordsDoNotMatch');
    }

    if (!agreeToTerms) {
      newErrors.terms = t('auth.termsRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(username, email, password, confirmPassword);
    } catch (error: unknown) {
      const newErrors: Record<string, string> = {};
      let errorMessage = 'Registration failed';
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string; data?: Record<string, string[]> } } };
        
        // Handle field-level errors from backend
        if (axiosError.response?.data?.data) {
          const backendErrors = axiosError.response.data.data;
          Object.keys(backendErrors).forEach(field => {
            const messages = backendErrors[field];
            if (Array.isArray(messages) && messages.length > 0) {
              newErrors[field] = messages[0];
            }
          });
        }
        
        // If no field errors, show general message
        if (Object.keys(newErrors).length === 0) {
          errorMessage = axiosError.response?.data?.message || t('auth.registrationFailed');
          newErrors.submit = errorMessage;
        }
      } else if (error instanceof Error) {
        newErrors.submit = error.message;
      } else {
        newErrors.submit = t('auth.registrationFailed');
      }
      
      setErrors(newErrors);
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

  const handleToggleConfirmPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
    setTimeout(() => {
      if (confirmPasswordRef.current) {
        confirmPasswordRef.current.focus();
        confirmPasswordRef.current.setSelectionRange(confirmPassword.length, confirmPassword.length);
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
        <div className="relative flex items-center border-2 border-border rounded-lg bg-inputBg transition-all duration-500 w-full focus-within:border-primary focus-within:bg-white">
          <label htmlFor="username" className="ml-3 mr-0 mb-0 cursor-pointer">
            <img src={userIcon} alt="user" className="w-6 h-6 mr-2 ml-1.5 flex-shrink-0 object-contain" />
          </label>
          <input
            id="username"
            type="text"
            placeholder= {t('auth.username')}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username) clearError('username');
            }}
            className="flex-1 border-none bg-transparent py-2.5 px-0 text-sm text-secondary outline-none placeholder:text-neutral disabled:bg-disabled disabled:cursor-not-allowed"
          />
        </div>
        {errors.username && <span className="block text-error text-[11px] mt-0.5 ml-1.5">{errors.username}</span>}
      </div>

      <div className="mb-3.5">
        <div className="relative flex items-center border-2 border-border rounded-lg bg-inputBg transition-all duration-500 w-full focus-within:border-primary focus-within:bg-white">
          <label htmlFor="email" className="ml-3 mr-0 mb-0 cursor-pointer">
            <img src={emailIcon} alt="user" className="w-6 h-6 mr-2 ml-1.5 flex-shrink-0 object-contain" />
          </label>
          <input
            id="email"
            placeholder={t('auth.email')}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) clearError('email');
            }}
            className="flex-1 border-none bg-transparent py-2.5 px-0 text-sm text-secondary outline-none placeholder:text-neutral disabled:bg-disabled disabled:cursor-not-allowed"
          />
        </div>
        {errors.email && <span className="block text-error text-[11px] mt-0.5 ml-1.5">{errors.email}</span>}
      </div>

      <div className="mb-3.5">
        <div className="relative flex items-center border-2 border-border rounded-lg bg-inputBg transition-all duration-500 w-full focus-within:border-primary focus-within:bg-white">
          <label htmlFor="password" className="ml-3 mr-0 mb-0 cursor-pointer">
            <img src={lockIcon} alt="password" className="w-6 h-6 mr-2 ml-1.5 flex-shrink-0 object-contain" />
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

      <div className="mb-3.5">
        <div className="relative flex items-center border-2 border-border rounded-lg bg-inputBg transition-all duration-500 w-full focus-within:border-primary focus-within:bg-white">
          <label htmlFor="confirm-password" className="ml-3 mr-0 mb-0 cursor-pointer">
            <img src={confirmIcon} alt="password" className="w-6 h-6 mr-2 ml-1.5 flex-shrink-0 object-contain" />
          </label>
          <input
            ref={confirmPasswordRef}
            id="confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder={t('auth.confirmPassword')}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) clearError('confirmPassword');
            }}
            className="flex-1 border-none bg-transparent py-2.5 px-0 text-sm text-secondary outline-none placeholder:text-neutral disabled:bg-disabled disabled:cursor-not-allowed"
          />
          <button
            type="button"
            className="bg-transparent border-none p-0 cursor-pointer ml-2 w-fit mr-3 flex items-center justify-center hover:text-primary"
            onClick={handleToggleConfirmPassword}
          >
            <img src={showConfirmPassword ? eyeIcon : closedEyeIcon} alt="toggle password" className="w-6 h-6 object-contain" />
          </button>
        </div>
        {errors.confirmPassword && <span className="block text-error text-[11px] mt-0.5 ml-1.5">{errors.confirmPassword}</span>}
      </div>

      <div className="flex items-center gap-1 mt-0">
        <input
          type="checkbox"
          id="agree"
          checked={agreeToTerms}
          onChange={(e) => {
            setAgreeToTerms(e.target.checked);
            if (errors.terms) clearError('terms');
          }}
          className="auth-checkbox"
        />
        <label htmlFor="agree" className="text-neutral text-sm cursor-pointer">
          {t('auth.agreeToTerms')}
        </label>
      </div>
      {errors.terms && <span className="block text-error text-[11px] mt-0.5 ml-1.5">{errors.terms}</span>}

      <button type="submit" disabled={loading} className="auth-button mb-3 mt-4">
        {loading ? t('auth.signingUp') : t('auth.signUp')}
      </button>
    </form>
  );
};

export default RegisterForm;
