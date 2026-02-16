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