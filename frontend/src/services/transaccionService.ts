import api from "./api";


export const listar = async (page: number, limit: number) => {
  const res = await api.get("/transacciones", {
    params: { page, limit },
  });

  return res.data;
};

export const crear = async (data: Omit<any, "id">) => {
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