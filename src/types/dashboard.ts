import type { CourseProgress } from "./progress";

export type Dashboard = {
    courseResponse: CourseProgress;
    username: string;
    streak: number;
    rank: number;
};