import axios from "axios";
import type { ApiErrorPayload } from "../types";

export function getApiError(error: unknown): ApiErrorPayload {
  if (axios.isAxiosError<ApiErrorPayload>(error)) {
    return error.response?.data ?? { message: error.message };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: "Ocurrió un error inesperado." };
}
