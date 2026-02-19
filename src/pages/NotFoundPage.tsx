import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div style={{textAlign: 'center',display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw'}}>
        <h1>{t('notFound.title')}</h1>
        <p>{t('notFound.description')}</p>
        <Link to="/">{t('notFound.goHome')}</Link>
    </div>
  );
};

export default NotFoundPage;