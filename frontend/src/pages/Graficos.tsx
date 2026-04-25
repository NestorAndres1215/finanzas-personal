import { useEffect, useState } from "react";
import { graficos } from "../services/transaccionService";

export default function Graficos() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    graficos().then(setData);
  }, []);

  if (!data) return <p>Cargando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 Gráficos</h1>

      <h2>Ingresos: S/ {data.ingresos}</h2>
      <h2>Egresos: S/ {data.egresos}</h2>
    </div>
  );
}