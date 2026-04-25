import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Index from "./pages/Index";
import Listar from "./pages/Listar";
import Registrar from "./pages/Registrar";
import Graficos from "./pages/Graficos";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        
        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENIDO */}
        <div style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/listar" element={<Listar />} />
            <Route path="/registrar" element={<Registrar />} />
            <Route path="/graficos" element={<Graficos />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}