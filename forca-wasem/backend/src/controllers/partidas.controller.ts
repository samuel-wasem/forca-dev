import type { FastifyReply, FastifyRequest } from 'fastify';
import { idSchema, novaPartidaSchema, palpiteSchema } from '../schemas/partida.schemas';
import {
  consultarPartida,
  iniciarPartida,
  listarRanking,
  registrarPalpite,
} from '../services/partidas.service';

/** POST /api/partidas */
export async function criar(req: FastifyRequest, reply: FastifyReply) {
  const { jogador } = novaPartidaSchema.parse(req.body ?? {});
  const estado = await iniciarPartida(jogador);
  return reply.status(201).send(estado);
}

/** GET /api/partidas/:id */
export async function buscar(req: FastifyRequest, reply: FastifyReply) {
  const { id } = idSchema.parse(req.params);
  const estado = await consultarPartida(id);
  return reply.status(200).send(estado);
}

/** POST /api/partidas/:id/palpites */
export async function palpitar(req: FastifyRequest, reply: FastifyReply) {
  const { id } = idSchema.parse(req.params);
  const { letra } = palpiteSchema.parse(req.body ?? {});
  const estado = await registrarPalpite(id, letra);
  return reply.status(200).send(estado);
}

/** GET /api/ranking */
export async function ranking(_req: FastifyRequest, reply: FastifyReply) {
  const itens = await listarRanking();
  return reply.status(200).send(itens);
}
