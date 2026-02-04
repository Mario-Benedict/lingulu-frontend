import React, { useState } from 'react';
import { Mail } from 'lucide-react';

interface ResetPasswordEmailProps {
  onSubmit: (email: string) => Promise<void>;
  loading?: boolean;
}

const ResetPasswordEmail: React.FC<ResetPasswordEmailProps> = ({ onSubmit, loading = false }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      await onSubmit(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset link');
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

      {/* Email Input */}
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lessongray-400" size={20} />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="w-full pl-12 pr-4 py-3 border border-lessongray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-poppins text-lessongray-700 placeholder-lessongray-400 disabled:bg-lessongray-50"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !email}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-poppins"
      >
        {loading ? 'Sending...' : 'Send reset link'}
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

export default ResetPasswordEmail;
