export type ConversationUpload = {
    conversationId: string;
    userText: string;
    aiText: string;
    userAudioUrl: string;
    aiAudioUrl: string;
    createdAt: string;
}

export type ConversationMessage = {
    role: "USER" | "AI";
    text: string;
    audioUrl?: string;
    createdAt: string;
}

export type ConversationData = {
    conversationId: string | null;
    messages: Array<ConversationMessage>;
}