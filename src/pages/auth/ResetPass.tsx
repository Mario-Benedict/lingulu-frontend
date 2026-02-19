import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mascotLogin from '@assets/auth/logo-vertical.svg';
import ResetPasswordEmail from '@components/auth/resetpassword/ResetPasswordEmail';
import ResetPasswordForm from '@components/auth/resetpassword/ResetPasswordForm';
import { forgotPassword, resetPassword } from '@/api/services';
import { useSearchParams } from 'react-router-dom';
import { t } from 'i18next';


type ResetStep = 'email' | 'form';

const ResetPass: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<ResetStep>('email');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');
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
    setError('');
    try {
       const result = await forgotPassword(emailValue);

      if (!result.success) {
        throw new Error(result.message);
      }

      // Kalau berhasil
      setEmail(emailValue);
      setEmailSent(true); // trigger UI sukses

    } catch (error: unknown) {
      const errorMessage = (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string') ? error.response.data.message : t('auth.failedToSendResetEmail');
      setError(errorMessage);
    } finally {
      setLoading(false);
      }
    };

  const handlePasswordSubmit = async (newPassword: string, confirmPassword: string) => {
    if (!token) {
      setError(t('auth.invalidResetToken'));
      return;
    }

    setLoading(true);
    setError('');

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
              t('auth.passwordChangedSuccessfully'),
          },
        });
      }, 2000);
    } catch (error: unknown) {
      const errorMessage = (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data && typeof error.response.data.message === 'string') ? error.response.data.message : t('auth.failedToChangePassword');
      setError(errorMessage);
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
          {t('auth.resetYourPassword')}
        </h1>

        {/* Subtitle */}
        <p className="text-center text-lessongray-600 text-xs sm:text-sm mb-6 sm:mb-8 font-poppins">
          {step === 'email'
            ? t('auth.enterEmailToResetPassword')
            : t('auth.enterNewPassword')}
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 border-l-4 border-red-500 text-xs sm:text-sm flex items-center gap-2">
            <span>✕</span>
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 text-green-600 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 border-l-4 border-green-500 text-xs sm:text-sm flex items-center gap-2">
            <span>✓</span>
            {t('auth.passwordResetSuccessfully')}
          </div>
        )}

        {/* Email Sent Success Message */}
        {emailSent && step === 'email' && (
          <div className="text-center text-sm text-gray-600 mb-4">
            <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg border-l-4 border-green-500">
              <p className="font-semibold">Email sent!</p>
              <p className="mt-1">
                {t('auth.passwordResetEmailSent')} <span className="font-bold">{email}</span>. {t('auth.passwordResetEmailCheckInbox')}
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
