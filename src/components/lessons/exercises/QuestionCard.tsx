interface QuestionCardProps {
  questionNumber: number;
  questionText: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionNumber, questionText }) => {
  return (
    <div className="mb-12 border-b-lessongray-400 border-b pb-6">
      <h3 className="text-xl font-semibold text-lessongray-700 mb-2 font-rubik">
        Soal {questionNumber}
      </h3>
      <p className="text-lg text-lessongray-600 font-poppins">{questionText}</p>
    </div>
  );
};

export default QuestionCard;
