import { useNavigate } from 'react-router-dom';

const LoginLink: React.FC = () => {
  const navigate = useNavigate();

  return (
    <p className="text-center text-neutral text-[13px] m-0 mb-0">
      Already have account? <a onClick={() => navigate('/login')} className="text-primary font-semibold cursor-pointer no-underline hover:underline">Login</a>
    </p>
  );
};

export default LoginLink;
