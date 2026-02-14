import { Transaccion } from "@prisma/client";
import prisma from "../prima";

export class TransaccionService {

  // LISTAR TODAS
  static async listar(): Promise<Transaccion[]> {
    return await prisma.transaccion.findMany({
      orderBy: {
        id: "desc",
      },
    });
  }

  // CREAR
  static async crear(data: {
    tipo: string;
    categoria: string;
    monto: number;
    descripcion?: string;
  }): Promise<Transaccion> {

    return await prisma.transaccion.create({
      data: {
        tipo: data.tipo,
        categoria: data.categoria,
        monto: data.monto,
        descripcion: data.descripcion || "",
      },
    });
  }

  // OBTENER POR ID
  static async obtenerPorId(id: number): Promise<Transaccion | null> {
    return await prisma.transaccion.findUnique({
      where: { id },
    });
  }

  // ELIMINAR
  static async eliminar(id: number): Promise<void> {
    await prisma.transaccion.delete({
      where: { id },
    });
  }

  // ACTUALIZAR
  static async actualizar(
    id: number,
    data: {
      tipo?: string;
      categoria?: string;
      monto?: number;
      descripcion?: string;
    }
  ): Promise<Transaccion> {

    return await prisma.transaccion.update({
      where: { id },
      data,
    });
  }

  // CALCULAR TOTALES
  static async calcularTotales(): Promise<{ ingresos: number; egresos: number }> {

    const transacciones = await prisma.transaccion.findMany();

    const ingresos = transacciones
      .filter(t => t.tipo === "ingreso")
      .reduce((acc, t) => acc + Number(t.monto), 0);

    const egresos = transacciones
      .filter(t => t.tipo === "gasto")
      .reduce((acc, t) => acc + Number(t.monto), 0);

    return { ingresos, egresos };
  }
}
