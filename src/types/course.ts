export type Grammar = {
    grammarId: string;
    title: string;
    filePath: string;
};

export type Vocabulary = {
    vocabId: string;
    word: string;
    translation: string;
    audioPath: string;
};

export type SpeakingExercise = {
    speakingId: string;
    sentence: string;
    audioPath: string;
};

export type MCQOption = {
    optionId: string;
    text: string;
}

export type MCQQuestion = {
    questionId: string;
    question: string;
    options: Array<MCQOption>;
};

export type MCQ = {
    questions: Array<MCQQuestion>;
};

export type SectionContent = {
    sectionId: string;
    sectionTitle: string;
    sectionType: "GRAMMAR" | "VOCABULARY" | "SPEAKING" | "MCQ";
    isCompleted: boolean;
    grammar?: Array<Grammar> | null;
    vocabularies?: Array<Vocabulary> | null;
    speakings?: Array<SpeakingExercise> | null;
    mcq?: MCQ | null;
};

export type MCQAnswer = {
    questionId: string;
    selectedOptionId: string;
};

export type MCQSelectedAnswer = {
    questionId: string;
    questionText: string;
    selectedOptionId: string;
    selectedOptionText: string;
    isCorrect: boolean;
}

export type MCQSubmitData = {
    sectionId: string;
    answers: Array<MCQAnswer>;
};

export type MCQResult = {
    sectionId: string;
    totalQuestions: number;
    correctAnswers: number;
    score: number;
    answers: Array<MCQSelectedAnswer>;
};