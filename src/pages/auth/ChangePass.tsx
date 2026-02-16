import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mascotLogin from '@assets/auth/logo-vertical.svg';
import ChangePasswordForm from '@components/auth/changepassword/ChangePasswordForm';
import { changePassword } from '@/api/services';

const ChangePass: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChangePassword = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (!result.success) {
        throw new Error(result.message || 'Gagal mengubah password');
      }

      setSuccess(true);
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login', {
          state: { message: 'Password berhasil diubah! Silakan login kembali.' },
        });
      }, 2000);
    } catch (error: any) {
      const backendMessage = error.response?.data?.message || error.message || 'Gagal mengubah password';
      
      // Translate common error messages
      let errorMsg = backendMessage;
      if (backendMessage.toLowerCase().includes('password') && backendMessage.toLowerCase().includes('invalid')) {
        errorMsg = 'Password tidak valid';
      } else if (backendMessage.toLowerCase().includes('current password') && backendMessage.toLowerCase().includes('incorrect')) {
        errorMsg = 'Password saat ini salah';
      }
      
      setError(errorMsg);
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
          Ubah Password
        </h1>

        {/* Subtitle */}
        <p className="text-center text-lessongray-600 text-xs sm:text-sm mb-6 sm:mb-8 font-poppins">
          Masukkan password saat ini dan password baru untuk mengubah password
        </p>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 text-green-600 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 border-l-4 border-green-500 text-xs sm:text-sm flex items-center gap-2">
            <span>✓</span>
            Password berhasil diubah! Mengarahkan ke login...
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 border-l-4 border-red-500 text-xs sm:text-sm flex items-center gap-2">
            <span>✗</span>
            {error}
          </div>
        )}

        {/* Change Password Form */}
        <ChangePasswordForm onSubmit={handleChangePassword} loading={loading} />
      </div>
    </div>
  );
};

export default ChangePass;
