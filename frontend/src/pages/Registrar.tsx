import { useState } from "react";
import { crear } from "../services/transaccionService";

export default function Registrar() {
  const [form, setForm] = useState({
    tipo: "ingreso",
    categoria: "",
    monto: 0,
    descripcion: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crear(form);
    alert("Creado ✔");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h1>➕ Registrar</h1>

      <select onChange={(e) => setForm({ ...form, tipo: e.target.value as any })}>
        <option value="ingreso">Ingreso</option>
        <option value="gasto">Gasto</option>
      </select>

      <input placeholder="Categoría"
        onChange={(e) => setForm({ ...form, categoria: e.target.value })}
      />

      <input type="number" placeholder="Monto"
        onChange={(e) => setForm({ ...form, monto: Number(e.target.value) })}
      />

      <input placeholder="Descripción"
        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
      />

      <button type="submit">Guardar</button>
    </form>
  );
}