import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Importações das rotas
import triagemRoutes from "./routes/triagem.js";
import vacinaRoutes from "./routes/vacina.js";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import vaccineAdminRoutes from "./routes/VaccineAdmin.js";
import unidadePublicRoutes from "./routes/unidades.js"; 
import unidadeAdminRoutes from "./routes/unidadeAdmin.js";
import vaccinePublicRoutes from "./routes/vaccines.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/triagem", triagemRoutes);
app.use("/api/vacina", vacinaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin/vaccines", vaccineAdminRoutes); 
app.use("/api/unidades", unidadePublicRoutes); 
app.use("/api/admin/unidades", unidadeAdminRoutes);
app.use("/api/vaccines", vaccinePublicRoutes);

const PORT = process.env.PORT || 5000;

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso!");
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });