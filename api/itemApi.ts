import { USE_MOCK_API } from "../config";
import type { Item, ItemInput, Page } from "../types";
import { apiClient } from "./client";
import {
  mockCreateItem,
  mockDeleteItem,
  mockGetItem,
  mockListItems,
  mockUpdateItem,
} from "./mockDb";

export async function listItems(
  page = 1,
  pageSize = 5,
  search = "",
): Promise<Page<Item>> {
  if (USE_MOCK_API) return mockListItems(page, pageSize, search);

  // AGREGAR ENDPOINT AQUÍ: cambia ruta, parámetros y tipo de respuesta si es necesario.
  const response = await apiClient.get<Page<Item>>("/items", {
    params: { page, pageSize, search },
  });
  return response.data;
}

export async function getItem(id: number): Promise<Item> {
  if (USE_MOCK_API) return mockGetItem(id);
  const response = await apiClient.get<Item>(`/items/${id}`);
  return response.data;
}

export async function createItem(input: ItemInput): Promise<Item> {
  if (USE_MOCK_API) return mockCreateItem(input);
  const response = await apiClient.post<Item>("/items", input);
  return response.data;
}

export async function updateItem(id: number, input: ItemInput): Promise<Item> {
  if (USE_MOCK_API) return mockUpdateItem(id, input);
  const response = await apiClient.patch<Item>(`/items/${id}`, input);
  return response.data;
}

export async function deleteItem(id: number): Promise<void> {
  if (USE_MOCK_API) return mockDeleteItem(id);
  await apiClient.delete(`/items/${id}`);
}
