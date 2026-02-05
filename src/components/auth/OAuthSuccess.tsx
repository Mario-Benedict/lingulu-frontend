import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const OAuthSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    console.log("🔵 OAuthSuccess component mounted - Starting auto fetch...");

    // Check for error from backend OAuth
    const errorParam = searchParams.get('error');
    if (errorParam) {
      console.error("OAuth error:", errorParam);
      let errorMessage = errorParam; // Use error message dari backend langsung
      
      navigate("/login", { state: { error: errorMessage }, replace: true });
      return;
    }

    const fetchUserData = async () => {
      try {
        // Check if already authenticated via getAuthenticatedUser
        const response = await fetch(
          "http://localhost:8080/api/account/authenticated",
          {
            method: "GET",
            credentials: "include",
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log("✅ User authenticated:", result);

          if (result.success && result.data) {
            // Save user info
            localStorage.setItem("username", result.data.username || "User");
            setIsAuthenticated(true);
            // Redirect to dashboard
            navigate("/dashboard", { replace: true });
          } else {
            console.error("Authentication check failed:", result);
            navigate("/login", { replace: true });
          }
        } else if (response.status === 500) {
          // Backend throw exception (likely email conflict) - redirect to login dengan generic error
          console.error("Backend error 500 - possibly email conflict");
          navigate("/login", { 
            state: { error: "Email sudah terdaftar dengan akun lain. Silakan gunakan email/password atau coba dengan akun Google lain." }, 
            replace: true 
          });
        } else {
          console.error("Failed authentication check:", response.status);
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("Fetch error:", error);
        navigate("/login", { replace: true });
      }
    };
    // Run once on mount
    fetchUserData();
  }, [navigate, setIsAuthenticated, searchParams]);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="text-center">
        <p className="text-xl font-semibold">Completing sign in...</p>
      </div>
    </div>
  );
};

export default OAuthSuccess;
