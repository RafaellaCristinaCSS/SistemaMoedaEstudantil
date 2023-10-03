# SistemaMoedaEstudantil
## História de Usuário: Cadastro de Aluno no Sistema de Mérito

**Como** aluno que deseja ingressar no sistema de mérito,
**Eu quero** realizar um cadastro fornecendo informações pessoais e selecionando minha instituição e curso,
**Para** poder participar do sistema de mérito e receber moedas por bom comportamento e realizações acadêmicas.

### Critérios de Aceitação:
- Deve ser possível acessar a página de cadastro no sistema de mérito.
- Ao realizar o cadastro, devo fornecer as seguintes informações: nome, email, CPF, RG, endereço, instituição de ensino e curso.
- Devo selecionar minha instituição de ensino a partir de uma lista pré-cadastrada.
- Após o cadastro, devo receber um email de confirmação informando que minha inscrição foi concluída com sucesso.

## História de Usuário: Cadastro de Professor no Sistema de Mérito

**Como** professor pré-cadastrado,
**Eu quero** ser reconhecido no sistema de mérito e associado a uma instituição,
**Para** poder distribuir moedas aos alunos e acompanhar meu saldo.

### Critérios de Aceitação:
- O professor já está pré-cadastrado no sistema, fornecendo nome, CPF e departamento.
- Deve ser possível associar o professor a uma instituição de ensino.
- Após o cadastro, o professor deve receber um email de confirmação informando que sua associação à instituição foi concluída com sucesso.

## História de Usuário: Distribuição de Moedas pelos Professores

**Como** professor,
**Eu quero** ter a capacidade de distribuir moedas aos alunos,
**Para** reconhecer seu bom comportamento e realizações acadêmicas.

### Critérios de Aceitação:
- Cada professor recebe um total de mil moedas a cada semestre.
- O professor deve ter um saldo atualizado de moedas.
- Deve ser possível selecionar um aluno e especificar o motivo para distribuir moedas.
- Após a distribuição de moedas, o aluno deve receber um email de notificação.

## História de Usuário: Consulta de Extrato

**Como** professor ou aluno,
**Eu quero** consultar meu extrato de conta,
**Para** visualizar o saldo de moedas e as transações realizadas.

### Critérios de Aceitação:
- Deve ser possível acessar a página de consulta de extrato.
- O extrato deve exibir o saldo atual de moedas.
- Deve ser possível visualizar um registro de todas as transações realizadas, incluindo envios de moedas (para professores) e recebimentos/trocas de moedas (para alunos).

## História de Usuário: Cadastro de Empresa Parceira

**Como** empresa que deseja oferecer vantagens aos alunos,
**Eu quero** cadastrar minha empresa no sistema de mérito,
**Para** disponibilizar vantagens em troca de moedas aos alunos.

### Critérios de Aceitação:
- Deve ser possível acessar a página de cadastro de empresa parceira.
- A empresa deve fornecer informações como nome, vantagens oferecidas e custo de cada vantagem em moedas.
- Deve ser possível adicionar uma descrição e foto do produto oferecido.
- Após o cadastro, a empresa deve receber um email de confirmação informando que seu registro foi concluído com sucesso.

## História de Usuário: Troca de Moedas por Vantagens

**Como** aluno,
**Eu quero** trocar minhas moedas por vantagens oferecidas pelas empresas parceiras,
**Para** aproveitar os benefícios oferecidos no sistema de mérito.

### Critérios de Aceitação:
- Deve ser possível acessar a lista de vantagens disponíveis para troca.
- Ao selecionar uma vantagem, o aluno deve ter o valor em moedas descontado do seu saldo.
- Um email de cupom deve ser enviado ao aluno para utilização presencial da vantagem.
- Um email deve ser enviado à empresa parceira com um código de verificação.
- O aluno deve ser capaz de ver um registro da vantagem resgatada em seu extrato de conta.

## História de Usuário: Autenticação de Usuários

**Como** usuário (aluno, professor ou empresa parceira),
**Eu quero** ter um login e senha cadastrados no sistema,
**Para** acessar de forma segura as funcionalidades do sistema de mérito.

### Critérios de Aceitação:
- Deve ser possível criar uma conta de usuário com um login e senha.
- Deve haver um processo de autenticação seguro para garantir o acesso protegido às funcionalidades do sistema.

