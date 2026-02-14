import { Transaccion } from "@prisma/client";
import prisma from "../prima";

export class TransaccionService {


    static async listar(): Promise<Transaccion[]> {
        return await prisma.transaccion.findMany({
            orderBy: {
                id: "desc",
            },
        });
    }

    static async listarPorCategoria(categoria: string): Promise<Transaccion[]> {
        return await prisma.transaccion.findMany({
            where: { categoria },
            orderBy: { id: "desc" },
        });
    }

    static async listarPorTipo(tipo: string): Promise<Transaccion[]> {
        return await prisma.transaccion.findMany({
            where: { tipo },
            orderBy: { id: "desc" },
        });
    }
    static async listarPorFecha(fecha: Date): Promise<Transaccion[]> {
        const inicio = new Date(fecha);
        inicio.setHours(0, 0, 0, 0);

        const fin = new Date(fecha);
        fin.setHours(23, 59, 59, 999);

        return await prisma.transaccion.findMany({
            where: {
                fecha: {
                    gte: inicio,
                    lte: fin,
                },
            },
            orderBy: { fecha: "desc" },
        });
    }

    static async listarPorRangoFechas(
        fechaInicio: Date,
        fechaFin: Date
    ): Promise<Transaccion[]> {

        return await prisma.transaccion.findMany({
            where: {
                fecha: {
                    gte: fechaInicio,
                    lte: fechaFin,
                },
            },
            orderBy: { fecha: "desc" },
        });
    }

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

    static async obtenerPorId(id: number): Promise<Transaccion | null> {
        return await prisma.transaccion.findUnique({
            where: { id },
        });
    }


    static async eliminar(id: number): Promise<void> {
        await prisma.transaccion.delete({
            where: { id },
        });
    }

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
