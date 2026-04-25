import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      {/* Bootstrap 5 CSS */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      />
      {/* Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <style>{`
        .sidebar {
          width: 240px;
          min-height: 100vh;
          background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
          position: fixed;
          left: 0;
          top: 0;
          z-index: 1000;
          box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
        }

        .sidebar-brand {
          padding: 24px 20px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .sidebar-brand h4 {
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #f8fafc;
          margin: 0;
        }

        .sidebar-brand span.brand-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          margin-right: 10px;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.35);
        }

        .sidebar-nav {
          flex: 1;
          padding: 16px 12px;
        }

        .nav-section-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #64748b;
          padding: 8px 10px 6px;
          margin-top: 8px;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 10px;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s ease;
          margin-bottom: 2px;
          position: relative;
        }

        .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #f1f5f9;
          transform: translateX(2px);
        }

        .sidebar-link.active {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.1));
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .sidebar-link.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          background: #10b981;
          border-radius: 0 3px 3px 0;
        }

        .sidebar-link i {
          width: 18px;
          text-align: center;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .sidebar-link.active i {
          color: #10b981;
        }

        .sidebar-footer {
          padding: 16px 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .user-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.04);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          color: white;
          font-weight: 700;
          flex-shrink: 0;
        }

        .user-info small {
          display: block;
          color: #475569;
          font-size: 0.65rem;
        }

        .user-info span {
          color: #cbd5e1;
          font-size: 0.8rem;
          font-weight: 500;
        }
      `}</style>

      <div className="sidebar">
        {/* Brand */}
        <div className="sidebar-brand d-flex align-items-center">
          <span className="brand-icon">
            <i className="fas fa-coins text-white"></i>
          </span>
          <h4>Finanzas</h4>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-section-label">Principal</div>

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="fas fa-house"></i>
            <span>Index</span>
          </NavLink>

          <div className="nav-section-label">Movimientos</div>

          <NavLink
            to="/listar"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="fas fa-list-ul"></i>
            <span>Listar</span>
          </NavLink>

          <NavLink
            to="/registrar"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="fas fa-plus-circle"></i>
            <span>Registrar</span>
          </NavLink>

          <div className="nav-section-label">Análisis</div>

          <NavLink
            to="/graficos"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="fas fa-chart-bar"></i>
            <span>Gráficos</span>
          </NavLink>

          <NavLink
            to="/reportes"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="fas fa-file-invoice-dollar"></i>
            <span>Reportes</span>
          </NavLink>

          <div className="nav-section-label">Sistema</div>

          <NavLink
            to="/configuracion"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="fas fa-gear"></i>
            <span>Configuración</span>
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="user-card">
            <div className="user-avatar">U</div>
            <div className="user-info">
              <span>Usuario</span>
              <small>Administrador</small>
            </div>
            <i className="fas fa-ellipsis-vertical text-secondary ms-auto" style={{ fontSize: "0.8rem", cursor: "pointer" }}></i>
          </div>
        </div>
      </div>
    </>
  );
}