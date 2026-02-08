import { useTranslation } from 'react-i18next';
import { Info } from 'lucide-react';

const ConversationHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white shadow-sm sticky top-0 z-10 border-b-primary border-b-2">
      <div className="flex justify-between items-center px-8 py-6">
        <div>
          <h2 className="text-5xl font-bold text-primary font-rubik">{t('conversation.title')}</h2>
          <p className="text-lessongray-500 text-lg font-rubik">{t('conversation.typeMessage')}</p>
        </div>
        <div className="relative">
          <button className="p-3 hover:bg-lessongray-100 rounded-full peer">
            <Info size={32} className="text-primary" />
          </button>
          <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg border border-lessongray-200 p-4 opacity-0 invisible peer-hover:opacity-100 peer-hover:visible transition-all duration-200 z-20 pointer-events-none">
            <h4 className="font-semibold text-lessongray-800 font-rubik mb-2">{t('conversation.title')}</h4>
            <p className="text-sm text-lessongray-600 font-poppins leading-relaxed">
              {t('dashboard.practiceDescription')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationHeader;
