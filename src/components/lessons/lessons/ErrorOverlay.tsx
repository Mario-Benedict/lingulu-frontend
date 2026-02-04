interface ErrorOverlayProps {
  message: string;
}

const ErrorOverlay: React.FC<ErrorOverlayProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <span className="text-xl text-red-500 font-bold">{message}</span>
    </div>
  );
};

export default ErrorOverlay;
