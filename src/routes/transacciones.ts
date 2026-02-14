import { Router } from "express";
import { listarTransacciones, crearTransaccion, verGraficos } from "../controllers/transaccionController";

const router = Router();

router.get("/", listarTransacciones);
router.post("/", crearTransaccion);

router.get("/graficos", verGraficos);
export default router;
