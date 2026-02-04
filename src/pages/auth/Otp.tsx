import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import mascotLogin from '@assets/auth/logo-vertical.svg';
import OtpInput from '@components/auth/OtpInput';
import { verifyOtp, requestOtp } from '@api/services/user';

const OTP_LENGTH = 6;

const Otp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  // Get email from navigation state (passed from register page)
  const email = location.state?.email || '';

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== OTP_LENGTH) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await verifyOtp(email, otp);

      // Navigate to login on success
      navigate('/login', { 
        state: { message: 'Account verified successfully! Please login.' } 
      });

    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || err?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendSuccess(false);
    setError(null);

    try {
      await requestOtp(email);

      setResendSuccess(true);
      setOtp(''); // Clear current OTP
      
      // Clear success message after 3 seconds
      setTimeout(() => setResendSuccess(false), 3000);

    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || err?.message || 'Failed to resend code');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen auth-gradient overflow-hidden">
      {/* White Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl px-12 py-10 w-full max-w-lg mx-4">
        {/* Logo & Mascot */}
        <div className="flex flex-col items-center mb-4">
          <img 
            src={mascotLogin} 
            alt="Lingulu Mascot" 
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-center text-primary text-3xl font-bold font-rubik mb-2">
          Verify Your Account
        </h1>
        
        {/* Subtitle */}
        <p className="text-center text-gray-600 text-sm mb-8 font-poppins">
          Verify Your Account  We've sent a 4-digit code to your email
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 border-l-4 border-red-500 text-sm flex items-center gap-2">
            <span>⚠️</span>
            {error}
          </div>
        )}

        {/* Success Message */}
        {resendSuccess && (
          <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg mb-6 border-l-4 border-green-500 text-sm flex items-center gap-2">
            <span>✓</span>
            Code resent successfully!
          </div>
        )}

        {/* OTP Input Form */}
        <form onSubmit={handleVerify} className="flex flex-col items-center">
          <OtpInput
            length={OTP_LENGTH}
            value={otp}
            onChange={setOtp}
            disabled={loading}
          />

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading || otp.length !== OTP_LENGTH}
            className="w-full mt-10 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-poppins"
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </form>

        {/* Resend Link */}
        <p className="text-center text-gray-600 text-sm mt-6 font-poppins">
          Didn't receive the code?{' '}
          <button
            type="button"
            onClick={handleResend}
            disabled={resendLoading}
            className="text-primary font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border-none cursor-pointer"
          >
            {resendLoading ? 'Sending...' : 'Resend'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Otp;
