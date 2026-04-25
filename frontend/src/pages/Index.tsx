import { useEffect, useState } from "react";
import { listar } from "../services/transaccionService";

export default function Index() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    listar().then(setData);
  }, []);

  const total = data.reduce((acc, t) => acc + t.monto, 0);

  return (
    <div style={{ padding: 20 }}>
      <h1>🏠 Dashboard</h1>
      <h2>Total movimientos: {data.length}</h2>
      <h2>Total dinero: S/ {total}</h2>
    </div>
  );
}