interface LessonsHeaderProps {
  title: string;
}

const LessonsHeader: React.FC<LessonsHeaderProps> = ({ title }) => {
  return (
    <div className="bg-white shadow-sm sticky top-0 z-10 border-b-primary border-b-2 pt-[2.5rem]">
      <div className="flex justify-between items-center px-8 py-4">
        <h2 className="text-7xl font-bold text-primary font-rubik">{title}</h2>
      </div>
    </div>
  );
};

export default LessonsHeader;
