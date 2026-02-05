import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import mascotLogin from '@assets/auth/logo-vertical.svg';
import OtpForm from '@components/auth/otp/OtpForm';
import ResendOtpLink from '@components/auth/otp/ResendOtpLink';
import { verifyOtp, requestOtp } from '@api/services/user';

const OTP_LENGTH = 6;

const Otp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const otpRequestedRef = useRef(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const email = location.state?.email || '';

  useEffect(() => {
    if (!email) {
      navigate('/register', { replace: true });
      return;
    }

    if (otpRequestedRef.current) {
      return;
    }

    otpRequestedRef.current = true;

    const autoRequestOtp = async () => {
      try {
        await requestOtp(email);
        console.log('✅ OTP requested for:', email);
      } catch {
        setError('Failed to send OTP');
      }
    };

    autoRequestOtp();
  }, [email, navigate]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== OTP_LENGTH) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await verifyOtp(email, otp);

      navigate('/login', { 
        state: { message: 'Account verified successfully! Please login.' } 
      });

    } catch {
      setError('Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setResendSuccess(false);
    setError(null);

    try {
      await requestOtp(email);

      setResendSuccess(true);
      setOtp('');
      
      setTimeout(() => setResendSuccess(false), 3000);

    } catch {
      setError('Failed to resend code');
    } finally {
      setIsResending(false);
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
          We've sent a 6-digit code to your email
        </p>

        {/* OTP Input Form */}
        <OtpForm otp={otp} onChange={setOtp} onSubmit={handleVerify} loading={isLoading} error={error} />

        {/* Resend Link */}
        <ResendOtpLink onResend={handleResend} loading={isResending} success={resendSuccess} />
      </div>
    </div>
  );
};

export default Otp;
