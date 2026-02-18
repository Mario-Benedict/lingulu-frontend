import { useNavigate } from 'react-router-dom';
import {useTranslation} from 'react-i18next';

interface ForgotPasswordLinkProps {
  className?: string;
}

const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = ({ className }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={() => navigate('/reset-password')}
      className={className || 'text-primary text-sm font-semibold hover:underline bg-transparent border-none cursor-pointer'}
    >
      {t('auth.forgotPassword')}
    </button>
  );
};

export default ForgotPasswordLink;
