import type { ApiResponse } from "./general";

export type AuthStatusResponse = ApiResponse<{ authenticated: boolean }>;