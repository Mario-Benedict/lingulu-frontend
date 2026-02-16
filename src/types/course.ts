export type Grammar = {
    grammarId: string;
    title: string;
    filePath: string;
}

export type Vocabulary = {
    vocabId: string;
    word: string;
    translation: string;
    audioPath: string;
}

export type Material = {
    sectionId: string;
    sectionTitle: string;
    sectionType: "GRAMMAR" | "VOCABULARY" | "SPEAKING" | "MCQ";
    isCompleted: boolean;
    grammar?: Array<Grammar> | null;
    vocabularies?: Array<Vocabulary> | null;
}