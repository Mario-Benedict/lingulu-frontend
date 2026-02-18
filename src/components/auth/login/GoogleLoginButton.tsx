import googleIcon from '@assets/auth/google-icon.svg';
import {useTranslation} from 'react-i18next';

interface GoogleLoginButtonProps {
  onClick: () => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <button type="button" className="google-btn" onClick={onClick}>
      <img src={googleIcon} alt="google" className="text-lg leading-none w-6 h-6 object-contain" /> {t('auth.continueWithGoogle')}
    </button>
  );
};

export default GoogleLoginButton;
