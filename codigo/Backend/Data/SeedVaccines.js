// Conteúdo de: Backend/data/seedVaccines.js

export const seedVaccines = [
    {
      name: "Gripe (Influenza)",
      description: "Proteção anual contra o vírus da gripe.",
      appliesToAll: false,
      priorityGroups: {
        minAge: 60,
        professions: ["saude"],
        comorbidades: true,
        gestante: true,
      }
    },
    {
      name: "Covid-19 (Dose 1)",
      description: "Dose inicial contra o coronavírus.",
      appliesToAll: false,
      priorityGroups: {
        minAge: 18
      }
    },
    {
      name: "Hepatite B",
      description: "Proteção contra Hepatite B.",
      appliesToAll: true,
      priorityGroups: {}
    },
    {
      name: "Febre Amarela",
      description: "Dose única para áreas recomendadas.",
      appliesToAll: false,
      priorityGroups: {
        minAge: 1,
        maxAge: 59
      }
    },
    {
      name: "HPV",
      description: "Previne contra o Papilomavírus Humano.",
      appliesToAll: false,
      priorityGroups: {
        minAge: 9,
        maxAge: 45
      }
    }
  ];