import type { Item, ItemInput, Page } from "../types";

const ITEMS_KEY = "template_mock_items";

const initialItems: Item[] = [
  { id: 1, name: "Elemento de ejemplo", description: "Reemplaza este contenido por tu caso.", status: "ACTIVE" },
  { id: 2, name: "Segundo elemento", description: "Un registro para probar listas y detalles.", status: "INACTIVE" },
  { id: 3, name: "Tercer elemento", description: "Puedes cambiar los campos en src/types.ts.", status: "ACTIVE" },
  { id: 4, name: "Cuarto elemento", description: "Prueba búsqueda, paginación y edición.", status: "ACTIVE" },
  { id: 5, name: "Quinto elemento", description: "Los datos se guardan en este navegador.", status: "INACTIVE" },
  { id: 6, name: "Sexto elemento", description: "El modo de prueba no requiere backend.", status: "ACTIVE" },
];

function readItems(): Item[] {
  const stored = localStorage.getItem(ITEMS_KEY);
  if (!stored) {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(initialItems));
    return initialItems;
  }

  try {
    return JSON.parse(stored) as Item[];
  } catch {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(initialItems));
    return initialItems;
  }
}

function writeItems(items: Item[]) {
  localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
}

export async function mockListItems(
  page: number,
  pageSize: number,
  search: string,
): Promise<Page<Item>> {
  const normalizedSearch = search.trim().toLowerCase();
  const filtered = readItems().filter((item) =>
    `${item.name} ${item.description}`.toLowerCase().includes(normalizedSearch),
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const start = (page - 1) * pageSize;

  return {
    items: filtered.slice(start, start + pageSize),
    page,
    pageSize,
    totalItems: filtered.length,
    totalPages,
  };
}

export async function mockGetItem(id: number): Promise<Item> {
  const item = readItems().find((entry) => entry.id === id);
  if (!item) throw new Error("No se encontró el elemento.");
  return item;
}

export async function mockCreateItem(input: ItemInput): Promise<Item> {
  const items = readItems();
  const item: Item = {
    ...input,
    id: Math.max(0, ...items.map((entry) => entry.id)) + 1,
  };
  writeItems([item, ...items]);
  return item;
}

export async function mockUpdateItem(id: number, input: ItemInput): Promise<Item> {
  const items = readItems();
  const index = items.findIndex((entry) => entry.id === id);
  if (index < 0) throw new Error("No se encontró el elemento.");
  const updated = { ...items[index], ...input };
  items[index] = updated;
  writeItems(items);
  return updated;
}

export async function mockDeleteItem(id: number): Promise<void> {
  const items = readItems();
  if (!items.some((entry) => entry.id === id)) {
    throw new Error("No se encontró el elemento.");
  }
  writeItems(items.filter((entry) => entry.id !== id));
}
