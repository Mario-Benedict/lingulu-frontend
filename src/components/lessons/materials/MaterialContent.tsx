import type { Grammar, Vocabulary } from '@/types';
import GrammarRenderer from './GrammarRenderer';
import VocabularyList from './VocabularyList';

interface MaterialContentProps {
  content: Array<Grammar> | Array<Vocabulary> | null;
  type: "GRAMMAR" | "VOCABULARY" | "SPEAKING" | "MCQ";
}

interface MaterialNotFoundProps {
  materialId?: string;
  contentId?: string;
}

export const MaterialContent: React.FC<MaterialContentProps> = ({ content, type }) => {
  const renderContent = () => {
    if (!content || content.length === 0) {
      return (
        <p className="text-lessongray-600 font-poppins">No content available for this material.</p>
      );
    }

    switch (type) {
      case "GRAMMAR":
        return <GrammarRenderer grammarItems={content as Array<Grammar>} />;
      
      case "VOCABULARY":
        return <VocabularyList vocabularyItems={content as Array<Vocabulary>} />;
      
      default:
        return (
          <p className="text-lessongray-600 font-poppins">Unknown content type.</p>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-md">
        <div className="text-lessongray-700">
          {renderContent()}
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
