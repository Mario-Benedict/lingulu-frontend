import OtpInput from '@/components/auth/otp/OtpInput';

interface OtpFormProps {
  otp: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
  error?: string | null;
}

const OtpForm: React.FC<OtpFormProps> = ({ otp, onChange, onSubmit, loading = false, error }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center">
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 border-l-4 border-red-500 text-sm flex items-center gap-2 w-full">
          <span>⚠️</span>
          {error}
        </div>
      )}

      <OtpInput length={6} value={otp} onChange={onChange} disabled={loading} />

      <button
        type="submit"
        disabled={loading || otp.length !== 6}
        className="w-full mt-10 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-poppins"
      >
        {loading ? 'Verifying...' : 'Verify & Continue'}
      </button>
    </form>
  );
};

export default OtpForm;
