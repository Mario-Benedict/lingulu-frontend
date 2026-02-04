import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface ResetPasswordFormProps {
  email: string;
  onSubmit: (password: string, confirmPassword: string) => Promise<void>;
  loading?: boolean;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ email, onSubmit, loading = false }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await onSubmit(newPassword, confirmPassword);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg border-l-4 border-red-500 text-sm flex items-center gap-2">
          <span>⚠️</span>
          {error}
        </div>
      )}

      {/* New Password Input */}
      <div className="relative">
        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lessongray-400" size={20} />
        <input
          type={showNewPassword ? 'text' : 'password'}
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={loading}
          className="w-full pl-12 pr-12 py-3 border border-lessongray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins text-lessongray-700 placeholder-lessongray-400 disabled:bg-lessongray-50"
        />
        <button
          type="button"
          onClick={() => setShowNewPassword(!showNewPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lessongray-400 hover:text-lessongray-600"
        >
          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Confirm Password Input */}
      <div className="relative">
        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lessongray-400" size={20} />
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
          className="w-full pl-12 pr-12 py-3 border border-lessongray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins text-lessongray-700 placeholder-lessongray-400 disabled:bg-lessongray-50"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lessongray-400 hover:text-lessongray-600"
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !newPassword || !confirmPassword}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-poppins"
      >
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>

      {/* Back to Sign In Link */}
      <p className="text-center text-lessongray-600 text-sm font-poppins">
        Change your mind?{' '}
        <a href="/login" className="text-primary font-semibold hover:underline">
          Back to Sign in
        </a>
      </p>
    </form>
  );
};

export default ResetPasswordForm;
