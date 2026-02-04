import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mascotLogin from '@assets/auth/logo-vertical.svg';
import ResetPasswordEmail from '@components/auth/ResetPasswordEmail';
import ResetPasswordForm from '@components/auth/ResetPasswordForm';

type ResetStep = 'email' | 'form';

const ResetPass: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<ResetStep>('email');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleEmailSubmit = async (emailValue: string) => {
    setLoading(true);
    try {
      const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
      
      const response = await fetch(`${API_BASE}/api/account/send-reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to send reset link');
      }

      setEmail(emailValue);
      setStep('form');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (newPassword: string, confirmPassword: string) => {
    setLoading(true);
    try {
      const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
      
      const response = await fetch(`${API_BASE}/api/account/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newPassword,
          confirmPassword,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to reset password');
      }

      setSuccess(true);
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login', {
          state: { message: 'Password reset successfully! Please login with your new password.' },
        });
      }, 2000);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen auth-gradient overflow-hidden">
      {/* White Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl px-12 py-10 w-full max-w-lg mx-4">
        {/* Logo & Mascot */}
        <div className="flex flex-col items-center mb-4">
          <img src={mascotLogin} alt="Lingulu Mascot" className="w-24 h-24 object-contain" />
        </div>

        {/* Title */}
        <h1 className="text-center text-primary text-3xl font-bold font-rubik mb-2">
          Reset Your Password
        </h1>

        {/* Subtitle */}
        <p className="text-center text-lessongray-600 text-sm mb-8 font-poppins">
          {step === 'email'
            ? "Enter your email address below and we'll send you a link to reset your password !"
            : 'Enter your new password below'}
        </p>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg mb-6 border-l-4 border-green-500 text-sm flex items-center gap-2">
            <span>✓</span>
            Password reset successfully! Redirecting to login...
          </div>
        )}

        {/* Render appropriate form based on step */}
        {step === 'email' ? (
          <ResetPasswordEmail onSubmit={handleEmailSubmit} loading={loading} />
        ) : (
          <ResetPasswordForm email={email} onSubmit={handlePasswordSubmit} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default ResetPass;
