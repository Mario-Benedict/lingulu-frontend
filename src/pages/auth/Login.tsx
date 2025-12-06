import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react';
import './Login.css'
import userIcon from '@assets/auth/user-icon.svg'
import lockIcon from '@assets/auth/lock-icon.svg'
import googleIcon from '@assets/auth/google-icon.svg'
import linguluLogo from '@assets/auth/lingulu-logo.svg'
import mascotLogin from '@assets/auth/mascot-login.svg'
import eyeIcon from '@assets/auth/eye-icon.png'
import closedEyeIcon from '@assets/auth/closedeye-icon.png'

// 🟩 TARUH DI SINI
console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);

const API_URL = import.meta.env.VITE_API_URL;


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

  if (!validateForm()) return;

  try {
    const response = await fetch(`${API_URL}/api/account/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        email: email,
        password: password
      }),
    });

    const result = await response.json();
    console.log("API Response:", result);

    if (!result.success) {
      setErrors({ submit: result.message || "Login gagal" });
      return;
    }

    // Simpan token
    localStorage.setItem("token", result.data.accessToken);
    localStorage.setItem("userId", result.data.userId);

    // Redirect
    navigate("/dashboard");

  } catch (err) {
    console.error(err);
    setErrors({ submit: "Tidak dapat menghubungi server" });
  }
};


  const handleGoogleLogin = () => {
    // TODO: Implementasi Google login nanti

    // Redirect user ke Backend Spring Boot (sama persis dengan Register)
    // Asumsi backend jalan di port 8080
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
    
    // Atau kalau mau pakai variabel API_URL yang sudah ada di atas:
    // Pastikan API_URL mengarah ke root (misal http://localhost:8080), bukan /api
    // window.location.href = `${API_URL.replace('/api', '')}/oauth2/authorization/google`;
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
    <div className="login-page">
      <div className="login-left">
        <div className="mascot-container">
          <img src={mascotLogin} alt="" className="tiger-mascot" />
        </div>
      </div>

      <div className="login-right">
        <div className="login-box">
          <img src={linguluLogo} alt="Lingulu Logo" className="lingulu-logo" />
          <h1>WELCOME BACK</h1>
          
          <form onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="error-message">
                {errors.submit}
              </div>
            )}

            <div className="form-group">
              <div className="input-wrapper">
                <label htmlFor="email" className='icon'>
                  <img src={userIcon} alt="user" className="input-icon"/>
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
                  <img src={lockIcon} alt="user" className="input-icon"/>
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

            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>

            <button type="submit" className="login-btn">
              LOGIN
            </button>
          </form>

          <div className="divider">Or Login with</div>

          <button type="button" className="google-btn" onClick={handleGoogleLogin}>
            <img src={googleIcon} alt="google" className="google-icon" /> Continue with Google
          </button>

          <p className="signup-link">
            New to Lingulu? <a onClick={() => navigate('/register')}>Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  )
}