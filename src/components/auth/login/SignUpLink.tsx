import { useNavigate } from 'react-router-dom';

const SignUpLink: React.FC = () => {
  const navigate = useNavigate();

  return (
    <p className="text-center text-neutral text-[13px] m-0">
      New to Lingulu?{' '}
      <a onClick={() => navigate('/register')} className="text-primary font-semibold cursor-pointer no-underline hover:underline">
        Sign Up
      </a>
    </p>
  );
};

export default SignUpLink;
