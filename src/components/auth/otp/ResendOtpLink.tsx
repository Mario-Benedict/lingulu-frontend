import { useTranslation } from 'react-i18next';

interface ResendOtpLinkProps {
  onResend: () => void;
  loading?: boolean;
  success?: boolean;
}

const ResendOtpLink: React.FC<ResendOtpLinkProps> = ({ onResend, loading = false, success = false }) => {
  const { t } = useTranslation();
  return (
    <div className="mt-6">
      {success && (
        <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg mb-4 border-l-4 border-green-500 text-sm flex items-center gap-2">
          <span>✓</span>
          {t('auth.otpResentSuccessfully')}
        </div>
      )}

      <p className="text-center text-gray-600 text-sm font-poppins">
        {t('auth.didNotReceiveCode')}{' '}
        <button
          type="button"
          onClick={onResend}
          disabled={loading}
          className="text-primary font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border-none cursor-pointer"
        >
          {loading ? t('auth.sending') : t('auth.resend')}
        </button>
      </p>
    </div>
  );
};

export default ResendOtpLink;
