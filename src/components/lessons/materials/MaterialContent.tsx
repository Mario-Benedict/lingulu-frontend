import MarkdownRenderer from './MarkdownRenderer';

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
      <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-lessongray-800 mb-6 font-rubik">{title}</h1>
        <div className="text-lessongray-700">
          <MarkdownRenderer content={content} />
        </div>
      </div>
    </div>
  );
};

export const MaterialNotFound: React.FC<MaterialNotFoundProps> = ({
  materialId,
}) => {
  return (
    <div className="bg-white rounded-lg p-8 shadow-md text-center">
      <p className="text-lessongray-600 font-poppins">Material not found</p>
      <p className="text-lessongray-500 text-sm mt-2 font-poppins">
        materialId: {materialId}
      </p>
    </div>
  );
};

export default MaterialContent;
