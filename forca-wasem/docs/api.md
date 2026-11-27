# Documentação da API

A API utiliza o prefixo `/api`. As respostas de erro seguem o formato:

```json
{ "erro": "mensagem" }
```

## `POST /api/partidas`

Cria uma nova partida e sorteia uma palavra cadastrada.

**Corpo da requisição**

```json
{ "jogador": "ana" }
```

O apelido é obrigatório e deve ter de 3 a 20 caracteres após a remoção de espaços nas extremidades.

**Sucesso — 201 Created**

```json
{
  "id": 7,
  "jogador": "ana",
  "categoria": "JavaScript",
  "mascara": "_______",
  "letrasTentadas": [],
  "vidasRestantes": 6,
  "status": "em_andamento",
  "pontos": 0,
  "palavra": null
}
```

**Erros**

- `400`: apelido ausente, inválido, com menos de 3 ou mais de 20 caracteres.
- `500`: não há palavras cadastradas ou ocorreu uma falha interna.

## `GET /api/partidas/:id`

Consulta uma partida pelo identificador numérico positivo.

**Sucesso — 200 OK**

```json
{
  "id": 7,
  "jogador": "ana",
  "categoria": "JavaScript",
  "mascara": "PR_M_SE",
  "letrasTentadas": ["E", "P", "R", "S", "M", "A"],
  "vidasRestantes": 5,
  "status": "em_andamento",
  "pontos": 0,
  "palavra": null
}
```

Enquanto a partida estiver em andamento, `palavra` permanece `null`. A palavra é enviada quando a partida termina.

**Erros**

- `400`: identificador inválido (não numérico, não inteiro ou menor/igual a zero).
- `404`: partida não encontrada.

## `POST /api/partidas/:id/palpites`

Registra uma letra para a partida indicada.

**Corpo da requisição**

```json
{ "letra": "a" }
```

O servidor aceita somente uma letra de A a Z e converte o valor para maiúscula.

**Sucesso — 200 OK**

A resposta contém o novo estado da partida. Exemplo de vitória:

```json
{
  "id": 7,
  "jogador": "ana",
  "categoria": "JavaScript",
  "mascara": "PROMISE",
  "letrasTentadas": ["P", "R", "O", "M", "I", "S", "E"],
  "vidasRestantes": 4,
  "status": "vitoria",
  "pontos": 75,
  "palavra": "PROMISE"
}
```

**Erros**

- `400`: identificador inválido ou palpite que não seja uma única letra de A a Z.
- `404`: partida não encontrada.
- `409`: letra já utilizada ou partida já encerrada.

## `GET /api/ranking`

Retorna até dez partidas com status de vitória, ordenadas por pontuação decrescente. Em caso de empate, a partida finalizada primeiro aparece antes.

**Sucesso — 200 OK**

```json
[
  {
    "jogador": "ana",
    "pontos": 75,
    "palavra": "PROMISE",
    "resultado": "vitoria",
    "finalizadaEm": "2026-11-12T14:30:00.000Z"
  }
]
```

Se ainda não houver vitórias, a resposta é uma lista vazia (`[]`).

## Erros gerais

- `404`: caminho que não corresponde a uma rota existente.
- `400`: requisição com JSON inválido.
- `500`: falha interna não prevista.
