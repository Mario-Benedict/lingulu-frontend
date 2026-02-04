import googleIcon from '@assets/auth/google-icon.svg';

interface GoogleSignUpButtonProps {
  onClick: () => void;
}

const GoogleSignUpButton: React.FC<GoogleSignUpButtonProps> = ({ onClick }) => {
  return (
    <button type="button" className="google-btn" onClick={onClick}>
      <img src={googleIcon} alt="google" className="text-lg leading-none w-6 h-6 object-contain" /> Continue with Google
    </button>
  );
};

export default GoogleSignUpButton;
