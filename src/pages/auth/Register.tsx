import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react';
import userIcon from '@assets/auth/user-icon.svg'
import lockIcon from '@assets/auth/lock-icon.svg'
import googleIcon from '@assets/auth/google-icon.svg'
import mascotRegister from '@assets/auth/mascot-register.svg'
import emailIcon from '@assets/auth/email-icon.png'
import confirmIcon from '@assets/auth/confirm-icon.png'
import eyeIcon from '@assets/auth/eye-icon.png'
import closedEyeIcon from '@assets/auth/closedeye-icon.png'

// Gunakan path relatif agar selalu lewat proxy Vite

export default function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (pwd: string): { valid: boolean; message?: string } => {
    if (pwd.length < 8) {
      return { valid: false, message: 'Password minimal 8 karakter' }
    }
    if (!/[A-Z]/.test(pwd)) {
      return { valid: false, message: 'Password harus mengandung huruf besar' }
    }
    if (!/[a-z]/.test(pwd)) {
      return { valid: false, message: 'Password harus mengandung huruf kecil' }
    }
    if (!/[0-9]/.test(pwd)) {
      return { valid: false, message: 'Password harus mengandung angka' }
    }
    return { valid: true }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!username.trim()) {
      newErrors.username = 'Username tidak boleh kosong'
    } else if (username.length < 3) {
      newErrors.username = 'Username minimal 3 karakter'
    }

    if (!email.trim()) {
      newErrors.email = 'Email tidak boleh kosong'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Format email tidak valid'
    }

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.message || 'Password tidak valid'
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok'
    }

    if (!agreeToTerms) {
      newErrors.terms = 'Anda harus setuju dengan terms & privacy'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validasi form kamu sendiri
  if (!validateForm()) return;

  try {
    const response = await fetch(`/api/account/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      }),
    });

    const result = await response.json();
    console.log("Register API Response:", result);

    if (!result.success) {
      // BE kamu mengirim error lewat "message"
      setErrors({ submit: result.message || "Registrasi gagal" });
      return;
    }
    
    localStorage.setItem("token", result.data.accessToken);
    localStorage.setItem("userId", result.data.userId);
    // Berhasil daftar → arahkan user ke login
    navigate("/dashboard");

  } catch (err) {
    console.error(err);
    setErrors({ submit: "Tidak dapat menghubungi server" });
  }
};

  const handleGoogleSignUp = () => {
    // Redirect user ke Backend Spring Boot untuk mulai proses Google
    // Pastikan port 8080 (atau sesuai port backendmu)
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
    console.log('Google signup attempt')
  }

  const handleTogglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
    setTimeout(() => {
      if (passwordRef.current) {
        passwordRef.current.focus();
        passwordRef.current.setSelectionRange(password.length, password.length);
      }
    }, 0);
  }

  const handleToggleConfirmPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
    setTimeout(() => {
      if (confirmPasswordRef.current) {
        confirmPasswordRef.current.focus();
        confirmPasswordRef.current.setSelectionRange(confirmPassword.length, confirmPassword.length);
      }
    }, 0);
  }

  const clearError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

  return (
    <div className="flex w-screen h-screen bg-dark overflow-hidden max-md:flex-col">
      {/* Left Side - Orange Background with Mascot */}
      <div className="flex-1 auth-gradient flex justify-center items-center p-10 relative max-md:min-h-[40vh] max-md:p-7">
        <div className="text-center text-white relative z-10">
          <img src={mascotRegister} alt="" className="min-w-[15em] max-w-[35em] w-[40vw] m-0 p-0 animate-bounce-slow block max-md:min-w-[12em] max-md:max-w-[25em] max-md:w-[50vw]" />
        </div>
      </div>

      {/* Right Side - White Background with Form */}
      <div className="flex-1 bg-background flex justify-center items-center px-10 py-5 overflow-hidden h-full relative max-md:min-h-[60vh] max-md:px-5 max-md:pt-10 max-md:justify-start">
        <div className="bg-background w-full max-w-[420px] px-10 py-7 flex flex-col justify-start my-auto max-md:px-6">
          <h1 className="text-center text-primary text-title min-text-[28px] max-text-[36px] font-bold font-rubik m-0 mb-5">CREATE ACCOUNT</h1>
          
          <form onSubmit={handleSubmit} className="w-full flex flex-col font-poppins">
            {errors.submit && (
              <div className="bg-errorBg text-error px-2.5 py-2 rounded-md mb-3 border-l-4 border-error text-xs flex items-center gap-1.5 before:content-['⚠️'] before:flex-shrink-0 before:text-sm">
                {errors.submit}
              </div>
            )}

            <div className="mb-3.5">
              <div className="relative flex items-center border-2 border-border rounded-lg bg-inputBg transition-all duration-500 w-full focus-within:border-primary focus-within:bg-white">
                <label htmlFor="username" className="ml-3 mr-0 mb-0 cursor-pointer">
                  <img src={userIcon} alt="user" className="w-6 h-6 mr-2 ml-1.5 flex-shrink-0 object-contain"/>
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    if (errors.username) clearError('username')
                  }}
                  required
                  className="flex-1 border-none bg-transparent py-2.5 px-0 text-sm text-secondary outline-none placeholder:text-neutral disabled:bg-disabled disabled:cursor-not-allowed"
                />
              </div>
              {errors.username && <span className="block text-error text-[11px] mt-0.5 ml-1.5">{errors.username}</span>}
            </div>

            <div className="mb-3.5">
              <div className="relative flex items-center border-2 border-border rounded-lg bg-inputBg transition-all duration-500 w-full focus-within:border-primary focus-within:bg-white">
                <label htmlFor="email" className="ml-3 mr-0 mb-0 cursor-pointer">
                  <img src={emailIcon} alt="user" className="w-6 h-6 mr-2 ml-1.5 flex-shrink-0 object-contain"/>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) clearError('email')
                  }}
                  required
                  className="flex-1 border-none bg-transparent py-2.5 px-0 text-sm text-secondary outline-none placeholder:text-neutral disabled:bg-disabled disabled:cursor-not-allowed"
                />
              </div>
              {errors.email && <span className="block text-error text-[11px] mt-0.5 ml-1.5">{errors.email}</span>}
            </div>

            <div className="mb-3.5">
              <div className="relative flex items-center border-2 border-border rounded-lg bg-inputBg transition-all duration-500 w-full focus-within:border-primary focus-within:bg-white">
                <label htmlFor="password" className="ml-3 mr-0 mb-0 cursor-pointer">
                  <img src={lockIcon} alt="password" className="w-6 h-6 mr-2 ml-1.5 flex-shrink-0 object-contain"/>
                </label>
                <input
                  ref={passwordRef}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) clearError('password')
                  }}
                  required
                  className="flex-1 border-none bg-transparent py-2.5 px-0 text-sm text-secondary outline-none placeholder:text-neutral disabled:bg-disabled disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  className="bg-transparent border-none p-0 cursor-pointer ml-2 w-fit mr-3 flex items-center justify-center hover:text-primary"
                  onClick={handleTogglePassword}
                >
                  <img src={showPassword ? eyeIcon : closedEyeIcon} alt="toggle password" className="w-6 h-6 object-contain"/>
                </button>
              </div>
              {errors.password && <span className="block text-error text-[11px] mt-0.5 ml-1.5">{errors.password}</span>}
            </div>

            <div className="mb-3.5">
              <div className="relative flex items-center border-2 border-border rounded-lg bg-inputBg transition-all duration-500 w-full focus-within:border-primary focus-within:bg-white">
                <label htmlFor="confirm-password" className="ml-3 mr-0 mb-0 cursor-pointer">
                  <img src={confirmIcon} alt="password" className="w-6 h-6 mr-2 ml-1.5 flex-shrink-0 object-contain"/>
                </label>
                <input
                  ref={confirmPasswordRef}
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    if (errors.confirmPassword) clearError('confirmPassword')
                  }}
                  required
                  className="flex-1 border-none bg-transparent py-2.5 px-0 text-sm text-secondary outline-none placeholder:text-neutral disabled:bg-disabled disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  className="bg-transparent border-none p-0 cursor-pointer ml-2 w-fit mr-3 flex items-center justify-center hover:text-primary"
                  onClick={handleToggleConfirmPassword}
                >
                  <img src={showConfirmPassword ? eyeIcon : closedEyeIcon} alt="toggle password" className="w-6 h-6 object-contain"/>
                </button>
              </div>
              {errors.confirmPassword && <span className="block text-error text-[11px] mt-0.5 ml-1.5">{errors.confirmPassword}</span>}
            </div>

            <div className="flex items-center gap-1 mt-0">
              <input type="checkbox" id="agree" checked={agreeToTerms} onChange={(e) => {
                setAgreeToTerms(e.target.checked)
                if (errors.terms) clearError('terms')
              }} className="auth-checkbox" />
              <label htmlFor="agree" className="text-neutral text-sm cursor-pointer">I agree to the terms & privacy</label>
            </div>
            {errors.terms && <span className="block text-error text-[11px] mt-0.5 ml-1.5">{errors.terms}</span>}

            <button type="submit" className="auth-button mb-3 mt-4">
              SIGN UP
            </button>
          </form>

          <div className="text-center text-neutral text-xs my-3 relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[35%] before:h-px before:bg-border after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[35%] after:h-px after:bg-border">Or Sign Up with</div>

          <button type="button" className="google-btn" onClick={handleGoogleSignUp}>
            <img src={googleIcon} alt="google" className="text-lg leading-none w-6 h-6 object-contain" /> Continue with Google
          </button>

          <p className="text-center text-neutral text-[13px] m-0 mb-0">
            Already have account? <a onClick={() => navigate('/login')} className="text-primary font-semibold cursor-pointer no-underline hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  )
}
