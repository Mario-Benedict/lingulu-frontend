import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mascotLogin from '@assets/auth/logo-vertical.svg';
import ChangePasswordForm from '@components/auth/changepassword/ChangePasswordForm';

const ChangePass: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChangePassword = async (oldPassword: string, newPassword: string, confirmPassword: string) => {
    setLoading(true);
    try {
      const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE}/api/account/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to change password');
      }

      setSuccess(true);
      // Redirect to profile after 2 seconds
      setTimeout(() => {
        navigate('/profile', {
          state: { message: 'Password changed successfully!' },
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
          Change Your Password
        </h1>

        {/* Subtitle */}
        <p className="text-center text-lessongray-600 text-sm mb-8 font-poppins">
          Enter your old password and new password below to change password
        </p>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg mb-6 border-l-4 border-green-500 text-sm flex items-center gap-2">
            <span>✓</span>
            Password changed successfully! Redirecting to profile...
          </div>
        )}

        {/* Change Password Form */}
        <ChangePasswordForm onSubmit={handleChangePassword} loading={loading} />
      </div>
    </div>
  );
};

export default ChangePass;
