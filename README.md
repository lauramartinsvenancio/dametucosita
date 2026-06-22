# Sistema de Suporte - Área 51 (Dame Tu Cosita)

Projeto desenvolvido para a atividade de Backend. Trata-se de um sistema de atendimento ao cliente temático, com autenticação completa e um chatbot integrado.

## Objetivo da Atividade
Cumprir todos os requisitos obrigatórios solicitados:
- **Banco de Dados:** Histórico de usuários e conversas salvos no MySQL.
- **Sistema de Login:** Acesso restrito apenas para usuários autenticados.
- **Chatbot:** Robô automatizado ("Dame Tu Cosita") que reage com base nas palavras digitadas.
- **Tratamento de Erros:** Validações de campos vazios, banco de dados offline, usuário não cadastrado, etc.

## Tecnologias Utilizadas
- **Frontend:** Next.js (React) + Tailwind CSS
- **Backend:** Next.js API Routes (Node.js)
- **Banco de Dados:** MySQL
- **Segurança:** `bcryptjs` (senhas criptografadas) e `jsonwebtoken` (sessões com JWT)

## Como Rodar o Projeto

1. Ligue o serviço **MySQL** pelo XAMPP.
2. Abra o terminal na pasta do projeto e instale as dependências:
   ```bash
   npm install
   ```
3. Rode o servidor:
   ```bash
   npm run dev
   ```
4. Acesse `http://localhost:3000` no seu navegador. 

> **Nota para Avaliação:** O banco de dados (`alien_db`) e as tabelas são criados **automaticamente** pelo próprio código na primeira tentativa de login ou registro. Não é necessário importar nenhum script SQL manualmente.
