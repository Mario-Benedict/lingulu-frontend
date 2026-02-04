import { useNavigate } from 'react-router-dom';

interface ForgotPasswordLinkProps {
  className?: string;
}

const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate('/reset-password')}
      className={className || 'text-primary text-sm font-semibold hover:underline bg-transparent border-none cursor-pointer'}
    >
      Forgot Password?
    </button>
  );
};

export default ForgotPasswordLink;
