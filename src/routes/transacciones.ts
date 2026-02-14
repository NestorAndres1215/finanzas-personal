import { Router } from "express";
import {
  listarTransacciones,
  crearTransaccion,
  verGraficos,
  listarPorCategoria,
  listarPorTipo,
  listarPorFecha,
  listarPorRangoFechas,
  verTransaccion,
  actualizarTransaccion,
  eliminarTransaccion
} from "../controllers/transaccionController";

const router = Router();

router.get("/", listarTransacciones);
router.post("/", crearTransaccion);
router.get("/graficos", verGraficos);
router.get("/categoria/:categoria", listarPorCategoria);
router.get("/tipo/:tipo", listarPorTipo);
router.get("/fecha", listarPorFecha); 
router.get("/rango", listarPorRangoFechas);
router.get("/:id", verTransaccion);
router.post("/:id/actualizar", actualizarTransaccion);
router.post("/:id/eliminar", eliminarTransaccion);

export default router;
