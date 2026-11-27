import type { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';
import { ErroApp } from '../errors';

/** Tratamento central de erros: toda resposta de erro sai como { erro: "mensagem" }. */
export function configurarErros(app: FastifyInstance): void {
  app.setNotFoundHandler((_req, reply) => {
    reply.status(404).send({ erro: 'Rota não encontrada' });
  });

  app.setErrorHandler((error: unknown, _req, reply) => {
    if (error instanceof ZodError) {
      reply.status(400).send({ erro: error.issues[0]?.message ?? 'Dados inválidos' });
      return;
    }

    if (error instanceof ErroApp) {
      reply.status(error.status).send({ erro: error.message });
      return;
    }

    // erros do próprio Fastify com status 4xx (ex.: JSON quebrado)
    if (
      typeof error === 'object' &&
      error !== null &&
      'statusCode' in error &&
      typeof error.statusCode === 'number' &&
      error.statusCode >= 400 &&
      error.statusCode < 500
    ) {
      reply.status(400).send({ erro: 'Requisição inválida' });
      return;
    }

    app.log.error(error); // o detalhe fica só no log do servidor
    reply.status(500).send({ erro: 'Erro interno do servidor' });
  });
}
