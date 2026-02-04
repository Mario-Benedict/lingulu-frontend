import { PencilIcon } from 'lucide-react';

interface BioCardProps {
  bio: string;
  onEditBio?: () => void;
}

const BioCard: React.FC<BioCardProps> = ({ bio, onEditBio }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-xl font-bold text-primary font-rubik">Your Bio</h3>
        {onEditBio && (
          <button onClick={onEditBio} className="w-9 h-9 flex items-center justify-center bg-primary rounded-full text-lessongray-100 hover:bg-primary/70 transition">
            <PencilIcon size={20} />
          </button>
        )}
      </div>
      <p className="text-lessongray-700 text-sm leading-relaxed font-poppins break-words line-clamp-6">{bio}</p>
    </div>
  );
};

export default BioCard;
