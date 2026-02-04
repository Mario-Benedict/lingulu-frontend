interface MaterialContentProps {
  title: string;
  content: string;
}

interface MaterialNotFoundProps {
  materialId?: string;
  contentId?: string;
}

export const MaterialContent: React.FC<MaterialContentProps> = ({ title, content }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-3xl font-bold text-lessongray-800 mb-4">{title}</h1>
        <p className="text-lessongray-600 leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
};

export const MaterialNotFound: React.FC<MaterialNotFoundProps> = ({
  materialId,
  contentId,
}) => {
  return (
    <div className="bg-white rounded-lg p-8 shadow-md text-center">
      <p className="text-lessongray-600 font-poppins">Content not found</p>
      <p className="text-lessongray-500 text-sm mt-2 font-poppins">
        materialId: {materialId}, contentId: {contentId}
      </p>
    </div>
  );
};

export default MaterialContent;
