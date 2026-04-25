import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <h2 style={{ marginBottom: 30 }}>💰 Finanzas</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        <Link to="/" style={linkStyle}>🏠 Home</Link>
        <Link to="/listar" style={linkStyle}>📋 Listar</Link>
        <Link to="/registrar" style={linkStyle}>➕ Registrar</Link>
        <Link to="/graficos" style={linkStyle}>📊 Gráficos</Link>
      </nav>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "8px",
  borderRadius: "6px",
};