import type { ApiResponse, MCQResult, MCQSubmitData, SectionContent, SpeakingAttempt, SpeakingScoreResponse } from "@/types";
import { api, modelApi } from "@api/axios";

export const getSpeakingExercises = async (sectionId: string): Promise<ApiResponse<SectionContent>> => {
    return await api.get(`/learning/sections/${sectionId}/content`);
}

export const getSpeakingExerciseScore = async (
    audioBlob: Blob,
    text: string
): Promise<SpeakingScoreResponse> => {
    const formData = new FormData();

    formData.append('file', audioBlob, 'recording.wav');
    formData.append('text', text);

    const response = await modelApi.post<SpeakingScoreResponse>("/model/predict", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        timeout: 120_000,
    });
    
    return response.data;
}

export const attemptSpeakingExercise = async (data: SpeakingAttempt): Promise<ApiResponse<SpeakingAttempt>> => {
    return await api.post("/learning/section/speaking/attempt", data);
}

export const submitSpeakingExercise = async (data: SpeakingAttempt): Promise<ApiResponse<Array<SpeakingAttempt>>> => {
    return await api.post("/learning/section/speaking/complete", data);
}

export const getSpeakingExercisesRetry = async (sectionId: string): Promise<ApiResponse<SectionContent>> => {
    return await api.get(`/learning/sections/${sectionId}/content-retry`);
}

export const getMcqExercises = async (sectionId: string): Promise<ApiResponse<SectionContent>> => {
    return await api.get(`/learning/sections/${sectionId}/content`);
}

export const getMcqExercisesRetry = async (sectionId: string): Promise<ApiResponse<SectionContent>> => {
    return await api.get(`/learning/sections/${sectionId}/content-retry`);
}

export const submitMcqAnswer = async (data: MCQSubmitData): Promise<ApiResponse<MCQResult>> => {
    return await api.post("/learning/section/attempt", data);
}