import { PrismaClient, Transaccion } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Listar todas las transacciones
export const listarTransacciones = async (req: Request, res: Response) => {
  try {
    const transacciones: Transaccion[] = await prisma.transaccion.findMany();
    res.render("listar", { transacciones });
  } catch (error) {
    console.error("Error al listar transacciones:", error);
    res.status(500).send("Error al obtener las transacciones");
  }
};

// Crear nueva transacción
export const crearTransaccion = async (req: Request, res: Response) => {
  try {
    const { tipo, categoria, monto, descripcion } = req.body;

    // Validaciones básicas
    if (!tipo || !categoria || !monto || isNaN(Number(monto))) {
      return res.status(400).send("Datos de transacción incompletos o inválidos");
    }

    const nueva: Transaccion = await prisma.transaccion.create({
      data: {
        tipo,
        categoria,
        monto: parseFloat(monto),
        descripcion: descripcion || "",
      },
    });

    res.render("creada", { transaccion: nueva });
  } catch (error) {
    console.error("Error al crear transacción:", error);
    res.status(500).send("Error al crear la transacción");
  }
};

// Mostrar gráficos de ingresos y egresos
export const verGraficos = async (req: Request, res: Response) => {
  try {
    const transacciones: Transaccion[] = await prisma.transaccion.findMany();

    const ingresos = transacciones
      .filter(t => t.tipo === "ingreso")
      .reduce((acc, t) => acc + Number(t.monto), 0);

    const egresos = transacciones
      .filter(t => t.tipo === "gasto")
      .reduce((acc, t) => acc + Number(t.monto), 0);

    res.render("grafico", { ingresos, egresos });
  } catch (error) {
    console.error("Error al calcular gráficos:", error);
    res.status(500).send("Error al generar gráficos");
  }
};
