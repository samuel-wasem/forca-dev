# Planejamento do Forca Dev

## Objetivo

Desenvolver um jogo da forca com vocabulário de programação. A interface recebe o apelido e os palpites; o servidor controla a palavra secreta, as vidas, o resultado e a pontuação. As partidas ficam registradas em SQLite.

## Funcionalidades previstas e presentes no projeto

- Iniciar uma rodada com apelido de 3 a 20 caracteres.
- Sortear uma palavra cadastrada no banco e informar sua categoria.
- Receber um palpite por requisição e impedir letras repetidas.
- Atualizar a máscara e descontar uma vida quando a letra não aparece na palavra.
- Encerrar a partida por vitória ou derrota e calcular a pontuação da vitória.
- Consultar o estado de uma partida pelo identificador.
- Exibir o ranking das dez vitórias com maior pontuação.
- Informar carregamento e erros na interface.

## Tecnologias

| Camada | Ferramentas |
| --- | --- |
| Servidor | Node.js, TypeScript e Fastify |
| Validação | Zod |
| Banco de dados | SQLite |
| ORM | Prisma 6.19.3 |
| Interface | React, Vite, TypeScript e CSS |

## Modelagem dos dados

### Palavra

| Campo | Tipo | Regra |
| --- | --- | --- |
| `id` | Int | Chave primária autoincremental |
| `texto` | String | Único; palavra em maiúsculas e sem acentos |
| `categoria` | String | Grupo temático da palavra |

### Partida

| Campo | Tipo | Regra |
| --- | --- | --- |
| `id` | Int | Chave primária autoincremental |
| `jogador` | String | Apelido informado no início |
| `palavraId` | Int | Chave estrangeira para `Palavra` |
| `letrasTentadas` | String | Letras já usadas, armazenadas em sequência |
| `vidasRestantes` | Int | Começa em 6 |
| `status` | String | `em_andamento`, `vitoria` ou `derrota` |
| `pontos` | Int | Zero até uma vitória ser concluída |
| `iniciadaEm` | DateTime | Preenchido automaticamente na criação |
| `finalizadaEm` | DateTime? | Preenchido quando a rodada termina |

## Contrato de rotas

| Método | Caminho | Uso |
| --- | --- | --- |
| POST | `/api/partidas` | Cria uma partida |
| GET | `/api/partidas/:id` | Retorna o estado da partida |
| POST | `/api/partidas/:id/palpites` | Registra uma letra |
| GET | `/api/ranking` | Lista as dez melhores vitórias |

Os detalhes de entrada, saída e erros estão em [`api.md`](api.md).

## Organização técnica

O servidor separa responsabilidades em rotas, controllers, services e repositories. As regras independentes de HTTP e banco ficam em `backend/src/game/`. O cliente React organiza as telas em `pages/`, componentes reutilizáveis em `components/`, comunicação HTTP em `services/` e tipos compartilhados em `types/`.

## Sequência de desenvolvimento

1. Preparar o ambiente TypeScript e Fastify.
2. Definir as entidades no Prisma e cadastrar palavras iniciais.
3. Implementar e validar as regras do jogo.
4. Criar repositórios, serviços, controllers e rotas.
5. Conectar a interface React à API.
6. Implementar as telas de início, partida, resultado e ranking.
7. Registrar as decisões e instruções de execução na documentação.
