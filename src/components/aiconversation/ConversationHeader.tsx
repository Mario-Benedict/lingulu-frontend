import { useTranslation } from 'react-i18next';
import InfoTooltip from './InfoTooltip';

const ConversationHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white shadow-sm sticky top-0 z-10 border-b-primary border-b-2">
      <div className="flex justify-between items-center px-8 py-6">
        <div>
          <h2 className="text-5xl font-bold text-primary font-rubik">{t('conversation.title')}</h2>
          <p className="text-lessongray-500 text-lg font-rubik">{t('conversation.typeMessage')}</p>
        </div>
        <InfoTooltip />
      </div>
    </div>
  );
};

export default ConversationHeader;
