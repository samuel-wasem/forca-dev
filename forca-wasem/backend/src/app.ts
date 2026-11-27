import Fastify from 'fastify';
import { configurarErros } from './plugins/erros';
import { rotas } from './routes';

/** Monta o servidor Fastify (sem ligar a porta). */
export function criarApp() {
  const app = Fastify({ logger: true });
  configurarErros(app); // chamado direto (sem register) para valer em todas as rotas
  app.register(rotas, { prefix: '/api' });
  return app;
}
