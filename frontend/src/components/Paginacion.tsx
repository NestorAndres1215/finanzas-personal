type Props = {
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
};

export default function Paginacion({ page, totalPages, onNext, onPrev }: Props) {
  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <style>{`
        .paginacion-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 24px;
          font-family: system-ui, sans-serif;
        }

        .pag-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          outline: none;
        }

        .pag-btn:hover:not(:disabled) {
          background: rgba(16,185,129,0.12);
          border-color: rgba(16,185,129,0.3);
          color: #10b981;
          transform: translateX(0);
        }

        .pag-btn.prev:hover:not(:disabled) { transform: translateX(-2px); }
        .pag-btn.next:hover:not(:disabled) { transform: translateX(2px); }

        .pag-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .pag-info {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 10px;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.2);
          font-size: 0.78rem;
          font-weight: 600;
          color: #4ade80;
          letter-spacing: 0.3px;
          user-select: none;
        }

        .pag-current {
          font-size: 1rem;
          font-weight: 700;
          color: #10b981;
        }

        .pag-sep {
          color: rgba(74,222,128,0.4);
          font-size: 0.75rem;
        }
      `}</style>

      <div className="paginacion-wrapper">
        {/* Botón Anterior */}
        <button
          className="pag-btn prev"
          onClick={onPrev}
          disabled={page === 1}
        >
          <i className="fas fa-chevron-left" style={{ fontSize: "0.7rem" }}></i>
          Anterior
        </button>

        {/* Info de página */}
        <span className="pag-info">
          <i className="fas fa-file-lines" style={{ fontSize: "0.7rem", opacity: 0.7 }}></i>
          <span className="pag-current">{page}</span>
          <span className="pag-sep">/</span>
          <span style={{ color: "#64748b" }}>{totalPages}</span>
        </span>

        {/* Botón Siguiente */}
        <button
          className="pag-btn next"
          onClick={onNext}
          disabled={page === totalPages}
        >
          Siguiente
          <i className="fas fa-chevron-right" style={{ fontSize: "0.7rem" }}></i>
        </button>
      </div>
    </>
  );
}