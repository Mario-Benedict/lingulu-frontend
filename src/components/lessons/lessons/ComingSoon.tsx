import { useTranslation } from 'react-i18next';
interface ComingSoonProps {
  title?: string;
  message?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title: propTitle,
  message: propMessage,
}) => {
  const { t } = useTranslation();
  const title = propTitle || t('lessons.comingSoon');
  const message = propMessage || t('lessons.comingSoonMessage');
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center p-8">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-4xl font-bold text-primary font-rubik mb-4">{title}</h2>
        <p className="text-lg text-lessongray-600 font-poppins max-w-md mx-auto">
          {message}
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
