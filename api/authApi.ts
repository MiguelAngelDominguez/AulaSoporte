import { apiClient } from "./client";
import { USE_MOCK_API } from "../config";
import type { LoginInput, RegisterInput } from "../types";

export async function loginRequest(input: LoginInput): Promise<{ token: string }> {
  if (USE_MOCK_API) {
    await Promise.resolve();
    if (!input.email || !input.password) {
      throw new Error("Completa el correo y la contraseña.");
    }
    return { token: `demo-${Date.now()}` };
  }

  // AGREGAR ENDPOINT AQUÍ: adapta ruta y respuesta al contrato de tu API.
  const response = await apiClient.post<{ token: string }>("/auth/login", input);
  return response.data;
}

export async function registerRequest(input: RegisterInput): Promise<void> {
  if (USE_MOCK_API) {
    await Promise.resolve();
    if (!input.name || !input.email || !input.password) {
      throw new Error("Completa todos los campos.");
    }
    return;
  }

  // AGREGAR ENDPOINT AQUÍ: adapta ruta y respuesta al contrato de tu API.
  await apiClient.post("/auth/register", input);
}
