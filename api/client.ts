import axios from "axios";
import { API_URL, TOKEN_KEY } from "../config";
import type { Session } from "../types";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

let unauthorizedHandler: (() => void) | undefined;

export function setUnauthorizedHandler(handler?: () => void) {
  unauthorizedHandler = handler;
}

apiClient.interceptors.request.use((request) => {
  const rawSession = localStorage.getItem(TOKEN_KEY);

  if (rawSession) {
    try {
      const session = JSON.parse(rawSession) as Session;
      request.headers.Authorization = `Bearer ${session.token}`;
    } catch {
      localStorage.removeItem(TOKEN_KEY);
    }
  }

  return request;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      unauthorizedHandler?.();
    }
    return Promise.reject(error);
  },
);
