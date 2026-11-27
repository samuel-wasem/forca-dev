// Tipos que a API devolve

export type StatusPartida = 'em_andamento' | 'vitoria' | 'derrota';

export interface EstadoPartida {
  id: number;
  jogador: string;
  categoria: string;
  mascara: string; // ex.: "PR_M_SE"
  letrasTentadas: string[];
  vidasRestantes: number;
  status: StatusPartida;
  pontos: number;
  palavra: string | null; // null enquanto a partida está em andamento
}

export interface ItemRanking {
  jogador: string;
  pontos: number;
  palavra: string;
  resultado: StatusPartida;
  finalizadaEm: string;
}
