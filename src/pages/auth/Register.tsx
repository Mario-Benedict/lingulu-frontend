import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react';
import './Register.css'
import userIcon from '../../../public/assets/auth/user-icon.svg'
import lockIcon from '../../../public/assets/auth/lock-icon.svg'
import googleIcon from '../../../public/assets/auth/google-icon.svg'
import linguluLogo from '../../../public/assets/auth/lingulu-logo.svg'
import mascotRegister from '../../../public/assets/auth/mascot-register.svg'
import emailIcon from '../../../public/assets/auth/email-icon.png'
import confirmIcon from '../../../public/assets/auth/confirm-icon.png'
import eyeIcon from '../../../public/assets/auth/eye-icon.png'
import closedEyeIcon from '../../../public/assets/auth/closedeye-icon.png'

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

  // ERROR SIMULATION FLAGS - Toggle untuk test berbagai error cases
  const ERROR_SIMULATION = {
    EMAIL_ALREADY_EXISTS: true,    // Email sudah terdaftar
    USERNAME_ALREADY_EXISTS: false, // Username sudah digunakan
    WEAK_PASSWORD: false,           // Password terlalu lemah
    PASSWORD_MISMATCH: false,       // Password tidak cocok
    INVALID_EMAIL: false,           // Email tidak valid
    TERMS_NOT_AGREED: false,        // Belum setuju terms
    SERVER_ERROR: false,            // Server error
  }

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
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    // Validate form
    if (!validateForm()) {
      return
    }

    // ERROR SIMULATION - Uncomment satu case untuk test
    if (ERROR_SIMULATION.EMAIL_ALREADY_EXISTS) {
      newErrors.email = 'Email sudah terdaftar. Gunakan email lain atau login.'
    }
    if (ERROR_SIMULATION.USERNAME_ALREADY_EXISTS) {
      newErrors.username = 'Username sudah digunakan. Coba username lain.'
    }
    if (ERROR_SIMULATION.WEAK_PASSWORD) {
      newErrors.password = 'Password terlalu lemah. Gunakan kombinasi huruf, angka, dan simbol.'
    }
    if (ERROR_SIMULATION.TERMS_NOT_AGREED) {
      newErrors.terms = 'Anda harus setuju dengan terms & privacy untuk melanjutkan'
    }
    if (ERROR_SIMULATION.SERVER_ERROR) {
      newErrors.submit = 'Terjadi kesalahan server. Silakan coba lagi nanti.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // TODO: Implementasi register logic dengan API nanti
    console.log('Register attempt:', { username, email, password })
    setErrors({})
  }

  const handleGoogleSignUp = () => {
    // TODO: Implementasi Google signup nanti
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
    <div className="register-page">
      <div className="register-left">
        <div className="mascot-container">
          <img src={mascotRegister} alt="" className="tiger-mascot" />
        </div>
      </div>

      <div className="register-right">
        <div className="register-box">
          <img src={linguluLogo} alt="Lingulu Logo" className="lingulu-logo" />
          <h1>CREATE ACCOUNT</h1>
          
          <form onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="error-message">
                {errors.submit}
              </div>
            )}

            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="username" className='icon'>
                  <img src={userIcon} alt="user" className="input-icon"/>
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
                />
              </div>
              {errors.username && <span className="field-error">{errors.username}</span>}
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="email" className='icon'>
                  <img src={emailIcon} alt="user" className="input-icon"/>
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
                />
              </div>
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="password" className='icon'>
                  <img src={lockIcon} alt="password" className="input-icon"/>
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
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={handleTogglePassword}
                >
                  <img src={showPassword ? eyeIcon : closedEyeIcon} alt="toggle password" className="eye-icon"/>
                </button>
              </div>
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="confirm-password" className='icon'>
                  <img src={confirmIcon} alt="password" className="input-icon"/>
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
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={handleToggleConfirmPassword}
                >
                  <img src={showConfirmPassword ? eyeIcon : closedEyeIcon} alt="toggle password" className="eye-icon"/>
                </button>
              </div>
              {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
            </div>

            <div className="agree-terms">
              <input type="checkbox" id="agree" checked={agreeToTerms} onChange={(e) => {
                setAgreeToTerms(e.target.checked)
                if (errors.terms) clearError('terms')
              }} />
              <label htmlFor="agree">I agree to the terms & privacy</label>
            </div>
            {errors.terms && <span className="field-error">{errors.terms}</span>}

            <button type="submit" className="register-btn">
              SIGN UP
            </button>
          </form>

          <div className="divider">Or Sign Up with</div>

          <button type="button" className="google-btn" onClick={handleGoogleSignUp}>
            <img src={googleIcon} alt="google" className="google-icon" /> Continue with Google
          </button>

          <p className="login-link">
            Already have account? <a onClick={() => navigate('/login')}>Login</a>
          </p>
        </div>
      </div>
    </div>
  )
}
