import mongoose from "mongoose";

const VaccineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: "Sem descrição.",
  },
  // Se 'true', aplica a todos (ex: Hepatite B)
  appliesToAll: {
    type: Boolean,
    default: false,
  },
  // Regras de grupos prioritários (lógica "OU")
  priorityGroups: {
    minAge: { type: Number, default: null },
    maxAge: { type: Number, default: null },
    professions: { type: [String], default: [] }, // ex: ["saude", "educacao"]
    comorbidades: { type: Boolean, default: false },
    gestante: { type: Boolean, default: false },
  },
}, { timestamps: true });

const Vaccine = mongoose.model("Vaccine", VaccineSchema);
export default Vaccine;