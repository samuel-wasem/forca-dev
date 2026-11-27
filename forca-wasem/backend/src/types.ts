import type { StatusPartida } from './game/regras';

/** Estado da partida que a API devolve para o front-end. */
export interface EstadoPartida {
  id: number;
  jogador: string;
  categoria: string;
  mascara: string;
  letrasTentadas: string[];
  vidasRestantes: number;
  status: StatusPartida;
  pontos: number;
  palavra: string | null; // null enquanto a partida está em andamento
}

/** Uma linha do ranking. */
export interface ItemRanking {
  jogador: string;
  pontos: number;
  palavra: string;
  resultado: StatusPartida;
  finalizadaEm: string;
}
