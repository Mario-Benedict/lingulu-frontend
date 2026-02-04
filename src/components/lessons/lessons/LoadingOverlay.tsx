interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = 'Loading...',
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
      <span className="text-2xl text-primary font-bold">{message}</span>
    </div>
  );
};

export default LoadingOverlay;
