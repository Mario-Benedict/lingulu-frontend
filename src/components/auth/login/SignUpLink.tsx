import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const SignUpLink: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <p className="text-center text-neutral text-[13px] m-0">
      {t('auth.newToLingulu')}{' '}
      <a onClick={() => navigate('/register')} className="text-primary font-semibold cursor-pointer no-underline hover:underline">
        {t('auth.register')}
      </a>
    </p>
  );
};

export default SignUpLink;
