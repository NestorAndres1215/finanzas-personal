import { useEffect, useState } from "react";
import { listar, eliminar } from "../services/transaccionService";
import { usePagination } from "../hooks/usePagination";
import Paginacion from "../components/Paginacion";

export default function Listar() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const { page, limit, totalPages, setTotalPages, nextPage, prevPage } =
    usePagination(1, 10);

  const cargar = async () => {
    setLoading(true);
    const res = await listar(page, limit);
    setData(res.data);
    setTotalPages(res.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    cargar();
  }, [page]);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    await eliminar(id);
    setDeletingId(null);
    setConfirmId(null);
    cargar();
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <style>{`
        .listar-wrapper {
          background: linear-gradient(160deg, #0f172a 0%, #1e293b 100%);
          min-height: 100vh;
          padding: 32px 28px;
          color: #e2e8f0;
          font-family: system-ui, sans-serif;
        }

        /* Header */
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
        .count-badge {
          background: rgba(16,185,129,0.12);
          border: 1px solid rgba(16,185,129,0.22);
          color: #4ade80;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 20px;
        }

        /* Table card */
        .table-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          overflow: hidden;
        }
        .table-card-header {
          padding: 16px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .table-card-header h6 {
          font-size: 0.85rem;
          font-weight: 700;
          color: #cbd5e1;
          margin: 0;
        }

        /* Table */
        .t-dark { margin: 0; }
        .t-dark thead th {
          font-size: 0.67rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #475569;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 11px 20px;
          background: transparent;
        }
        .t-dark tbody td {
          padding: 13px 20px;
          font-size: 0.83rem;
          color: #94a3b8;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          vertical-align: middle;
        }
        .t-dark tbody tr:last-child td { border-bottom: none; }
        .t-dark tbody tr:hover td {
          background: rgba(255,255,255,0.025);
          color: #cbd5e1;
        }

        .t-dark tbody tr,
.t-dark tbody td {
  background-color: transparent !important;
  color: inherit;
}

.t-dark {
  --bs-table-bg: transparent;
  --bs-table-color: #94a3b8;
  --bs-table-hover-bg: rgba(255,255,255,0.03);
  --bs-table-hover-color: #cbd5e1;
  --bs-table-border-color: rgba(255,255,255,0.04);
}

        /* Badges */
        .cat-badge {
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 0.68rem;
          font-weight: 600;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(129,140,248,0.2);
          color: #818cf8;
        }
        .tipo-badge {
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 0.68rem;
          font-weight: 600;
        }
        .tipo-badge.ingreso {
          background: rgba(16,185,129,0.12);
          color: #4ade80;
          border: 1px solid rgba(74,222,128,0.2);
        }
        .tipo-badge.gasto {
          background: rgba(239,68,68,0.12);
          color: #f87171;
          border: 1px solid rgba(248,113,113,0.2);
        }
        .monto-pos { color: #4ade80; font-weight: 600; }
        .monto-neg { color: #f87171; font-weight: 600; }

        /* Row num */
        .row-num {
          width: 26px; height: 26px;
          background: rgba(255,255,255,0.05);
          border-radius: 6px;
          display: inline-flex;
          align-items: center; justify-content: center;
          font-size: 0.68rem; font-weight: 600;
          color: #475569;
        }

        /* Delete btn */
        .btn-del {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 8px;
          font-size: 0.72rem;
          font-weight: 600;
          border: 1px solid rgba(239,68,68,0.2);
          background: rgba(239,68,68,0.08);
          color: #f87171;
          cursor: pointer;
          transition: all 0.18s;
        }
        .btn-del:hover {
          background: rgba(239,68,68,0.18);
          border-color: rgba(239,68,68,0.35);
          color: #fca5a5;
        }
        .btn-del:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* Confirm row */
        .confirm-row td {
          background: rgba(239,68,68,0.05) !important;
          border-top: 1px solid rgba(239,68,68,0.15) !important;
          border-bottom: 1px solid rgba(239,68,68,0.15) !important;
        }
        .btn-confirm {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 8px;
          font-size: 0.72rem;
          font-weight: 600;
          border: 1px solid rgba(239,68,68,0.35);
          background: rgba(239,68,68,0.18);
          color: #fca5a5;
          cursor: pointer;
          transition: all 0.18s;
          margin-right: 6px;
        }
        .btn-confirm:hover {
          background: rgba(239,68,68,0.3);
        }
        .btn-cancel {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 8px;
          font-size: 0.72rem;
          font-weight: 600;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: #64748b;
          cursor: pointer;
          transition: all 0.18s;
        }
        .btn-cancel:hover {
          background: rgba(255,255,255,0.08);
          color: #94a3b8;
        }

        /* Empty */
        .empty-state {
          text-align: center;
          padding: 48px 20px;
          color: #475569;
        }
        .empty-state i {
          font-size: 2rem;
          display: block;
          margin-bottom: 10px;
          opacity: 0.3;
        }
        .empty-state p { font-size: 0.83rem; margin: 0; }

        /* Shimmer */
        .shimmer-row td { padding: 14px 20px !important; }
        .shimmer-line {
          background: linear-gradient(90deg,
            rgba(255,255,255,0.04) 25%,
            rgba(255,255,255,0.08) 50%,
            rgba(255,255,255,0.04) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 6px;
          height: 16px;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Fade */
        .fade-up { animation: fadeUp 0.35s ease both; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="listar-wrapper">

        {/* Header */}
        <div className="d-flex align-items-start justify-content-between mb-4 fade-up">
          <div>
            <h1 className="page-title">
              <i className="fas fa-list-ul me-2" style={{ color: "#10b981", fontSize: "1.15rem" }}></i>
              Lista de Transacciones
            </h1>
            <p className="page-subtitle">Gestiona y elimina tus movimientos financieros</p>
          </div>
          {!loading && (
            <span className="count-badge">
              <i className="fas fa-database me-1"></i>
              {data.length} registros
            </span>
          )}
        </div>

        {/* Table Card */}
        <div className="table-card fade-up" style={{ animationDelay: "0.05s" }}>
          <div className="table-card-header">
            <i className="fas fa-table-list" style={{ color: "#475569", fontSize: "0.85rem" }}></i>
            <h6>Transacciones — Página {page} de {totalPages}</h6>
          </div>

          <div className="table-responsive">
            <table className="table t-dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Categoría</th>
                  <th>Tipo</th>
                  <th>Monto</th>
                  <th className="text-end">Acción</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(6)].map((_, i) => (
                    <tr key={i} className="shimmer-row">
                      {[...Array(5)].map((_, j) => (
                        <td key={j}>
                          <div className="shimmer-line" style={{ width: j === 4 ? "60px" : "80%", animationDelay: `${i * 0.06}s` }}></div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={5}>
                      <div className="empty-state">
                        <i className="fas fa-inbox"></i>
                        <p>No hay transacciones registradas</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.map((t, i) => (
                    <>
                      <tr key={t.id}>
                        <td><span className="row-num">{(page - 1) * limit + i + 1}</span></td>
                        <td>
                          <span className="cat-badge">
                            <i className="fas fa-tag me-1" style={{ fontSize: "0.6rem" }}></i>
                            {t.categoria}
                          </span>
                        </td>
                        <td>
                          <span className={`tipo-badge ${t.tipo?.toLowerCase() === "ingreso" ? "ingreso" : "gasto"}`}>
                            <i className={`fas fa-${t.tipo?.toLowerCase() === "ingreso" ? "plus" : "minus"} me-1`} style={{ fontSize: "0.6rem" }}></i>
                            {t.tipo}
                          </span>
                        </td>
                        <td>
                          <span className={t.monto >= 0 ? "monto-pos" : "monto-neg"}>
                            {t.monto >= 0 ? "+" : ""}S/ {Math.abs(t.monto).toFixed(2)}
                          </span>
                        </td>
                        <td className="text-end">
                          <button
                            className="btn-del"
                            onClick={() => setConfirmId(confirmId === t.id ? null : t.id)}
                            disabled={deletingId === t.id}
                          >
                            {deletingId === t.id
                              ? <><i className="fas fa-spinner fa-spin"></i> Eliminando...</>
                              : <><i className="fas fa-trash-can"></i> Eliminar</>
                            }
                          </button>
                        </td>
                      </tr>

                      {/* Fila de confirmación */}
                      {confirmId === t.id && (
                        <tr key={`confirm-${t.id}`} className="confirm-row">
                          <td colSpan={5}>
                            <div className="d-flex align-items-center gap-2 py-1">
                              <i className="fas fa-triangle-exclamation" style={{ color: "#fbbf24", fontSize: "0.8rem" }}></i>
                              <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
                                ¿Confirmas eliminar esta transacción? Esta acción no se puede deshacer.
                              </span>
                              <button className="btn-confirm ms-2" onClick={() => handleDelete(t.id)}>
                                <i className="fas fa-check"></i> Sí, eliminar
                              </button>
                              <button className="btn-cancel" onClick={() => setConfirmId(null)}>
                                <i className="fas fa-xmark"></i> Cancelar
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paginación */}
        <Paginacion
          page={page}
          totalPages={totalPages}
          onNext={nextPage}
          onPrev={prevPage}
        />

      </div>
    </>
  );
}