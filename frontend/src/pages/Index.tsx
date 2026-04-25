import { useEffect, useState } from "react";
import { listar } from "../services/transaccionService";

export default function Index() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listar().then((res) => {
      setData(res.data ?? []);
      setLoading(false);
    });
  }, []);

  const total = data.reduce((acc, t) => acc + t.monto, 0);
  const ingresos = data.filter((t) => t.monto > 0).reduce((acc, t) => acc + t.monto, 0);
  const gastos = data.filter((t) => t.monto < 0).reduce((acc, t) => acc + Math.abs(t.monto), 0);


  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <style>{`
        .dash {
          background: linear-gradient(160deg, #0f172a 0%, #1e293b 100%);
          min-height: 100vh;
          padding: 32px 28px;
          color: #e2e8f0;
          font-family: system-ui, sans-serif;
        }

        /* ── Header ── */
        .dash-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #f8fafc;
          margin: 0;
          letter-spacing: -0.4px;
        }
        .dash-subtitle {
          font-size: 0.8rem;
          color: #64748b;
          margin: 3px 0 0;
        }
        .date-badge {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          color: #94a3b8;
          font-size: 0.75rem;
          padding: 5px 12px;
          border-radius: 20px;
        }

        /* ── Balance Hero ── */
        .balance-hero {
          background: linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(5,150,105,0.08) 100%);
          border: 1px solid rgba(16,185,129,0.22);
          border-radius: 18px;
          padding: 28px 32px;
          position: relative;
          overflow: hidden;
          margin-bottom: 24px;
        }
        .balance-hero::before {
          content: '';
          position: absolute;
          top: -50px; right: -50px;
          width: 180px; height: 180px;
          background: rgba(16,185,129,0.08);
          border-radius: 50%;
        }
        .balance-hero::after {
          content: '';
          position: absolute;
          bottom: -60px; right: 80px;
          width: 130px; height: 130px;
          background: rgba(99,102,241,0.07);
          border-radius: 50%;
        }
        .balance-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 8px;
        }
        .balance-amount {
          font-size: 2.8rem;
          font-weight: 700;
          color: #f8fafc;
          letter-spacing: -1.5px;
          line-height: 1;
          position: relative;
          z-index: 1;
        }
        .balance-currency {
          font-size: 1.1rem;
          font-weight: 400;
          color: rgba(255,255,255,0.5);
          vertical-align: top;
          margin-top: 8px;
          display: inline-block;
          letter-spacing: 0;
        }
        .balance-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(16,185,129,0.15);
          border: 1px solid rgba(16,185,129,0.25);
          color: #4ade80;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 600;
          margin-top: 12px;
        }

        /* ── Stat Cards ── */
        .stat-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 20px;
          transition: transform 0.2s, border-color 0.2s, background 0.2s;
          height: 100%;
        }
        .stat-card:hover {
          transform: translateY(-3px);
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.14);
        }
        .stat-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          margin-bottom: 14px;
        }
        .stat-icon.green  { background: rgba(16,185,129,0.15); color: #10b981; }
        .stat-icon.blue   { background: rgba(99,102,241,0.15); color: #818cf8; }
        .stat-icon.red    { background: rgba(239,68,68,0.15);  color: #f87171; }
        .stat-icon.amber  { background: rgba(245,158,11,0.15); color: #fbbf24; }

        .stat-value {
          font-size: 1.45rem;
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1;
          margin-bottom: 4px;
          letter-spacing: -0.5px;
        }
        .stat-label {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #475569;
        }

        /* ── Section Card ── */
        .section-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          overflow: hidden;
        }
        .section-header {
          padding: 16px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: space-between;
        }
        .section-header h6 {
          font-size: 0.85rem; font-weight: 700;
          color: #cbd5e1; margin: 0;
        }
        .section-header a {
          font-size: 0.75rem; color: #10b981;
          text-decoration: none; font-weight: 600;
          opacity: 0.85;
          transition: opacity 0.15s;
        }
        .section-header a:hover { opacity: 1; }

        /* ── Table ── */
        .table-dark-clean { margin: 0; }
        .table-dark-clean thead th {
          font-size: 0.67rem; font-weight: 600;
          letter-spacing: 1px; text-transform: uppercase;
          color: #475569;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 10px 22px;
          background: transparent;
        }
        .table-dark-clean tbody td {
          padding: 12px 22px;
          font-size: 0.82rem;
          color: #94a3b8;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          vertical-align: middle;
        }
        .table-dark-clean tbody tr:last-child td { border-bottom: none; }
        .table-dark-clean tbody tr:hover td {
          background: rgba(255,255,255,0.03);
          color: #cbd5e1;
        }

        .monto-pos { color: #4ade80; font-weight: 600; }
        .monto-neg { color: #f87171; font-weight: 600; }

        .tipo-badge {
          padding: 3px 9px; border-radius: 20px;
          font-size: 0.68rem; font-weight: 600;
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

        .num-badge {
          width: 24px; height: 24px;
          background: rgba(255,255,255,0.06);
          border-radius: 6px;
          display: inline-flex;
          align-items: center; justify-content: center;
          font-size: 0.68rem; font-weight: 600;
          color: #64748b;
        }

        /* ── Empty / shimmer ── */
        .empty-state {
          text-align: center; padding: 40px 20px; color: #475569;
        }
        .empty-state i { font-size: 1.8rem; display: block; margin-bottom: 8px; opacity: 0.3; }
        .empty-state p { font-size: 0.82rem; margin: 0; }

        .shimmer-line {
          background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 6px; height: 18px;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Fade in ── */
        .fade-up { animation: fadeUp 0.4s ease both; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="dash">

        {/* Header */}
        <div className="d-flex align-items-start justify-content-between mb-4 fade-up">
          <div>
            <h1 className="dash-title">
              <i className="fas fa-chart-line me-2" style={{ color: "#10b981", fontSize: "1.2rem" }}></i>
              Dashboard
            </h1>
            <p className="dash-subtitle">Resumen de tus finanzas personales</p>
          </div>
          <span className="date-badge">
            <i className="fas fa-calendar me-1"></i>
            {new Date().toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" })}
          </span>
        </div>

        {/* Balance Hero */}
        <div className="balance-hero fade-up" style={{ animationDelay: "0.05s" }}>
          <div className="balance-label">Balance Total</div>
          <div className="balance-amount">
            <span className="balance-currency">S/ </span>
            {loading ? "——" : total.toFixed(2)}
          </div>
          <div>
            <span className="balance-pill">
              <i className="fas fa-arrow-trend-up"></i>
              {data.length} transacciones registradas
            </span>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="row g-3 mb-4">
          {[
            { delay: "0.1s",  icon: "fas fa-right-left",            cls: "blue",  value: loading ? null : String(data.length),          label: "Movimientos", prefix: "" },
            { delay: "0.15s", icon: "fas fa-arrow-down-to-bracket", cls: "green", value: loading ? null : ingresos.toFixed(2),           label: "Ingresos",    prefix: "S/ " },
            { delay: "0.2s",  icon: "fas fa-arrow-up-from-bracket", cls: "red",   value: loading ? null : gastos.toFixed(2),             label: "Gastos",      prefix: "S/ " },
            { delay: "0.25s", icon: "fas fa-wallet",                cls: "amber", value: loading ? null : data.length > 0 ? (total / data.length).toFixed(2) : "—", label: "Promedio", prefix: data.length > 0 ? "S/ " : "" },
          ].map((card, i) => (
            <div key={i} className="col-6 col-lg-3 fade-up" style={{ animationDelay: card.delay }}>
              <div className="stat-card">
                <div className={`stat-icon ${card.cls}`}>
                  <i className={card.icon}></i>
                </div>
                {loading
                  ? <div className="shimmer-line mb-2" style={{ width: "60%" }}></div>
                  : <div className="stat-value">
                      <span style={{ fontSize: "0.85rem", fontWeight: 400, color: "#64748b" }}>{card.prefix}</span>
                      {card.value}
                    </div>
                }
                <div className="stat-label">{card.label}</div>
              </div>
            </div>
          ))}
        </div>



      </div>
    </>
  );
}