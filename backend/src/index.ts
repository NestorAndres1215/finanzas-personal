import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import transaccionesRouter from "./routes/transacciones";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});


app.use("/transacciones", transaccionesRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "API de transacciones funcionando 🚀",
  });
});


app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});