# Forca Dev

Jogo da forca com palavras ligadas ao desenvolvimento de software. O jogador informa um apelido, recebe uma palavra sorteada pelo servidor e tenta descobri-la escolhendo letras. A aplicação registra as partidas no SQLite e apresenta as dez melhores vitórias no ranking.

A palavra secreta permanece no back-end durante a partida: o navegador recebe somente a máscara e os dados necessários para atualizar a tela.

## Tecnologias utilizadas

| Parte | Tecnologias |
| --- | --- |
| Back-end | Node.js, TypeScript e Fastify |
| Persistência | SQLite e Prisma ORM 6.19.3 |
| Validação | Zod |
| Front-end | React, Vite e TypeScript |
| Interface | CSS |

## O que o sistema oferece

- Cadastro de apelido entre 3 e 20 caracteres para iniciar uma partida.
- Sorteio de palavras em quatro categorias, armazenadas no banco.
- Teclado virtual de A a Z, com indicação de letras corretas e incorretas.
- Seis vidas por rodada.
- Cálculo de pontos nas vitórias: vidas restantes × 10 + letras distintas da palavra × 5.
- Tela de resultado com a palavra revelada e a pontuação.
- Ranking das dez vitórias com maior pontuação; em caso de empate, vale a conclusão mais antiga.
- Avisos de carregamento e mensagens de erro retornadas pela API.

## Requisitos para executar

- Node.js 20 ou 22 (LTS).
- npm.

## Instalação

Abra um terminal na pasta principal do projeto e instale as dependências de cada parte:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Configuração do banco

Na pasta `backend`, crie um arquivo `.env` usando `.env.example` como referência. O conteúdo esperado é:

```env
DATABASE_URL="file:../forca.db"
PORT=3333
```

Ainda na pasta `backend`, execute:

```bash
npx prisma generate
npx prisma db push
npm run seed
```

O comando `db push` cria ou atualiza as tabelas a partir de `prisma/schema.prisma`. O seed cadastra 24 palavras e pode ser executado novamente sem duplicar os registros.

## Inicialização

É necessário manter dois terminais abertos.

**Terminal 1 — API** (na pasta `backend`):

```bash
npm run dev
```

A API ficará disponível em `http://127.0.0.1:3333`.

**Terminal 2 — interface** (na pasta `frontend`):

```bash
npm run dev
```

Abra o endereço informado pelo Vite, normalmente `http://localhost:5173`. O proxy do Vite encaminha as chamadas `/api` para a API local; por isso, o back-end deve estar iniciado.

## Compilação para conferir os projetos

Na pasta `backend`:

```bash
npm run build
```

Na pasta `frontend`:

```bash
npm run build
```

## Organização das pastas

```text
forca-enzo/
├── backend/
│   ├── prisma/          # schema e seed do banco
│   ├── src/
│   │   ├── controllers/ # entrada das requisições
│   │   ├── database/    # cliente Prisma
│   │   ├── game/        # regras do jogo
│   │   ├── plugins/     # tratamento de erros
│   │   ├── repositories/# consultas e gravações
│   │   ├── routes/      # endpoints da API
│   │   ├── schemas/     # validação com Zod
│   │   └── services/    # fluxo e regras de negócio
│   └── package.json
├── frontend/
│   └── src/
│       ├── components/  # peças reutilizáveis da interface
│       ├── hooks/       # hooks React
│       ├── pages/       # telas do jogo
│       ├── services/    # comunicação com a API
│       └── types/       # tipos TypeScript
├── docs/                # documentação complementar
└── README.md
```

## Rotas disponíveis

A descrição dos parâmetros, exemplos de respostas e códigos de erro está em [`docs/api.md`](docs/api.md).

| Método | Caminho | Finalidade |
| --- | --- | --- |
| POST | `/api/partidas` | Inicia uma partida |
| GET | `/api/partidas/:id` | Consulta uma partida |
| POST | `/api/partidas/:id/palpites` | Envia uma letra |
| GET | `/api/ranking` | Consulta as dez melhores vitórias |

## Documentação complementar

- [`docs/planejamento.md`](docs/planejamento.md): objetivo, dados, rotas e organização.
- [`docs/api.md`](docs/api.md): contrato da API e exemplos de retorno.
- [`docs/decisoes.md`](docs/decisoes.md): decisões técnicas registradas.
- [`docs/diario-de-bordo.md`](docs/diario-de-bordo.md): registros de desenvolvimento.
