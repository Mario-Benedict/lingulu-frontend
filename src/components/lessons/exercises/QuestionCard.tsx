interface QuestionCardProps {
  questionNumber: number;
  questionText: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionNumber, questionText }) => {
  return (
    <div className="mb-6 sm:mb-8 md:mb-12 border-b-lessongray-400 border-b pb-4 sm:pb-6">
      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-lessongray-700 mb-1 sm:mb-2 font-rubik">
        Soal {questionNumber}
      </h3>
      <p className="text-sm sm:text-base md:text-lg text-lessongray-600 font-poppins">{questionText}</p>
    </div>
  );
};

export default QuestionCard;
