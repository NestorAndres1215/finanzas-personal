import { Request, Response } from "express";
import { TransaccionService } from "../services/transaccionservice";

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
