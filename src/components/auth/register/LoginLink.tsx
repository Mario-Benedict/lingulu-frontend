import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const LoginLink: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <p className="text-center text-neutral text-[13px] m-0 mb-0">
      {t('auth.alreadyHaveAccount')} <a onClick={() => navigate('/login')} className="text-primary font-semibold cursor-pointer no-underline hover:underline">{t('auth.login')}</a>
    </p>
  );
};

export default LoginLink;
