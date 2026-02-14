import { Request, Response } from "express";
import { TransaccionService } from "../services/transaccionService";

// LISTAR
export const listarTransacciones = async (req: Request, res: Response) => {
  try {
    const transacciones = await TransaccionService.listar();
    res.render("listar", { transacciones });
  } catch (error) {
    console.error("Error al listar transacciones:", error);
    res.status(500).send("Error al obtener las transacciones");
  }
};

export const listarPorCategoria = async (req: Request, res: Response) => {
  try {
    const { categoria } = req.params;

    const transacciones = await TransaccionService.listarPorCategoria(categoria);

    res.render("listar", { transacciones });

  } catch (error) {
    console.error("Error al listar por categoría:", error);
    res.status(500).send("Error al filtrar por categoría");
  }
};

export const listarPorTipo = async (req: Request, res: Response) => {
  try {
    const { tipo } = req.params;

    if (tipo !== "ingreso" && tipo !== "gasto") {
      return res.status(400).send("Tipo inválido");
    }

    const transacciones = await TransaccionService.listarPorTipo(tipo);

    res.render("listar", { transacciones });

  } catch (error) {
    console.error("Error al listar por tipo:", error);
    res.status(500).send("Error al filtrar por tipo");
  }
};


export const listarPorFecha = async (req: Request, res: Response) => {
  try {
    const { fecha } = req.query;

    if (!fecha) {
      return res.status(400).send("Debe enviar una fecha");
    }

    const fechaDate = new Date(fecha as string);

    const transacciones = await TransaccionService.listarPorFecha(fechaDate);

    res.render("listar", { transacciones });

  } catch (error) {
    console.error("Error al listar por fecha:", error);
    res.status(500).send("Error al filtrar por fecha");
  }
};

export const listarPorRangoFechas = async (req: Request, res: Response) => {
  try {
    const { inicio, fin } = req.query;

    if (!inicio || !fin) {
      return res.status(400).send("Debe enviar fecha inicio y fecha fin");
    }

    const fechaInicio = new Date(inicio as string);
    const fechaFin = new Date(fin as string);

    const transacciones = await TransaccionService.listarPorRangoFechas(
      fechaInicio,
      fechaFin
    );

    res.render("listar", { transacciones });

  } catch (error) {
    console.error("Error al listar por rango de fechas:", error);
    res.status(500).send("Error al filtrar por rango de fechas");
  }
};

export const crearTransaccion = async (req: Request, res: Response) => {
  try {
    const { tipo, categoria, monto, descripcion } = req.body;

    if (!tipo || !categoria || !monto || isNaN(Number(monto))) {
      return res.status(400).send("Datos inválidos");
    }

    const nueva = await TransaccionService.crear({
      tipo,
      categoria,
      monto: parseFloat(monto),
      descripcion,
    });

    res.redirect("/transacciones");

  } catch (error) {
    console.error("Error al crear transacción:", error);
    res.status(500).send("Error al crear la transacción");
  }
};


export const verTransaccion = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const transaccion = await TransaccionService.obtenerPorId(id);

    if (!transaccion) {
      return res.status(404).send("Transacción no encontrada");
    }

    res.render("detalle", { transaccion });

  } catch (error) {
    console.error("Error al obtener transacción:", error);
    res.status(500).send("Error interno");
  }
};


export const actualizarTransaccion = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { tipo, categoria, monto, descripcion } = req.body;

    await TransaccionService.actualizar(id, {
      tipo,
      categoria,
      monto: monto ? parseFloat(monto) : undefined,
      descripcion,
    });

    res.redirect("/transacciones");

  } catch (error) {
    console.error("Error al actualizar:", error);
    res.status(500).send("Error al actualizar");
  }
};

export const eliminarTransaccion = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await TransaccionService.eliminar(id);

    res.redirect("/transacciones");

  } catch (error) {
    console.error("Error al eliminar:", error);
    res.status(500).send("Error al eliminar");
  }
};

// GRAFICOS
export const verGraficos = async (req: Request, res: Response) => {
  try {
    const { ingresos, egresos } = await TransaccionService.calcularTotales();

    res.render("grafico", { ingresos, egresos });

  } catch (error) {
    console.error("Error al generar gráficos:", error);
    res.status(500).send("Error al generar gráficos");
  }
};
