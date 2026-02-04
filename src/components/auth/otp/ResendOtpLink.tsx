interface ResendOtpLinkProps {
  onResend: () => void;
  loading?: boolean;
  success?: boolean;
}

const ResendOtpLink: React.FC<ResendOtpLinkProps> = ({ onResend, loading = false, success = false }) => {
  return (
    <div className="mt-6">
      {success && (
        <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg mb-4 border-l-4 border-green-500 text-sm flex items-center gap-2">
          <span>✓</span>
          Code resent successfully!
        </div>
      )}

      <p className="text-center text-gray-600 text-sm font-poppins">
        Didn't receive the code?{' '}
        <button
          type="button"
          onClick={onResend}
          disabled={loading}
          className="text-primary font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border-none cursor-pointer"
        >
          {loading ? 'Sending...' : 'Resend'}
        </button>
      </p>
    </div>
  );
};

export default ResendOtpLink;
