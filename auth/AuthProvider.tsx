import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { TOKEN_KEY } from "../config";
import { loginRequest, registerRequest } from "../api/authApi";
import { setUnauthorizedHandler } from "../api/client";
import type { LoginInput, RegisterInput, Session } from "../types";

interface AuthContextValue {
  session: Session | null;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(readSession);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      localStorage.removeItem(TOKEN_KEY);
      setSession(null);
    });
    return () => setUnauthorizedHandler(undefined);
  }, []);

  async function login(input: LoginInput) {
    const result = await loginRequest(input);
    const nextSession: Session = { token: result.token, email: input.email };
    localStorage.setItem(TOKEN_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
  }

  async function register(input: RegisterInput) {
    await registerRequest(input);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setSession(null);
  }

  const value = useMemo(
    () => ({ session, login, register, logout }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
