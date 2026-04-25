import api from "./api";
import type { Transaction } from "../types/transaction";

export const listar = async (): Promise<Transaction[]> => {
  const res = await api.get("/transacciones");
  return res.data;
};

export const crear = async (data: Omit<Transaction, "id">) => {
    console.log("Enviando datos para crear transacción:", data);
  return await api.post("/transacciones", data);
};

export const eliminar = async (id: number) => {
  return await api.delete(`/transacciones/${id}`);
};

export const graficos = async () => {
  const res = await api.get("/transacciones/graficos");
  return res.data;
};