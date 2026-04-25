import { useEffect, useState } from "react";
import { graficos } from "../services/transaccionService";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from "recharts";

// ── Tooltip personalizado oscuro ──────────────────────────────
const DarkTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#0f172a",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 10,
      padding: "10px 14px",
      fontSize: "0.78rem",
      color: "#cbd5e1",
    }}>
      {label && <p style={{ margin: "0 0 4px", color: "#94a3b8", fontWeight: 600 }}>{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ margin: 0, color: p.color, fontWeight: 600 }}>
          {p.name}: S/ {Number(p.value).toFixed(2)}
        </p>
      ))}
    </div>
  );
};

export default function Graficos() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    graficos().then(setData);
  }, []);

  // ── Datos para los gráficos ──────────────────────────────────
  const pieData = data
    ? [
        { name: "Ingresos", value: data.ingresos },
        { name: "Egresos",  value: data.egresos  },
      ]
    : [];

  const barData = data
    ? [{ name: "Resumen", Ingresos: data.ingresos, Egresos: data.egresos }]
    : [];

  const balance = data ? data.ingresos - data.egresos : 0;

  // Simulamos tendencia mensual si la API devuelve historial,
  // si no, usamos los datos disponibles como punto único
  const areaData: any[] = data?.historial ?? (data
    ? [
        { mes: "Actual", Ingresos: data.ingresos, Egresos: data.egresos },
      ]
    : []);

  const COLORS = ["#10b981", "#ef4444"];

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <style>{`
        .graf-wrapper {
          background: linear-gradient(160deg, #0f172a 0%, #1e293b 100%);
          min-height: 100vh;
          padding: 32px 28px;
          font-family: system-ui, sans-serif;
          color: #e2e8f0;
        }
        .page-title {
          font-size: 1.4rem; font-weight: 700;
          color: #f8fafc; margin: 0; letter-spacing: -0.4px;
        }
        .page-subtitle { font-size: 0.8rem; color: #64748b; margin: 3px 0 0; }

        /* Stat cards */
        .stat-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 20px;
          transition: transform 0.2s, border-color 0.2s;
          height: 100%;
        }
        .stat-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.14);
        }
        .stat-icon {
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; margin-bottom: 14px;
        }
        .stat-icon.green { background: rgba(16,185,129,0.15); color: #10b981; }
        .stat-icon.red   { background: rgba(239,68,68,0.15);  color: #f87171; }
        .stat-icon.blue  { background: rgba(99,102,241,0.15); color: #818cf8; }
        .stat-value {
          font-size: 1.4rem; font-weight: 700;
          color: #f1f5f9; line-height: 1; margin-bottom: 4px;
        }
        .stat-label {
          font-size: 0.7rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 1px; color: #475569;
        }

        /* Chart cards */
        .chart-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; overflow: hidden; height: 100%;
        }
        .chart-card-header {
          padding: 14px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; gap: 8px;
        }
        .chart-card-header h6 {
          font-size: 0.83rem; font-weight: 700;
          color: #cbd5e1; margin: 0;
        }
        .chart-card-body { padding: 20px; }

        /* Shimmer */
        .shimmer-block {
          background: linear-gradient(90deg,
            rgba(255,255,255,0.04) 25%,
            rgba(255,255,255,0.08) 50%,
            rgba(255,255,255,0.04) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 10px;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Legend dot */
        .legend-dot {
          width: 8px; height: 8px; border-radius: 50%;
          display: inline-block; margin-right: 5px;
        }

        .fade-up { animation: fadeUp 0.35s ease both; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="graf-wrapper">

        {/* Header */}
        <div className="mb-4 fade-up">
          <h1 className="page-title">
            <i className="fas fa-chart-bar me-2" style={{ color: "#10b981", fontSize: "1.15rem" }}></i>
            Gráficos Financieros
          </h1>
          <p className="page-subtitle">Visualización de ingresos y egresos</p>
        </div>

        {/* Loading state */}
        {!data ? (
          <>
            <div className="row g-3 mb-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="col-12 col-md-4">
                  <div className="shimmer-block" style={{ height: 110 }}></div>
                </div>
              ))}
            </div>
            <div className="row g-3">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="col-12 col-md-6">
                  <div className="shimmer-block" style={{ height: 280 }}></div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* ── Stat Cards ── */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-4 fade-up" style={{ animationDelay: "0.05s" }}>
                <div className="stat-card">
                  <div className="stat-icon green"><i className="fas fa-arrow-down-to-bracket"></i></div>
                  <div className="stat-value" style={{ color: "#4ade80" }}>
                    <span style={{ fontSize: "0.85rem", color: "#475569" }}>S/ </span>
                    {Number(data.ingresos).toFixed(2)}
                  </div>
                  <div className="stat-label">Total Ingresos</div>
                </div>
              </div>

              <div className="col-12 col-md-4 fade-up" style={{ animationDelay: "0.1s" }}>
                <div className="stat-card">
                  <div className="stat-icon red"><i className="fas fa-arrow-up-from-bracket"></i></div>
                  <div className="stat-value" style={{ color: "#f87171" }}>
                    <span style={{ fontSize: "0.85rem", color: "#475569" }}>S/ </span>
                    {Number(data.egresos).toFixed(2)}
                  </div>
                  <div className="stat-label">Total Egresos</div>
                </div>
              </div>

              <div className="col-12 col-md-4 fade-up" style={{ animationDelay: "0.15s" }}>
                <div className="stat-card">
                  <div className="stat-icon blue"><i className="fas fa-scale-balanced"></i></div>
                  <div className="stat-value" style={{ color: balance >= 0 ? "#4ade80" : "#f87171" }}>
                    <span style={{ fontSize: "0.85rem", color: "#475569" }}>S/ </span>
                    {balance.toFixed(2)}
                  </div>
                  <div className="stat-label">Balance Neto</div>
                </div>
              </div>
            </div>

            {/* ── Charts row 1: Pie + Bar ── */}
            <div className="row g-3 mb-4">

              {/* Pie chart */}
              <div className="col-12 col-md-5 fade-up" style={{ animationDelay: "0.2s" }}>
                <div className="chart-card">
                  <div className="chart-card-header">
                    <i className="fas fa-chart-pie" style={{ color: "#475569", fontSize: "0.8rem" }}></i>
                    <h6>Distribución</h6>
                  </div>
                  <div className="chart-card-body">
                    <ResponsiveContainer width="100%" height={240}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={95}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {pieData.map((_, i) => (
                            <Cell key={i} fill={COLORS[i]} strokeWidth={0} />
                          ))}
                        </Pie>
                        <Tooltip content={<DarkTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Leyenda manual */}
                    <div className="d-flex justify-content-center gap-4 mt-1">
                      {pieData.map((entry, i) => (
                        <span key={i} style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                          <span className="legend-dot" style={{ background: COLORS[i] }}></span>
                          {entry.name}: <strong style={{ color: COLORS[i] }}>S/ {Number(entry.value).toFixed(2)}</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bar chart */}
              <div className="col-12 col-md-7 fade-up" style={{ animationDelay: "0.25s" }}>
                <div className="chart-card">
                  <div className="chart-card-header">
                    <i className="fas fa-chart-column" style={{ color: "#475569", fontSize: "0.8rem" }}></i>
                    <h6>Comparación Ingresos vs Egresos</h6>
                  </div>
                  <div className="chart-card-body">
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={barData} barCategoryGap="40%">
                        <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: "#475569", fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fill: "#475569", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(v) => `S/${v}`}
                        />
                        <Tooltip content={<DarkTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                        <Legend
                          wrapperStyle={{ fontSize: "0.75rem", color: "#64748b", paddingTop: 8 }}
                        />
                        <Bar dataKey="Ingresos" fill="#10b981" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="Egresos"  fill="#ef4444" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Area chart (tendencia) ── */}
            {areaData.length > 1 && (
              <div className="chart-card fade-up" style={{ animationDelay: "0.3s" }}>
                <div className="chart-card-header">
                  <i className="fas fa-chart-area" style={{ color: "#475569", fontSize: "0.8rem" }}></i>
                  <h6>Tendencia Mensual</h6>
                </div>
                <div className="chart-card-body">
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={areaData}>
                      <defs>
                        <linearGradient id="gIngresos" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#10b981" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gEgresos" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis
                        dataKey="mes"
                        tick={{ fill: "#475569", fontSize: 11 }}
                        axisLine={false} tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: "#475569", fontSize: 11 }}
                        axisLine={false} tickLine={false}
                        tickFormatter={(v) => `S/${v}`}
                      />
                      <Tooltip content={<DarkTooltip />} />
                      <Legend wrapperStyle={{ fontSize: "0.75rem", color: "#64748b", paddingTop: 8 }} />
                      <Area type="monotone" dataKey="Ingresos" stroke="#10b981" strokeWidth={2} fill="url(#gIngresos)" />
                      <Area type="monotone" dataKey="Egresos"  stroke="#ef4444" strokeWidth={2} fill="url(#gEgresos)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </>
  );
}