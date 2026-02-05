import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@api/axios/index';
import { requestOtp } from '@api/services/user';
import RegisterForm from '@components/auth/register/RegisterForm';
import GoogleSignUpButton from '@components/auth/register/GoogleSignUpButton';
import LoginLink from '@components/auth/register/LoginLink';
import mascotRegister from '@assets/auth/mascot-register.svg'
<<<<<<< HEAD
import { registerUser } from '@api/services/user';
=======
>>>>>>> origin/fix/login-register-otp

const Register: React.FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const handleRegisterSubmit = async (username: string, email: string, password: string, confirmPassword: string) => {
    setIsLoading(true);
<<<<<<< HEAD

    try {
      const response = await registerUser({ username, email, password, confirmPassword });

      if (!response.success) {
        throw new Error('Registrasi gagal');
      }

      navigate('/dashboard');
    }  finally {
=======
    try {
      const response = await api.post('/api/account/register', {
        username,
        email,
        password,
        confirmPassword,
      });

      if (!response.success) {
        throw new Error(response.message || 'Registrasi gagal');
      }
      
      // Navigate ke OTP page - OTP akan di-request oleh Otp component saat mount
      navigate('/otp-verify', { state: { email } });
    } catch (error: any) {
      // Backend return validation errors di data field
      // Contoh: { success: false, message: "Validation Error", data: { email: ["Email already in use"] } }
      let errorMessage = error.response?.data?.message || error.message || 'Registrasi gagal';
      
      // Jika ada validation errors di data field, extract first error
      if (error.response?.data?.data && typeof error.response.data.data === 'object') {
        const errors = error.response.data.data;
        // Ambil error pertama yang ada
        for (const [field, messages] of Object.entries(errors)) {
          if (Array.isArray(messages) && messages.length > 0) {
            errorMessage = messages[0] as string;
            break;
          }
        }
      }
      
      throw new Error(errorMessage);
    } finally {
>>>>>>> origin/fix/login-register-otp
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen bg-dark overflow-hidden max-md:flex-col">
      <div className="flex-1 auth-gradient flex justify-center items-center p-10 relative max-md:min-h-[40vh] max-md:p-7">
        <div className="text-center text-white relative z-10">
          <img src={mascotRegister} alt="" className="min-w-[15em] max-w-[35em] w-[40vw] m-0 p-0 animate-bounce-slow block max-md:min-w-[12em] max-md:max-w-[25em] max-md:w-[50vw]" />
        </div>
      </div>

      <div className="flex-1 bg-background flex justify-center items-center px-10 py-5 overflow-hidden h-full relative max-md:min-h-[60vh] max-md:px-5 max-md:pt-10 max-md:justify-start">
        <div className="bg-background w-full max-w-[420px] px-10 py-7 flex flex-col justify-start my-auto max-md:px-6">
          <h1 className="text-center text-primary text-title min-text-[28px] max-text-[36px] font-bold font-rubik m-0 mb-5">CREATE ACCOUNT</h1>

          <RegisterForm onSubmit={handleRegisterSubmit} loading={isLoading} />

<<<<<<< HEAD

          <div className="text-center text-neutral text-xs my-3 relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[35%] before:h-px before:bg-border after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[35%] after:h-px after:bg-border">Or Sign Up with</div>

          <GoogleSignUpButton />
=======
          {/* Divider */}
          <div className="text-center text-neutral text-xs my-3 relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[35%] before:h-px before:bg-border after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[35%] after:h-px after:bg-border">
            Or Sign Up with
          </div>

          <GoogleSignUpButton onClick={handleGoogleSignUp} />

>>>>>>> origin/fix/login-register-otp
          <LoginLink />
        </div>
      </div>
    </div>
  );
};

export default Register;
