import type { EstadoPartida, ItemRanking } from '../types';

/** Erro de comunicação com a API, guarda o status HTTP (0 = servidor fora do ar). */
export class ErroApi extends Error {
  constructor(
    mensagem: string,
    public readonly status: number,
  ) {
    super(mensagem);
    this.name = 'ErroApi';
  }
}

/** Garante que qualquer erro capturado vire um ErroApi. */
export function paraErroApi(e: unknown): ErroApi {
  if (e instanceof ErroApi) return e;
  return new ErroApi('Erro inesperado', -1);
}

async function requisitar<T>(url: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, { ...init, headers: { 'Content-Type': 'application/json' } });
  } catch {
    throw new ErroApi('Servidor fora do ar. Verifique se o backend está rodando.', 0);
  }

  const corpo: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    let mensagem = res.status >= 500 ? 'Servidor fora do ar ou com problema.' : 'Erro inesperado';
    if (corpo && typeof corpo === 'object' && 'erro' in corpo && typeof corpo.erro === 'string') {
      mensagem = corpo.erro;
    }
    throw new ErroApi(mensagem, res.status);
  }
  return corpo as T;
}

export const api = {
  novaPartida: (jogador: string) =>
    requisitar<EstadoPartida>('/api/partidas', {
      method: 'POST',
      body: JSON.stringify({ jogador }),
    }),
  buscarPartida: (id: number) => requisitar<EstadoPartida>(`/api/partidas/${id}`),
  palpitar: (id: number, letra: string) =>
    requisitar<EstadoPartida>(`/api/partidas/${id}/palpites`, {
      method: 'POST',
      body: JSON.stringify({ letra }),
    }),
  ranking: () => requisitar<ItemRanking[]>('/api/ranking'),
};
