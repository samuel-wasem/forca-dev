import type { Prisma } from '../../generated/prisma';
import { prisma } from '../database/prisma';

/** Partida já com os dados da palavra. */
export type PartidaComPalavra = Prisma.PartidaGetPayload<{ include: { palavra: true } }>;

/** Cria uma partida nova. */
export function criarPartida(jogador: string, palavraId: number): Promise<PartidaComPalavra> {
  return prisma.partida.create({
    data: { jogador, palavraId },
    include: { palavra: true },
  });
}

/** Busca uma partida pelo id. */
export function buscarPartidaPorId(id: number): Promise<PartidaComPalavra | null> {
  return prisma.partida.findUnique({ where: { id }, include: { palavra: true } });
}

/** Dados que podem mudar depois de um palpite. */
export interface AtualizacaoPartida {
  letrasTentadas: string;
  vidasRestantes: number;
  status: string;
  pontos: number;
  finalizadaEm: Date | null;
}

/** Salva o resultado de um palpite. */
export function atualizarPartida(
  id: number,
  dados: AtualizacaoPartida,
): Promise<PartidaComPalavra> {
  return prisma.partida.update({ where: { id }, data: dados, include: { palavra: true } });
}

/** 10 melhores vitórias: mais pontos primeiro; empate, quem terminou antes. */
export function buscarMelhoresVitorias(): Promise<PartidaComPalavra[]> {
  return prisma.partida.findMany({
    where: { status: 'vitoria' },
    orderBy: [{ pontos: 'desc' }, { finalizadaEm: 'asc' }],
    take: 10,
    include: { palavra: true },
  });
}
