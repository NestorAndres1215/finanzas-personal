import { useEffect, useState } from "react";
import { listar, eliminar } from "../services/transaccionService";

export default function Listar() {
  const [data, setData] = useState<any[]>([]);

  const cargar = () => {
    listar().then(setData);
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleDelete = async (id: number) => {
    await eliminar(id);
    cargar();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📋 Lista de transacciones</h1>

      {data.map((t) => (
        <div key={t.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <p>{t.categoria}</p>
          <p>{t.tipo}</p>
          <p>S/ {t.monto}</p>

          <button onClick={() => handleDelete(t.id)}>
            🗑️ Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}