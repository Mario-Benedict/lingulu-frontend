import googleIcon from '@assets/auth/google-icon.svg';


const handleGoogleSignUp = () => {
  window.location.href = 'http://localhost:8080/oauth2/authorization/google';
};

const GoogleSignUpButton: React.FC = () => {
  return (
    <button type="button" className="google-btn" onClick={handleGoogleSignUp}>
      <img src={googleIcon} alt="google" className="text-lg leading-none w-6 h-6 object-contain" /> Continue with Google
    </button>
  );
};

export default GoogleSignUpButton;
