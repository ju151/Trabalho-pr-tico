import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },

  idade: { type: Number, default: null },
  sexo: { type: String, default: null },
  comorbidades: { type: Boolean, default: false },
  gestante: { type: Boolean, default: false },
  profissao: { type: String, default: null },

  profileCompleted: {
    type: Boolean,
    default: false
  },

  vacinasDisponiveis: {
    type: [String],
    default: [] 
  },
  vacinasTomadas: {
    type: [String],
    default: []
  }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;