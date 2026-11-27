import type { Palavra } from '../../generated/prisma';
import { prisma } from '../database/prisma';

/** Quantas palavras existem no banco. */
export function contarPalavras(): Promise<number> {
  return prisma.palavra.count();
}

/** Busca a palavra que está na posição indicada (usado para sortear). */
export function buscarPalavraPorPosicao(posicao: number): Promise<Palavra | null> {
  return prisma.palavra.findFirst({ orderBy: { id: 'asc' }, skip: posicao });
}
