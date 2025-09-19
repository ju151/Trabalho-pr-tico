Diagrama de Caso de Uso

O diagrama abaixo representa as principais interações do sistema.

usecaseDiagram
  actor "Usuário" as U
  U --> (Informar sintomas)
  U --> (Receber indicação de unidade de saúde)
  U --> (Consultar informações da unidade)
  U --> (Avaliar elegibilidade para vacina)
  U --> (Consultar locais de vacinação)

  actor "Administrador" as A
  A --> (Cadastrar/Atualizar unidades de saúde)
  A --> (Cadastrar/Atualizar locais de vacinação)
  A --> (Gerenciar regras de triagem e vacinação)

