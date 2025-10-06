# Arquitetura do Sistema — Triagem de Saúde e Vacinação

## Visão Geral  
Este documento apresenta o modelo arquitetural adotado para o aplicação de triagem de sintomas e verificação de vacinação, com base no **C4 Model** (Context → Containers → Componentes). Aqui você verá as escolhas de tecnologia, diagramas e a justificativa da arquitetura escolhida.

---

## 1. Escolhas de Tecnologia  
- **Frontend**  
  - Tecnologia: React (SPA responsiva)  
  - Motivo: boa produtividade, comunidade ativa, flexibilidade e possibilidade de evolução para app híbrido/nativo.  
- **Backend**  
  - Tecnologia: Node.js + Express  
  - Motivo: desenvolvimento rápido de APIs REST, ecosistema vasto e suporte a middlewares.  
- **Banco de Dados**  
  - Tecnologia: PostgreSQL  
  - Motivo: banco relacional robusto, suporte a consultas geográficas (PostGIS) e confiabilidade para dados críticos.  

---

## 2. Modelo Arquitetural (C4)

> Os diagramas em `.puml` estão na pasta `docs/diagrams/`. Após renderização, grave-os como imagens (`.png` ou `.svg`) na mesma pasta e inclua no documento.

### 2.1 Contexto (C4 Level 1)  
Este diagrama mostra como o sistema se integra com atores e sistemas externos:  
- **Usuário** (cidadão) — interage com app para informar sintomas e checar vacina  
- **Administrador** — gerencia unidades, vacinas e regras  
- **Serviço de Geocoding / Maps** — usado para localizar unidades próximas  

  <img width="461" height="694" alt="c4-context" src="https://github.com/user-attachments/assets/9c0e8c69-e24b-4d0a-9ec8-856194b32d3e" />


### 2.2 Containers (C4 Level 2)  
Aqui se mostram os contêineres do sistema, suas responsabilidades e interações:

| Container | Responsabilidade | Tecnologias / Observações |
|-----------|------------------|----------------------------|
| Frontend (React SPA) | Interface do usuário para sintomas, vacinação, histórico e painel admin | Chama API via HTTP/JSON |
| API Backend (Node.js + Express) | Orquestra a lógica de negócios: triagem, vacinação, autenticação, comunicação com BD e serviços externos | REST API |
| Banco de Dados (PostgreSQL) | Persistência de usuários, triagem, vacinas, unidades, histórico | Pode usar PostGIS para consultas de proximidade |
| Serviço de Geocoding / Maps (externo) | Disponibiliza geolocalização de endereços e unidades | Uso de API externa (ex: Google Maps, OpenStreetMap) |
| Serviço de Notificações (opcional) | Envia notificações (ex.: SMS ou e-mail) | Pode ser um microserviço ou solução externa |

<img width="671" height="881" alt="c4-containers" src="https://github.com/user-attachments/assets/21db67a0-902f-4aed-a4c9-94e497305efa" />


### 2.3 Componentes (C4 Level 3) – dentro do Backend  
Dentro do container backend, os componentes principais são:

- **Router / Controllers** — recebe requisições HTTP e distribui para os módulos.  
- **Módulo Triagem** — implementa lógica ou árvore de decisão para mapear sintomas ao tipo de atendimento.  
- **Módulo Vacinação** — avalia elegibilidade com base nos dados do usuário (idade, histórico, contraindicações).  
- **Serviço de Unidades** — gerencia cadastro de unidades de saúde e busca por proximidade (integração com serviço de geocoding).  
- **Persistência (ORM / Repositório)** — abstração de acesso ao PostgreSQL, com migrations, modelos e consultas.  
- **Adaptadores Externos** — cliente para APIs externas (geocoding, notificações).

<img width="927" height="398" alt="c4-components" src="https://github.com/user-attachments/assets/263f660b-ed36-43a2-9501-2b029d28fb87" />


---

## 3. Justificativa do Modelo  
- **Clareza e comunicação:** O modelo C4 facilita comunicação entre partes técnicas e não técnicas, ideal para projetos acadêmicos.  
- **Modularidade e manutenção:** Dividir em contêineres e componentes permite evoluir partes isoladamente (por exemplo, trocar serviço de notificações sem tocar backend principal).  
- **Escalabilidade:** Se necessário, podemos escalar backend, adicionar microserviços ou cache no futuro.  
- **Segurança e conformidade:** O uso de práticas modernas (JWT, hashing, acesso restrito) ajudam a cumprir requisitos de segurança e LGPD.  
- **Trade-offs analisados:** Node.js é ágil e leve, mas pode ter limitações em sistemas altamente concorrentes — se fosse exigido um desempenho extremo, outras frameworks (ex: Java) poderiam ser consideradas.  

---
