import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailIcon from '@assets/auth/email-icon.png';
import { useTranslation } from 'react-i18next';


interface ResetPasswordEmailProps {
  onSubmit: (email: string) => Promise<void>;
  loading?: boolean;
}

const ResetPasswordEmail: React.FC<ResetPasswordEmailProps> = ({ onSubmit, loading = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError(t('auth.emailRequired'));
      return;
    }

    if (!validateEmail(email)) {
      setError(t('auth.invalidEmailFormat'));
      return;
    }

    setError('');

    try {
      await onSubmit(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.failedToSendResetLink'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      {error && (
        <div className="bg-errorBg text-error px-3 py-2 rounded-lg border-l-4 border-error text-sm flex items-center gap-2">
          <span>⚠️</span>
          {error}
        </div>
      )}

      <div className="relative flex items-center border-2 border-border rounded-lg bg-inputBg transition-all duration-300 focus-within:border-primary focus-within:bg-white">
        <label htmlFor="email" className="ml-3 mr-0 cursor-pointer">
          <img src={emailIcon} alt="email" className="w-6 h-6 mr-2 ml-1.5 flex-shrink-0 object-contain" />
        </label>
        <input
          id="email"
          type="email"
          placeholder={t('auth.emailPlaceholder')}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          required
          className="flex-1 border-none bg-transparent py-3 px-0 text-secondary placeholder:text-neutral focus:outline-none disabled:bg-disabled disabled:cursor-not-allowed"
        />
      </div>

      <button type="submit" disabled={loading} className="auth-button mt-2">
        {loading ? t('auth.sending') : t('auth.sendResetLink')}
      </button>

      <p className="text-center text-neutral text-sm mt-3 font-poppins">
        {t('auth.decidedNotToReset')}{' '}
        <button 
          type="button" 
          onClick={() => navigate('/login')}
          className="text-primary font-semibold hover:underline bg-transparent border-none cursor-pointer"
        >
          {t('auth.backToLogin')}
        </button>
      </p>
    </form>
  );
};

export default ResetPasswordEmail;
