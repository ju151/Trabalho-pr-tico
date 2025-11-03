import mongoose from "mongoose";

const UnidadeSchema = new mongoose.Schema({
  // 'type' é o ID usado na URL (ex: "ubs", "upa", "hospital")
  type: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  // 'name' é o título do card (ex: "UBS")
  name: {
    type: String,
    required: true,
  },
  // 'title' é o título da página de detalhes (ex: "UBS (Unidade Básica de Saúde)")
  title: {
    type: String,
    required: true,
  },
  // 'summaryItems' são os tópicos do card (ex: ["Foco em Prevenção...", "Vacinação..."])
  summaryItems: {
    type: [String],
    default: [],
  },
  // 'fullDescription' é o texto principal da página de detalhes
  fullDescription: {
    type: String,
    default: "Sem descrição.",
  },
  // 'indicadoPara' são os tópicos da página de detalhes
  indicadoPara: {
    type: [String],
    default: [],
  },
  // 'buttonStyle' é para o visual do card ("primary" ou "secondary")
  buttonStyle: {
    type: String,
    default: "secondary",
  },
}, { timestamps: true });

const Unidade = mongoose.model("Unidade", UnidadeSchema);
export default Unidade;