import { useState } from "react";
import { crear } from "../services/transaccionService";

export default function Registrar() {
  const [form, setForm] = useState({
    tipo: "ingreso",
    categoria: "",
    monto: 0,
    descripcion: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await crear(form);
    setLoading(false);
    setSuccess(true);
    setForm({ tipo: "ingreso", categoria: "", monto: 0, descripcion: "" });
    setTimeout(() => setSuccess(false), 3000);
  };

  const isIngreso = form.tipo === "ingreso";

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <style>{`
        .reg-wrapper {
          background: linear-gradient(160deg, #0f172a 0%, #1e293b 100%);
          min-height: 100vh;
          padding: 32px 28px;
          font-family: system-ui, sans-serif;
          color: #e2e8f0;
        }

        .page-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #f8fafc;
          margin: 0;
          letter-spacing: -0.4px;
        }
        .page-subtitle {
          font-size: 0.8rem;
          color: #64748b;
          margin: 3px 0 0;
        }

        /* Form card */
        .form-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          overflow: hidden;
          max-width: 560px;
        }
        .form-card-header {
          padding: 16px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .form-card-header h6 {
          font-size: 0.85rem;
          font-weight: 700;
          color: #cbd5e1;
          margin: 0;
        }
        .form-card-body {
          padding: 24px;
        }

        /* Tipo toggle */
        .tipo-toggle {
          display: flex;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 4px;
          gap: 4px;
          margin-bottom: 20px;
        }
        .tipo-btn {
          flex: 1;
          padding: 9px;
          border-radius: 7px;
          border: none;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
        }
        .tipo-btn.active-ingreso {
          background: rgba(16,185,129,0.18);
          border: 1px solid rgba(16,185,129,0.3);
          color: #4ade80;
        }
        .tipo-btn.active-gasto {
          background: rgba(239,68,68,0.15);
          border: 1px solid rgba(239,68,68,0.3);
          color: #f87171;
        }

        /* Labels & inputs */
        .field-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: #475569;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .field-label i { font-size: 0.65rem; }

        .dark-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 10px 14px;
          color: #f1f5f9;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          box-sizing: border-box;
        }
        .dark-input::placeholder { color: #334155; }
        .dark-input:focus {
          border-color: rgba(16,185,129,0.4);
          background: rgba(16,185,129,0.05);
        }
        .dark-input option {
          background: #1e293b;
          color: #f1f5f9;
        }

        /* Monto prefix */
        .monto-wrapper {
          position: relative;
        }
        .monto-prefix {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.8rem;
          font-weight: 600;
          color: #475569;
          pointer-events: none;
        }
        .monto-wrapper .dark-input {
          padding-left: 34px;
        }

        /* Submit btn */
        .btn-submit {
          width: 100%;
          padding: 11px;
          border-radius: 10px;
          border: none;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 6px;
        }
        .btn-submit.ingreso {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          box-shadow: 0 4px 14px rgba(16,185,129,0.3);
        }
        .btn-submit.gasto {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          box-shadow: 0 4px 14px rgba(239,68,68,0.25);
        }
        .btn-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          filter: brightness(1.08);
        }
        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* Toast */
        .toast-success {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(16,185,129,0.12);
          border: 1px solid rgba(16,185,129,0.25);
          border-radius: 10px;
          padding: 12px 16px;
          color: #4ade80;
          font-size: 0.82rem;
          font-weight: 600;
          margin-bottom: 20px;
          animation: fadeUp 0.3s ease;
        }

        .fade-up { animation: fadeUp 0.35s ease both; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .field-gap { margin-bottom: 16px; }
      `}</style>

      <div className="reg-wrapper">

        {/* Header */}
        <div className="mb-4 fade-up">
          <h1 className="page-title">
            <i className="fas fa-plus-circle me-2" style={{ color: "#10b981", fontSize: "1.15rem" }}></i>
            Registrar Transacción
          </h1>
          <p className="page-subtitle">Agrega un nuevo ingreso o gasto</p>
        </div>

        {/* Toast éxito */}
        {success && (
          <div className="toast-success fade-up" style={{ maxWidth: 560 }}>
            <i className="fas fa-circle-check"></i>
            Transacción registrada correctamente
          </div>
        )}

        {/* Form Card */}

      <div className="container  d-flex justify-content-center align-items-center">
          <div className="form-card fade-up" style={{ animationDelay: "0.05s",maxWidth: "600px" }}>
            <div className="form-card-header">
              <i className="fas fa-pen-to-square" style={{ color: "#475569", fontSize: "0.85rem" }}></i>
              <h6>Nueva transacción</h6>
            </div>

            <div className="form-card-body">
              <form onSubmit={handleSubmit}>

                {/* Toggle tipo */}
                <div className="tipo-toggle">
                  <button
                    type="button"
                    className={`tipo-btn ${form.tipo === "ingreso" ? "active-ingreso" : ""}`}
                    onClick={() => setForm({ ...form, tipo: "ingreso" })}
                  >
                    <i className="fas fa-arrow-down-to-bracket"></i>
                    Ingreso
                  </button>
                  <button
                    type="button"
                    className={`tipo-btn ${form.tipo === "gasto" ? "active-gasto" : ""}`}
                    onClick={() => setForm({ ...form, tipo: "gasto" })}
                  >
                    <i className="fas fa-arrow-up-from-bracket"></i>
                    Gasto
                  </button>
                </div>

                {/* Categoría */}
                <div className="field-gap">
                  <div className="field-label">
                    <i className="fas fa-tag"></i>
                    Categoría
                  </div>
                  <input
                    className="dark-input"
                    placeholder="Ej: Comida, Transporte, Sueldo..."
                    value={form.categoria}
                    onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                    required
                  />
                </div>

                {/* Monto */}
                <div className="field-gap">
                  <div className="field-label">
                    <i className="fas fa-coins"></i>
                    Monto
                  </div>
                  <div className="monto-wrapper">
                    <span className="monto-prefix">S/</span>
                    <input
                      className="dark-input"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={form.monto || ""}
                      onChange={(e) => setForm({ ...form, monto: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>

                {/* Descripción */}
                <div className="field-gap">
                  <div className="field-label">
                    <i className="fas fa-note-sticky"></i>
                    Descripción
                  </div>
                  <input
                    className="dark-input"
                    placeholder="Detalle opcional..."
                    value={form.descripcion}
                    onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className={`btn-submit ${isIngreso ? "ingreso" : "gasto"}`}
                  disabled={loading}
                >
                  {loading
                    ? <><i className="fas fa-spinner fa-spin"></i> Guardando...</>
                    : isIngreso
                      ? <><i className="fas fa-circle-plus"></i> Registrar Ingreso</>
                      : <><i className="fas fa-circle-minus"></i> Registrar Gasto</>
                  }
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}