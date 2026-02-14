import express, { Request, Response, NextFunction } from "express";
import path from "path";
import dotenv from "dotenv";
import transaccionesRouter from "./routes/transacciones";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/transacciones", transaccionesRouter);

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});


app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
