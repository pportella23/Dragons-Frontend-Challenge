import api from "../api";
import { type Dragon } from "../types/dragon";

const BASE_URL = "/dragon";

export const getDragons = async (): Promise<Dragon[]> => {
  try {
    const response = await api.get<Dragon[]>(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar a lista de dragões:", error);
    throw new Error("Não foi possível buscar a lista de dragões.");
  }
};

export const getDragonById = async (id: string): Promise<Dragon> => {
  const response = await api.get<Dragon>(`${BASE_URL}/${id}`);
  return response.data;
};

export const createDragon = async (
  dragon: Omit<Dragon, "id" | "createdAt">
): Promise<Dragon> => {
  const response = await api.post<Dragon>(BASE_URL, dragon);
  return response.data;
};

export const updateDragon = async (
  id: string,
  dragon: Omit<Dragon, "id" | "createdAt">
): Promise<Dragon> => {
  const response = await api.put<Dragon>(`${BASE_URL}/${id}`, dragon);
  return response.data;
};

export const deleteDragon = async (id: string): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
};
