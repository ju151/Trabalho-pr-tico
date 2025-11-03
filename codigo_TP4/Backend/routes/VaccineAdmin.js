import express from "express";
import Vaccine from "../src/models/Vaccine.js"; 
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, admin);

// GET: Listar todas as vacinas
router.get("/", async (req, res) => {
  try {
    const vaccines = await Vaccine.find({});
    res.json(vaccines);
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

// POST: Criar uma nova vacina
router.post("/", async (req, res) => {
  try {
    const newVaccine = new Vaccine(req.body);
    await newVaccine.save();
    res.status(201).json(newVaccine);
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

// PUT: Atualizar uma vacina
router.put("/:id", async (req, res) => {
  try {
    const updatedVaccine = await Vaccine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedVaccine);
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

// DELETE: Deletar uma vacina
router.delete("/:id", async (req, res) => {
  try {
    await Vaccine.findByIdAndDelete(req.params.id);
    res.json({ msg: "Vacina deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

export default router;