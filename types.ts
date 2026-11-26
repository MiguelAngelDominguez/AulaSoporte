export type ItemStatus = "ACTIVE" | "INACTIVE";

// AGREGAR CAMPO AQUÍ: cambia ItemInput y los formularios si tu entidad tiene otros datos.
export interface Item {
  id: number;
  name: string;
  description: string;
  status: ItemStatus;
}

export type ItemInput = Omit<Item, "id">;

export interface Page<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface Session {
  token: string;
  email: string;
  name?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface ApiErrorPayload {
  code?: string;
  message?: string;
  errors?: Record<string, string>;
}
