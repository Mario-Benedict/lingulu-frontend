import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔵 OAuthSuccess component mounted - Starting auto fetch...");

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/account/profile",
          {
            method: "POST",
            credentials: "include", // Kirim cookie bersama permintaan
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log("✅ User data received:", result);

          // Save to localStorage/state
          if (result.data) {
            localStorage.setItem("username", result.data.username);
          }
          // Redirect to dashboard
          navigate("/dashboard");
        } else {
          console.error("Failed to get user data");
          navigate("/login?error=oauth_failed");
        }
      } catch (error) {
        console.error("fetch error:", error);
        navigate("/login?error=network_error");
      }
    };

    // INI DIEKSEKUSI OTOMATIS ketika component mount
    fetchUserData();
  }, [navigate]); // Empty dependency = run once on mount

  return null
};

export default OAuthSuccess;
