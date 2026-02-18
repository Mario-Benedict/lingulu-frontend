import { useTranslation } from 'react-i18next';
interface LoadingOverlayProps {
  message?: string;
}



const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => {
  const { t } = useTranslation();
  const displayMessage = message || t('common.loading');
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
      <span className="text-2xl text-primary font-bold">{displayMessage}</span>
    </div>
  );
};

export default LoadingOverlay;
