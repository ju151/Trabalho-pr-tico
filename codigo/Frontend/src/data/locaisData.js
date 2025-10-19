export const locaisData = {
    ubs: {
      titulo: "UBS (Unidade Básica de Saúde)",
      imagem: "/caminho/para/imagem_ubs.jpg", // Opcional
      descricao:
        "A UBS é a porta de entrada preferencial do Sistema Único de Saúde (SUS). O objetivo dessas unidades é atender até 80% dos problemas de saúde da população, sem que haja a necessidade de encaminhamento para hospitais.",
      indicadoPara: [
        "Consultas médicas de rotina (clínico geral, pediatra, ginecologista).",
        "Acompanhamento de doenças crônicas como diabetes e hipertensão.",
        "Vacinação e aplicação de curativos.",
        "Renovação de receitas de medicamentos de uso contínuo.",
        "Coleta de exames laboratoriais básicos.",
        "Atendimento odontológico básico.",
        "Sintomas leves e que não representam risco imediato (ex: resfriados, alergias, dores de cabeça leves).",
      ],
    },
    posto: {
      titulo: "Posto de Saúde",
      descricao:
        "Frequentemente confundido com a UBS, o Posto de Saúde é uma unidade de menor porte, focada principalmente em ações de prevenção, promoção da saúde e atendimento a casos de baixíssima complexidade. Geralmente está mais ligado ao programa de Saúde da Família.",
      indicadoPara: [
        "Acompanhamento de gestantes (Pré-natal).",
        "Acompanhamento pediátrico e puericultura (crescimento do bebê).",
        "Consultas de enfermagem.",
        "Visitas de Agentes Comunitários de Saúde.",
        "Tratamento de sintomas muito leves (gripes, alergias) e orientação.",
        "Vínculo direto com a comunidade local para ações educativas.",
      ],
    },
    hospital: {
      titulo: "Hospital",
      descricao:
        "O Hospital é uma unidade de alta complexidade, destinada a casos de emergência, cirurgias e pacientes que necessitam de internação para acompanhamento intensivo. Não deve ser procurado para sintomas leves ou consultas de rotina.",
      indicadoPara: [
        "Casos de emergência com risco de vida (ex: dor no peito, falta de ar severa, acidentes graves).",
        "Atendimento a traumas (fraturas, cortes profundos).",
        "Cirurgias (agendadas ou de emergência).",
        "Exames complexos (tomografia, ressonância magnética).",
        "Pacientes que precisam de internação e observação (UTI).",
        "Sintomas súbitos e graves (ex: perda de consciência, convulsões).",
      ],
    },
    upa: {
        titulo: "UPA (Unidade de Pronto Atendimento)",
        descricao:
          "A UPA funciona 24 horas por dia e é o meio-termo entre um Posto de Saúde/UBS e um Hospital. Ela é focada em urgências e emergências de complexidade intermediária, ajudando a diminuir as filas nos prontos-socorros dos hospitais.",
        indicadoPara: [
          "Febre alta (acima de 39°C) que não cede.",
          "Dores fortes (como dor de cabeça intensa ou dor abdominal).",
          "Vômitos ou diarreia que não param.",
          "Cortes (necessidade de sutura/pontos).",
          "Torções, luxações ou fraturas (não expostas).",
          "Crises de pressão alta ou picos de glicemia (diabetes).",
          "Sintomas respiratórios moderados (diferente de falta de ar severa, que é caso de Hospital).",
        ],
      },
  };