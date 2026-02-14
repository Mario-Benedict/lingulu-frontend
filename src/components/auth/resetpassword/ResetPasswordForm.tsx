import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import lockIcon from '@assets/auth/lock-icon.svg';
import eyeIcon from '@assets/auth/eye-icon.png';
import closedEyeIcon from '@assets/auth/closedeye-icon.png';

interface ResetPasswordFormProps {
  onSubmit: (newPassword: string, confirmPassword: string) => Promise<void>;
  onBack?: () => void;
  showBackToLogin?: boolean;
  loading?: boolean;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSubmit, onBack, showBackToLogin = false, loading = false }) => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const validatePassword = (pwd: string): { valid: boolean; message?: string } => {
    if (pwd.length < 8) {
      return { valid: false, message: 'Password minimal 8 karakter' };
    }
    if (!/[A-Z]/.test(pwd)) {
      return { valid: false, message: 'Password harus mengandung huruf besar' };
    }
    if (!/[a-z]/.test(pwd)) {
      return { valid: false, message: 'Password harus mengandung huruf kecil' };
    }
    if (!/[0-9]/.test(pwd)) {
      return { valid: false, message: 'Password harus mengandung angka' };
    }
    return { valid: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError('Password tidak boleh kosong');
      return;
    }

    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
      setError(passwordValidation.message || 'Password tidak valid');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    setError('');

    try {
      await onSubmit(newPassword, confirmPassword);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal reset password');
    }
  };

  const handleToggleNewPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowNewPassword(!showNewPassword);
    setTimeout(() => {
      if (passwordRef.current) {
        passwordRef.current.focus();
        passwordRef.current.setSelectionRange(newPassword.length, newPassword.length);
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

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      {error && (
        <div className="bg-errorBg text-error px-3 py-2 rounded-lg border-l-4 border-error text-sm flex items-center gap-2">
          <span>⚠️</span>
          {error}
        </div>
      )}

      {/* New Password */}
      <div className="relative flex items-center border-2 border-border rounded-lg bg-inputBg transition-all duration-300 focus-within:border-primary focus-within:bg-white">
        <label htmlFor="newPassword" className="ml-3 mr-0 cursor-pointer">
          <img src={lockIcon} alt="password" className="w-6 h-6 mr-2 ml-1.5 flex-shrink-0 object-contain" />
        </label>
        <input
          ref={passwordRef}
          id="newPassword"
          type={showNewPassword ? 'text' : 'password'}
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            if (error) setError('');
          }}
          required
          className="flex-1 border-none bg-transparent py-3 px-0 text-secondary placeholder:text-neutral focus:outline-none disabled:bg-disabled disabled:cursor-not-allowed"
        />
        <button
          type="button"
          className="bg-transparent border-none p-0 cursor-pointer ml-2 w-fit mr-3 flex items-center justify-center hover:text-primary"
          onClick={handleToggleNewPassword}
        >
          <img src={showNewPassword ? eyeIcon : closedEyeIcon} alt="toggle password" className="w-6 h-6 object-contain" />
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative flex items-center border-2 border-border rounded-lg bg-inputBg transition-all duration-300 focus-within:border-primary focus-within:bg-white">
        <label htmlFor="confirmPassword" className="ml-3 mr-0 cursor-pointer">
          <img src={lockIcon} alt="password" className="w-6 h-6 mr-2 ml-1.5 flex-shrink-0 object-contain" />
        </label>
        <input
          ref={confirmPasswordRef}
          id="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (error) setError('');
          }}
          required
          className="flex-1 border-none bg-transparent py-3 px-0 text-secondary placeholder:text-neutral focus:outline-none disabled:bg-disabled disabled:cursor-not-allowed"
        />
        <button
          type="button"
          className="bg-transparent border-none p-0 cursor-pointer ml-2 w-fit mr-3 flex items-center justify-center hover:text-primary"
          onClick={handleToggleConfirmPassword}
        >
          <img src={showConfirmPassword ? eyeIcon : closedEyeIcon} alt="toggle password" className="w-6 h-6 object-contain" />
        </button>
      </div>

      <button type="submit" disabled={loading} className="auth-button mt-2">
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>

      {onBack && !showBackToLogin && (
        <p className="text-center text-neutral text-sm mt-3 font-poppins">
          Changed your mind?{' '}
          <button 
            type="button" 
            onClick={onBack}
            className="text-primary font-semibold hover:underline bg-transparent border-none cursor-pointer"
          >
            Edit Email
          </button>
        </p>
      )}

      {showBackToLogin && (
        <p className="text-center text-neutral text-sm mt-3 font-poppins">
          Don't want to continue?{' '}
          <button 
            type="button" 
            onClick={() => navigate('/login')}
            className="text-primary font-semibold hover:underline bg-transparent border-none cursor-pointer"
          >
            Back to Login
          </button>
        </p>
      )}
    </form>
  );
};

export default ResetPasswordForm;
