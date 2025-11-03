# Plano de Testes da Aplicação

Esta página descreve os casos de teste para cada caso de uso principal do sistema.

---

## Caso de Uso: Cadastro de Usuário

### Teste 1.1: Cadastro com sucesso
1.  **Passo:** Navegar para a página `/register`.
2.  **Passo:** Preencher o email com "teste@exemplo.com".
3.  **Passo:** Preencher a senha com "123456".
4.  **Passo:** Clicar em "Cadastrar".
5.  **Resultado Esperado:** A mensagem "Usuário cadastrado com sucesso!" deve aparecer.

### Teste 1.2: Tentativa de cadastro com email duplicado
1.  **Pré-condição:** O teste 1.1 já foi executado.
2.  **Passo:** Navegar para a página `/register`.
3.  **Passo:** Preencher o email com "teste@exemplo.com" (o mesmo do teste anterior).
4.  **Passo:** Preencher a senha com "123456".
5.  **Passo:** Clicar em "Cadastrar".
6.  **Resultado Esperado:** A mensagem de erro "Este email já está cadastrado." deve aparecer.

### Teste 1.3: Tentativa de cadastro com campos vazios
1.  **Passo:** Navegar para a página `/register`.
2.  **Passo:** Deixar o email e a senha vazios.
3.  **Passo:** Clicar em "Cadastrar".
4.  **Resultado Esperado:** O navegador deve exibir um aviso (devido ao atributo 'required' do HTML) e o formulário não deve ser enviado.

---

## Caso de Uso: Login de Usuário

### Teste 2.1: Login com sucesso
1.  **Pré-condição:** Usuário "teste@exemplo.com" (senha "123456") deve existir (criado no Teste 1.1).
2.  **Passo:** Navegar para a página `/login`.
3.  **Passo:** Preencher o email "teste@exemplo.com" e a senha "123456".
4.  **Passo:** Clicar em "Entrar".
5.  **Resultado Esperado:** O usuário deve ser redirecionado para a página `/perfil`. O menu deve mudar para "Olá, teste" e "Sair".

### Teste 2.2: Login com senha incorreta
1.  **Pré-condição:** Usuário "teste@exemplo.com" existe.
2.  **Passo:** Navegar para `/login`.
3.  **Passo:** Preencher o email "teste@exemplo.com" e a senha "senha-errada-999".
4.  **Passo:** Clicar em "Entrar".
5.  **Resultado Esperado:** A mensagem de erro "Email ou senha inválidos." deve aparecer.

### Teste 2.3: Login com email inexistente
1.  **Passo:** Navegar para `/login`.
2.  **Passo:** Preencher o email "naoexiste@exemplo.com" e qualquer senha.
3.  **Passo:** Clicar em "Entrar".
4.  **Resultado Esperado:** A mensagem de erro "Email ou senha inválidos." deve aparecer.

---

## Caso de Uso: Gerenciamento de Perfil

### Teste 3.1: Primeiro salvamento de perfil (Geração de Vacinas)
1.  **Pré-condição:** Um usuário recém-cadastrado (sem perfil salvo) deve estar logado (ver Teste 2.1).
2.  **Passo:** O usuário está na página `/perfil` e o formulário está em modo de edição.
3.  **Passo:** Preencher Idade: `30`, Profissão: `saude`, Marcar "Possui comorbidades?".
4.  **Passo:** Clicar em "Salvar Perfil".
5.  **Resultado Esperado:** O formulário deve "travar" (modo de visualização) e o botão "Editar Perfil" deve aparecer. A lista "Vacinas Disponíveis" deve ser preenchida (ex: Gripe, Covid (Reforço)).

### Teste 3.2: Mover vacina para "Tomadas"
1.  **Pré-condição:** Teste 3.1 foi concluído. A vacina "Gripe" está em "Disponíveis".
2.  **Passo:** Clicar no botão "Já tomei" ao lado de "Gripe".
3.  **Resultado Esperado:** A vacina "Gripe" deve desaparecer da lista "Vacinas Disponíveis" e aparecer na lista "Vacinas Já Tomadas".

### Teste 3.3: Edição de perfil (Verificação de Bug da Vacina Duplicada)
1.  **Pré-condição:** Teste 3.2 foi concluído. "Gripe" está em "Tomadas".
2.  **Passo:** Clicar em "Editar Perfil" (o formulário deve "destravar").
3.  **Passo:** Mudar a Idade para `31`.
4.  **Passo:** Clicar em "Salvar Perfil".
5.  **Resultado Esperado:** O perfil deve salvar e "travar". A vacina "Gripe" **não** deve reaparecer na lista "Vacinas Disponíveis".

---

## Caso de Uso: Administração de Vacinas

*(Pré-condição para todos os testes: O usuário logado deve ter `role: "admin"`)*

### Teste 4.1: Criação de nova vacina
1.  **Passo:** Navegar para a página `/admin/vacinas`.
2.  **Passo:** Preencher o formulário "Adicionar Nova Vacina" com: Nome: `TesteVacina`, Regra: `appliesToAll` (marcado).
3.  **Passo:** Clicar em "Criar Vacina".
4.  **Resultado Esperado:** "TesteVacina" deve aparecer imediatamente na lista "Vacinas Cadastradas" à esquerda.

### Teste 4.2: Verificação de vacina no formulário público
1.  **Pré-condição:** Teste 4.1 foi concluído.
2.  **Passo:** Navegar para a página pública `/vacina` (Formulário de Elegibilidade).
3.  **Resultado Esperado:** A vacina "TesteVacina" deve aparecer na lista do dropdown "Vacina".

### Teste 4.3: Deletar vacina
1.  **Pré-condição:** Teste 4.1 foi concluído.
2.  **Passo:** Navegar para `/admin/vacinas`.
3.  **Passo:** Clicar em "Deletar" ao lado de "TesteVacina".
4.  **Passo:** Confirmar a exclusão (clicar "OK" no alerta).
5.  **Resultado Esperado:** "TesteVacina" deve desaparecer da lista "Vacinas Cadastradas".
