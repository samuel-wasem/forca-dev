# Decisões técnicas

## 1. Manter a palavra secreta no servidor

- **Contexto:** a interface precisa mostrar o progresso da rodada sem entregar antecipadamente a resposta.
- **Decisão:** o serviço monta a máscara e devolve `palavra: null` enquanto o status for `em_andamento`.
- **Alternativa considerada:** enviar a palavra completa e escondê-la visualmente no React.
- **Consequência:** os palpites passam pela API, que mantém o controle do estado e evita expor a resposta no tráfego normal da partida.

## 2. Separar regras de negócio das rotas

- **Contexto:** validação de letras, controle de vidas e pontuação não dependem diretamente do protocolo HTTP.
- **Decisão:** manter essas operações em funções próprias na pasta `backend/src/game/` e deixar o service coordenar o fluxo.
- **Alternativa considerada:** concentrar toda a lógica nos handlers das rotas.
- **Consequência:** as responsabilidades ficam separadas e as regras podem ser compreendidas sem acompanhar detalhes de requisição e persistência.

## 3. Usar SQLite com Prisma ORM

- **Contexto:** o projeto precisa persistir palavras e partidas sem exigir a instalação de um servidor de banco separado.
- **Decisão:** utilizar SQLite e Prisma ORM na versão 6.19.3, com o schema centralizado em `backend/prisma/schema.prisma`.
- **Alternativa considerada:** manter comandos SQL manuais ou depender de um banco externo.
- **Consequência:** os dados ficam em um arquivo local e o acesso é feito pelo Prisma Client tipado.

## 4. Centralizar o tratamento de erros

- **Contexto:** a API precisa responder erros de validação, conflitos e recursos inexistentes de maneira consistente.
- **Decisão:** utilizar a classe `ErroApp` para erros esperados e configurar um handler central no Fastify para convertê-los em respostas no formato `{ "erro": "mensagem" }`.
- **Alternativa considerada:** repetir blocos `try/catch` e respostas de erro em cada controller.
- **Consequência:** os controllers ficam menores e o formato das respostas de erro permanece uniforme.
