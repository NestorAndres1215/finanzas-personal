export interface Transaction {
  id: number;
  tipo: "ingreso" | "gasto";
  categoria: string;
  monto: number;
  descripcion?: string;
}