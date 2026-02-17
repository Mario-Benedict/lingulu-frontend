import type { ApiResponse, SectionContent } from "@/types";
import { api } from "@api/axios";

export const getSpeakingExercises = async (sectionId: string): Promise<ApiResponse<SectionContent>> => {
    return await api.get(`/learning/sections/${sectionId}/content`);
}