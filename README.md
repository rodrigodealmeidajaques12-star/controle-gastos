# 💰 Sistema de Controle de Gastos

Projeto desenvolvido como desafio técnico utilizando **ASP.NET Core**, **Entity Framework Core**, **React**, **TypeScript** e **SQLite**.

---

# 📖 Sobre o Projeto

O Sistema de Controle de Gastos é uma aplicação Full Stack desenvolvida para permitir o gerenciamento financeiro de pessoas por meio do cadastro de receitas e despesas.

A aplicação possibilita cadastrar pessoas, registrar transações financeiras, visualizar todas as movimentações realizadas e acompanhar automaticamente os totais de receitas, despesas e saldo por pessoa, além do saldo geral do sistema.

O projeto foi desenvolvido utilizando uma arquitetura em camadas, separando Frontend, Backend e Banco de Dados, seguindo boas práticas de organização de código.

---

# 🎯 Objetivo

Desenvolver uma aplicação web que permita:

- Cadastrar pessoas.
- Registrar receitas e despesas.
- Visualizar todas as transações cadastradas.
- Calcular automaticamente os totais individuais.
- Exibir o saldo geral do sistema.

---

# 🚀 Tecnologias Utilizadas

## Backend

- ASP.NET Core
- C#
- Entity Framework Core
- SQLite

## Frontend

- React
- TypeScript
- Vite
- CSS

---

# 📁 Estrutura do Projeto

```
ControleGastos/

├── Backend/
│   ├── Controllers/
│   ├── Data/
│   ├── Enums/
│   ├── Models/
│   ├── Migrations/
│   ├── Program.cs
│   └── appsettings.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# ✅ Funcionalidades

## Pessoas

- Cadastro de pessoas
- Listagem de pessoas
- Exclusão de pessoas

## Transações

- Cadastro de receitas
- Cadastro de despesas
- Listagem de transações
- Exclusão de transações

## Totais

- Total de receitas por pessoa
- Total de despesas por pessoa
- Saldo individual
- Saldo geral

## Interface

- Atualização automática após alterações
- Interface responsiva
- Mensagens de sucesso para as operações realizadas

---

# 🗄️ Banco de Dados

O projeto utiliza o banco de dados **SQLite**.

## Pessoa

| Campo | Tipo |
|--------|------|
| Id | int |
| Nome | string |
| Idade | int |

---

## Transação

| Campo | Tipo |
|--------|------|
| Id | int |
| Descricao | string |
| Valor | decimal |
| Tipo | Receita ou Despesa |
| PessoaId | int |

---

# 📌 Regras de Negócio

- Cada transação pertence a uma pessoa.
- Uma pessoa pode possuir várias transações.
- Receitas aumentam o saldo.
- Despesas diminuem o saldo.
- Ao excluir uma pessoa, todas as suas transações são removidas automaticamente (Cascade Delete).
- Os totais são atualizados automaticamente após qualquer alteração.

---

# 🔗 Endpoints da API

## Pessoas

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | /Pessoas | Lista todas as pessoas |
| POST | /Pessoas | Cadastra uma pessoa |
| DELETE | /Pessoas/{id} | Remove uma pessoa |

---

## Transações

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | /Transacoes | Lista todas as transações |
| POST | /Transacoes | Cadastra uma transação |
| DELETE | /Transacoes/{id} | Remove uma transação |

---

## Totais

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | /Totais | Retorna os totais por pessoa e o saldo geral |

---

# ▶️ Como Executar o Projeto

## 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

---

## 2. Executar o Backend

```bash
cd Backend

dotnet restore

dotnet run
```

---

## 3. Executar o Frontend

```bash
cd Frontend

npm install

npm run dev
```

---

## 4. Acessar a aplicação

Frontend:

```
http://localhost:5173
```

Backend:

```
https://localhost:xxxx
```

---

# 💡 Decisões de Desenvolvimento

Durante o desenvolvimento foram adotadas algumas decisões para manter o projeto organizado e de fácil manutenção:

- Separação entre Frontend e Backend.
- Utilização de Entity Framework Core para persistência dos dados.
- Organização do Frontend em componentes React.
- Tipagem utilizando TypeScript.
- Atualização automática da interface após operações de cadastro e exclusão.
- Exclusão em cascata para manter a integridade dos dados.

---

# 📈 Melhorias Futuras

- Edição de pessoas.
- Edição de transações.
- Pesquisa por nome.
- Filtro por período.
- Dashboard com gráficos.
- Exportação para Excel ou PDF.
- Sistema de autenticação de usuários.

---

# 👨‍💻 Autor

**Rodrigo Almeida**

Desenvolvido como parte de um desafio técnico para demonstrar conhecimentos em desenvolvimento Full Stack utilizando ASP.NET Core e React.

---

# 📄 Licença

Este projeto foi desenvolvido exclusivamente para fins de estudo e avaliação técnica.