export const env = {
  API_BASE_URL: import.meta.env.VITE_BASE_API_URL || 'http://localhost:8080',
  MODEL_API_URL: import.meta.env.VITE_MODEL_API_URL || import.meta.env.VITE_BASE_API_URL || 'http://localhost:8080',
  TIMEOUT: import.meta.env.VITE_API_TIMEOUT || 5000,
};