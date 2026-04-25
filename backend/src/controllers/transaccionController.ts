import { Request, Response } from "express";
import { TransaccionService } from "../services/transaccionService";

export const listarTransacciones = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await TransaccionService.listar(page, limit);

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener las transacciones" });
  }
};

export const listarPorCategoria = async (req: Request, res: Response) => {
  try {
    const { categoria } = req.params;

    if (!categoria) {
      return res.status(400).json({ error: "Categoría requerida" });
    }

    const transacciones = await TransaccionService.listarPorCategoria(categoria);

    return res.json(transacciones);
  } catch (error) {
    return res.status(500).json({ error: "Error al filtrar por categoría" });
  }
};

export const listarPorTipo = async (req: Request, res: Response) => {
  try {
    const { tipo } = req.params;

    if (!["ingreso", "gasto"].includes(tipo)) {
      return res.status(400).json({ error: "Tipo inválido" });
    }

    const transacciones = await TransaccionService.listarPorTipo(tipo);

    return res.json(transacciones);
  } catch (error) {
    return res.status(500).json({ error: "Error al filtrar por tipo" });
  }
};

export const listarPorFecha = async (req: Request, res: Response) => {
  try {
    const { fecha } = req.query;

    if (!fecha) {
      return res.status(400).json({ error: "Debe enviar una fecha" });
    }

    const fechaDate = new Date(fecha as string);

    if (isNaN(fechaDate.getTime())) {
      return res.status(400).json({ error: "Fecha inválida" });
    }

    const transacciones = await TransaccionService.listarPorFecha(fechaDate);

    return res.json(transacciones);
  } catch (error) {
    return res.status(500).json({ error: "Error al filtrar por fecha" });
  }
};

export const listarPorRangoFechas = async (req: Request, res: Response) => {
  try {
    const { inicio, fin } = req.query;

    if (!inicio || !fin) {
      return res.status(400).json({ error: "Fechas inicio y fin requeridas" });
    }

    const fechaInicio = new Date(inicio as string);
    const fechaFin = new Date(fin as string);

    if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
      return res.status(400).json({ error: "Fechas inválidas" });
    }

    const transacciones = await TransaccionService.listarPorRangoFechas(
      fechaInicio,
      fechaFin
    );

    return res.json(transacciones);
  } catch (error) {
    return res.status(500).json({ error: "Error al filtrar por rango" });
  }
};

export const crearTransaccion = async (req: Request, res: Response) => {
  console.log("Creando transacción con datos:", req.body);
  try {
    const { tipo, categoria, monto, descripcion } = req.body;

    if (!["ingreso", "gasto"].includes(tipo)) {
      return res.status(400).json({ error: "Tipo inválido" });
    }

    if (!categoria || categoria.trim().length < 3) {
      return res.status(400).json({ error: "Categoría inválida" });
    }

    const montoNumero = Number(monto);
    if (isNaN(montoNumero) || montoNumero <= 0) {
      return res.status(400).json({ error: "Monto inválido" });
    }

    const nueva = await TransaccionService.crear({
      tipo,
      categoria: categoria.trim(),
      monto: montoNumero,
      descripcion: descripcion?.trim() || "",
    });

    return res.status(201).json(nueva);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear la transacción" });
  }
};

export const verTransaccion = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const transaccion = await TransaccionService.obtenerPorId(id);

    if (!transaccion) {
      return res.status(404).json({ error: "No encontrada" });
    }

    return res.json(transaccion);
  } catch (error) {
    return res.status(500).json({ error: "Error interno" });
  }
};

export const actualizarTransaccion = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const existe = await TransaccionService.obtenerPorId(id);
    if (!existe) {
      return res.status(404).json({ error: "No encontrada" });
    }

    const { tipo, categoria, monto, descripcion } = req.body;

    if (tipo && !["ingreso", "gasto"].includes(tipo)) {
      return res.status(400).json({ error: "Tipo inválido" });
    }

    let montoNumero: number | undefined;

    if (monto !== undefined) {
      montoNumero = Number(monto);
      if (isNaN(montoNumero) || montoNumero <= 0) {
        return res.status(400).json({ error: "Monto inválido" });
      }
    }

    await TransaccionService.actualizar(id, {
      tipo,
      categoria: categoria?.trim(),
      monto: montoNumero,
      descripcion: descripcion?.trim(),
    });

    return res.json({ message: "Actualizado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar" });
  }
};

export const eliminarTransaccion = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const existe = await TransaccionService.obtenerPorId(id);
    if (!existe) {
      return res.status(404).json({ error: "No encontrada" });
    }

    await TransaccionService.eliminar(id);

    return res.json({ message: "Eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar" });
  }
};

export const verGraficos = async (req: Request, res: Response) => {
  try {
    const { ingresos, egresos } = await TransaccionService.calcularTotales();

    return res.json({
      ingresos,
      egresos,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error al generar gráficos" });
  }
};