import axios from "axios";
import { env } from "@/config/env";

export const api = axios.create({
  baseURL: env.API_BASE_URL + "/api",
  timeout: env.TIMEOUT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const modelApi = axios.create({
  baseURL: env.MODEL_API_URL + "/api",
  timeout: 120000, // 2 minutes for model API
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});