import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mascotLogin from '@assets/auth/logo-vertical.svg';
import ResetPasswordEmail from '@components/auth/resetpassword/ResetPasswordEmail';
import ResetPasswordForm from '@components/auth/resetpassword/ResetPasswordForm';
import { forgotPassword, resetPassword } from '@/api/services';
import { useSearchParams } from 'react-router-dom';


type ResetStep = 'email' | 'form';

const ResetPass: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<ResetStep>('email');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  // Auto-switch to form step jika ada token di URL
  useEffect(() => {
    if (token) {
      setStep('form');
    }
  }, [token]);

  const handleEmailSubmit = async (emailValue: string) => {
    setLoading(true);
    try {
       const result = await forgotPassword(emailValue);

    if (!result.success) {
      throw new Error(result.message);
    }

    // Kalau berhasil
    setEmail(emailValue);
    setEmailSent(true); // trigger UI sukses

  } catch (error: any) {
    alert(error.response?.data?.message || "Failed to send reset email");
    } finally {
    setLoading(false);
    }
  };

  const handlePasswordSubmit = async (newPassword: string, confirmPassword: string) => {
  if (!token) {
    alert("Invalid or missing reset token");
    return;
  }

    setLoading(true);

    try {
          const result = await resetPassword({
            token,
            password: newPassword,
            confirmPassword,
          });

          if (!result.success) {
            throw new Error(result.message);
          }

          setSuccess(true);

          setTimeout(() => {
            navigate('/login', {
              state: {
                message:
                  'Password reset successfully! Please login with your new password.',
              },
            });
          }, 2000);
        } catch (error: any) {
          alert(error.response?.data?.message || "Failed to reset password");
        } finally {
          setLoading(false);
    }
};

  return (
    <div className="flex items-center justify-center w-screen h-screen auth-gradient overflow-hidden px-4 py-6">
      {/* White Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl px-6 sm:px-10 md:px-12 py-8 sm:py-10 w-full max-w-lg">
        {/* Logo & Mascot */}
        <div className="flex flex-col items-center mb-3 sm:mb-4">
          <img src={mascotLogin} alt="Lingulu Mascot" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
        </div>

        {/* Title */}
        <h1 className="text-center text-primary text-2xl sm:text-3xl font-bold font-rubik mb-2">
          Reset Your Password
        </h1>

        {/* Subtitle */}
        <p className="text-center text-lessongray-600 text-xs sm:text-sm mb-6 sm:mb-8 font-poppins">
          {step === 'email'
            ? "Enter your email address below and we'll send you a link to reset your password !"
            : 'Enter your new password below'}
        </p>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 text-green-600 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 border-l-4 border-green-500 text-xs sm:text-sm flex items-center gap-2">
            <span>✓</span>
            Password reset successfully! Redirecting to login...
          </div>
        )}

        {/* Email Sent Success Message */}
        {emailSent && step === 'email' && (
          <div className="text-center text-sm text-gray-600 mb-4">
            <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg border-l-4 border-green-500">
              <p className="font-semibold">Email sent!</p>
              <p className="mt-1">
                We've sent a password reset link to <b>{email}</b>.
                Please check your inbox.
              </p>
            </div>
          </div>
        )}

        {/* Render Form Based on Step */}
        {step === 'email' ? (
          <ResetPasswordEmail onSubmit={handleEmailSubmit} loading={loading} />
        ) : (
          <ResetPasswordForm 
            onSubmit={handlePasswordSubmit} 
            onBack={() => setStep('email')}
            showBackToLogin={true}
            loading={loading} 
          />
        )}
      </div>
    </div>
  );
};

export default ResetPass;
