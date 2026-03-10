📌 CodeLeap Network – Technical Test

Este projeto é uma aplicação web desenvolvida como teste técnico, que permite aos usuários criar, visualizar, editar e excluir posts em um feed público.

A aplicação consome a API pública disponibilizada pela CodeLeap e implementa operações completas de CRUD de posts.

🚀 Tecnologias utilizadas

⚛️ React

▲ Next.js

📦 Axios

🧾 React Hook Form

🎨 Tailwind CSS

🧩 Context API

🧠 TypeScript

📷 Funcionalidades

A aplicação permite:

✅ Autenticação simples

O usuário informa apenas um username para acessar a aplicação.

✅ Criar posts

O usuário pode criar um post informando:

Title

Content

✅ Listar posts

Os posts são exibidos em um feed, contendo:

título

conteúdo

autor

data de criação

✅ Editar posts

O usuário pode editar apenas os posts criados por ele.

A edição abre um modal permitindo alterar:

título

conteúdo

✅ Deletar posts

O usuário pode excluir seus próprios posts.

Antes da exclusão é exibido um modal de confirmação.

📂 Estrutura do projeto
src/
 ├── app/
 │   ├── components/
 │   │   └── Modal.tsx
 │   │
 │   ├── context/
 │   │   └── UserContext.tsx
 │   │
 │   ├── signup/
 │   │   └── page.tsx
 │   │
 │   └── page.tsx
 │
 ├── styles/
 └── types/
🌐 API utilizada

A aplicação utiliza a API pública:

https://dev.codeleap.co.uk/careers/

Operações utilizadas:

Método	Endpoint	Descrição
GET	/careers/	Listar posts
POST	/careers/	Criar post
PATCH	/careers/{id}	Editar post
DELETE	/careers/{id}	Deletar post
⚙️ Como rodar o projeto
1️⃣ Clonar repositório
git clone https://github.com/Matdev6/codeleap-test.git
2️⃣ Entrar na pasta
cd codeleap-test
3️⃣ Instalar dependências
npm install

ou

yarn
4️⃣ Rodar o projeto
npm run dev
5️⃣ Abrir no navegador
http://localhost:3000
🧠 Decisões técnicas

Algumas decisões tomadas durante o desenvolvimento:

Uso do React Hook Form para gerenciamento de formulários

Uso de Context API para armazenar o usuário logado

Uso de Axios para comunicação com a API

Uso de modais reutilizáveis para confirmação de ações

Separação de componentes para melhor organização

🎯 Melhorias futuras

Possíveis melhorias:

Melhor formatação de data (ex: 2 minutes ago)

Paginação de posts

Loading states

Melhor tratamento de erros

Testes automatizados

UI/UX aprimorada

👨‍💻 Autor

Desenvolvido por Mateus Sousa

GitHub:
https://github.com/Matdev6