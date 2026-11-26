export const API_URL =
  import.meta.env.VITE_API_URL?.trim() || "https://aulasoporte-api.aaron-navarro.workers.dev/api";

export const USE_MOCK_API =
  import.meta.env.VITE_USE_MOCK_API?.toLowerCase() !== "false";

export const TOKEN_KEY = "template_session";
