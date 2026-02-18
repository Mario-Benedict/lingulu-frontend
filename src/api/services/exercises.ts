import type { ApiResponse, MCQResult, MCQSubmitData, SectionContent } from "@/types";
import { api } from "@api/axios";

export const getSpeakingExercises = async (sectionId: string): Promise<ApiResponse<SectionContent>> => {
    return await api.get(`/learning/sections/${sectionId}/content`);
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