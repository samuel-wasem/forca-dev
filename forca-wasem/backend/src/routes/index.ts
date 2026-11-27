import type { FastifyInstance } from 'fastify';
import { buscar, criar, palpitar, ranking } from '../controllers/partidas.controller';

/** Define os endpoints da API (registrados com o prefixo /api). */
export async function rotas(app: FastifyInstance): Promise<void> {
  app.post('/partidas', criar);
  app.get('/partidas/:id', buscar);
  app.post('/partidas/:id/palpites', palpitar);
  app.get('/ranking', ranking);
}
