import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react';
import userIcon from '@assets/auth/user-icon.svg'
import lockIcon from '@assets/auth/lock-icon.svg'
import googleIcon from '@assets/auth/google-icon.svg'
import mascotLogin from '@assets/auth/mascot-login.svg'
import eyeIcon from '@assets/auth/eye-icon.png'
import closedEyeIcon from '@assets/auth/closedeye-icon.png'


export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const passwordRef = useRef<HTMLInputElement>(null);

  // ERROR SIMULATION FLAGS - Toggle untuk test berbagai error cases
  const ERROR_SIMULATION = {
    EMAIL_NOT_FOUND: false,        // Email tidak ditemukan
    INVALID_PASSWORD: false,       // Password salah
    EMAIL_EMPTY: false,            // Email kosong
    PASSWORD_EMPTY: false,         // Password kosong
    INVALID_EMAIL_FORMAT: false,   // Format email tidak valid
    ACCOUNT_LOCKED: false,         // Akun terkunci (brute force)
    SERVER_ERROR: false,           // Server error
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!email.trim()) {
      newErrors.email = 'Email tidak boleh kosong'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Format email tidak valid'
    }

    if (!password) {
      newErrors.password = 'Password tidak boleh kosong'
    } else if (password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    // Validate form
    if (!validateForm()) {
      return
    }

    // ERROR SIMULATION - Uncomment satu case untuk test
    if (ERROR_SIMULATION.EMAIL_NOT_FOUND) {
      newErrors.email = 'Email tidak terdaftar'
    }
    if (ERROR_SIMULATION.INVALID_PASSWORD) {
      newErrors.password = 'Password salah'
    }
    if (ERROR_SIMULATION.INVALID_EMAIL_FORMAT) {
      newErrors.email = 'Format email tidak valid'
    }
    if (ERROR_SIMULATION.ACCOUNT_LOCKED) {
      newErrors.submit = 'Akun Anda terkunci. Coba lagi dalam 15 menit.'
    }
    if (ERROR_SIMULATION.SERVER_ERROR) {
      newErrors.submit = 'Terjadi kesalahan server. Silakan coba lagi nanti.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // TODO: Implementasi login logic dengan API nanti
    console.log('Login attempt:', { email, password })
    setErrors({})
  }

  const handleGoogleLogin = () => {
    // TODO: Implementasi Google login nanti
    console.log('Google login attempt')
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

  const clearError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

  return (
    <div className="flex w-screen h-screen bg-dark overflow-hidden">
      {/* Left Side - Orange Background with Mascot */}
      <div className="flex-1 auth-gradient flex justify-center items-center p-10 relative">
        <div className="text-center text-white relative z-10">
          <img src={mascotLogin} alt="" className="w-[clamp(15em,40vw,35em)] m-0 p-0 animate-bounce-slow block" />
        </div>
      </div>

      {/* Right Side - White Background with Form */}
      <div className="flex-1 bg-background flex justify-center items-center px-10 py-5 overflow-hidden h-full relative max-md:flex-none max-md:min-h-[60vh] max-md:px-5 max-md:pt-10">
        <div className="bg-background w-full max-w-[420px] px-10 py-7 flex flex-col justify-start my-auto max-md:px-6">
          <h1 className="text-center text-primary text-title font-bold font-rubik m-0 mb-5">WELCOME BACK</h1>
          
          <form onSubmit={handleSubmit} className="w-full flex flex-col font-poppins">
            {errors.submit && (
              <div className="bg-errorBg text-error px-2.5 py-2 rounded-md mb-3 border-l-4 border-error text-xs flex items-center gap-1.5 before:content-['⚠️'] before:flex-shrink-0 before:text-sm">
                {errors.submit}
              </div>
            )}

            <div className="mb-3.5">
              <div className="relative flex items-center border-2 border-border rounded-lg bg-inputBg transition-all duration-500 w-full font-poppins focus-within:border-primary focus-within:bg-white">
                <label htmlFor="email" className="ml-3 mr-0 mb-0 cursor-pointer">
                  <img src={userIcon} alt="user" className="w-6 h-6 mr-2 ml-1.5 flex-shrink-0 object-contain"/>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Username"
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
              <div className="relative flex items-center border-2 border-border rounded-lg bg-inputBg transition-all duration-500 w-full font-poppins focus-within:border-primary focus-within:bg-white">
                <label htmlFor="password" className="ml-3 mr-0 mb-0 cursor-pointer">
                  <img src={lockIcon} alt="user" className="w-6 h-6 mr-2 ml-1.5 flex-shrink-0 object-contain"/>
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

            <div className="flex items-center mb-3 mt-2 gap-2">
              <input type="checkbox" id="remember" className="auth-checkbox" />
              <label htmlFor="remember" className="text-neutral text-sm cursor-pointer">Remember me</label>
            </div>

            <button type="submit" className="auth-button mb-3">
              LOGIN
            </button>
          </form>

          <div className="text-center text-neutral text-xs my-3 relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[35%] before:h-px before:bg-border after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[35%] after:h-px after:bg-border">Or Login with</div>

          <button type="button" className="google-btn" onClick={handleGoogleLogin}>
            <img src={googleIcon} alt="google" className="text-lg leading-none w-6 h-6 object-contain" /> Continue with Google
          </button>

          <p className="text-center text-neutral text-[13px] m-0">
            New to Lingulu? <a onClick={() => navigate('/register')} className="text-primary font-semibold cursor-pointer no-underline hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  )
}