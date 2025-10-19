# Projeto Saúde e Bem-Estar

Este é um projeto Full-Stack (React + Node.js) que simula um portal de saúde, permitindo triagem de sintomas, gerenciamento de vacinas e perfis de usuário.

---

## Pré-requisitos

Para rodar este projeto, você precisará ter instalado em sua máquina:

* **Node.js** (versão 16 ou superior)
* **npm** (geralmente instalado com o Node.js)
* Uma conta **MongoDB Atlas** (o plano gratuito é suficiente)

---

## Passo 1: Configuração do Banco de Dados (Backend)

O backend deste projeto requer uma conexão com um banco de dados MongoDB.

1.  **Crie um Banco no MongoDB Atlas:**
    * Crie uma conta gratuita no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
    * Crie um novo projeto e um "Cluster" (use o plano `M0 Free`).
    * Em **Security** > **Database Access**, crie um usuário e senha para o banco (ex: `user: admin`, `pass: 123456`).
    * Em **Security** > **Network Access**, clique em "Add IP Address" e adicione seu IP atual.
    * 
2.  **Obtenha a String de Conexão:**
    * Na visão geral do seu Cluster, clique em **Connect** > **Drivers**.
    * Copie a **Connection String** (URL).

3.  **Crie o arquivo `.env`:**
    * Navegue até a pasta `Backend` do projeto.
    * Crie um novo arquivo chamado `.env` (apenas `.env`).
    * Dentro deste arquivo, cole a linha abaixo, substituindo pelos seus dados do MongoDB:

    ```
    MONGO_URI=mongodb+srv://SEU_USUARIO:SUA_SENHA@cluster0.xxxxx.mongodb.net/saude-db?retryWrites=true&w=majority
    ```
    * **IMPORTANTE:** Substitua `SEU_USUARIO` e `SUA_SENHA` pelos que você criou no Passo 1.

---

## Passo 2: Executando a Aplicação (2 Terminais)

Para a aplicação funcionar, o Backend (servidor) e o Frontend (site) precisam rodar ao mesmo tempo. Você precisará de **dois terminais** abertos.

### Terminal 1: Rodando o Backend (API)

1.  Abra um terminal e navegue até a pasta `Backend`:
    ```bash
    cd CAMINHO_PARA_O_PROJETO/PROJETO-SAUDE-BEMESTAR/Backend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  **(Opcional, mas recomendado)** Rode o script de "seed" para cadastrar as vacinas no banco:
    ```bash
    npm run seed
    ```


4.  Inicie o servidor principal:
    ```bash
    npm start
    ```

### Terminal 2: Rodando o Frontend (Site)

1.  Abra um **novo** terminal e navegue até a pasta `Frontend`:
    ```bash
    cd CAMINHO_PARA_O_PROJETO/PROJETO-SAUDE-BEMESTAR/Frontend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento (Vite):
    ```bash
    npm run dev
    ```
4.  O terminal mostrará o endereço para acessar o site.

---

## Passo 3: Acessando o Site

1.  Com os dois terminais rodando, abra seu navegador e acesse:
    **`http://localhost:5173/`**

2.  Você deve primeiro:
    * Clicar em **"Cadastrar"** para criar um novo usuário 
    * Clicar em **"Login"** para entrar.
    * Acessar seu **"Perfil"** para preencher os dados e ver as vacinas.
    * Acessar a página **"Admin"** para cadastrar novas vacinas e regras.
