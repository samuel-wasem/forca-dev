import {
  calcularPontos,
  determinarStatus,
  gerarMascara,
  letraEstaNaPalavra,
  letraJaUsada,
  type StatusPartida,
} from '../game/regras';
import {
  atualizarPartida,
  buscarMelhoresVitorias,
  buscarPartidaPorId,
  criarPartida,
  type PartidaComPalavra,
} from '../repositories/partidas.repository';
import {
  buscarPalavraPorPosicao,
  contarPalavras,
} from '../repositories/palavras.repository';
import type { EstadoPartida, ItemRanking } from '../types';
import { ErroApp } from '../errors';

/** No banco as letras ficam juntas ("EPR"); aqui viram lista. */
function separarLetras(texto: string): string[] {
  return texto === '' ? [] : texto.split('');
}

/** Transforma a partida do banco no formato que o front recebe (sem revelar a palavra antes da hora). */
function montarEstado(partida: PartidaComPalavra): EstadoPartida {
  const status = partida.status as StatusPartida;
  const tentadas = separarLetras(partida.letrasTentadas);
  return {
    id: partida.id,
    jogador: partida.jogador,
    categoria: partida.palavra.categoria,
    mascara: gerarMascara(partida.palavra.texto, tentadas),
    letrasTentadas: tentadas,
    vidasRestantes: partida.vidasRestantes,
    status,
    pontos: partida.pontos,
    palavra: status === 'em_andamento' ? null : partida.palavra.texto,
  };
}

/** Inicia uma partida com uma palavra sorteada. */
export async function iniciarPartida(jogador: string): Promise<EstadoPartida> {
  const total = await contarPalavras();
  if (total === 0) {
    throw new ErroApp('Nenhuma palavra cadastrada. Rode o seed.', 500);
  }
  const posicao = Math.floor(Math.random() * total);
  const palavra = await buscarPalavraPorPosicao(posicao);
  if (!palavra) {
    throw new ErroApp('Não foi possível sortear a palavra', 500);
  }
  const partida = await criarPartida(jogador, palavra.id);
  return montarEstado(partida);
}

/** Consulta o estado de uma partida. */
export async function consultarPartida(id: number): Promise<EstadoPartida> {
  const partida = await buscarPartidaPorId(id);
  if (!partida) throw new ErroApp('Partida não encontrada', 404);
  return montarEstado(partida);
}

/** Registra um palpite (a letra já chega validada e em maiúscula). */
export async function registrarPalpite(id: number, letra: string): Promise<EstadoPartida> {
  const partida = await buscarPartidaPorId(id);
  if (!partida) throw new ErroApp('Partida não encontrada', 404);

  if (partida.status !== 'em_andamento') {
    throw new ErroApp('Partida já finalizada', 409);
  }

  const tentadas = separarLetras(partida.letrasTentadas);
  if (letraJaUsada(tentadas, letra)) {
    throw new ErroApp('Letra já tentada', 409);
  }

  const palavra = partida.palavra.texto;
  const novasTentadas = [...tentadas, letra];
  const vidas = letraEstaNaPalavra(palavra, letra)
    ? partida.vidasRestantes
    : partida.vidasRestantes - 1;
  const status = determinarStatus(palavra, novasTentadas, vidas);
  const terminou = status !== 'em_andamento';

  const atualizada = await atualizarPartida(id, {
    letrasTentadas: novasTentadas.join(''),
    vidasRestantes: vidas,
    status,
    pontos: status === 'vitoria' ? calcularPontos(palavra, vidas) : 0,
    finalizadaEm: terminou ? new Date() : null,
  });
  return montarEstado(atualizada);
}

/** Top 10 do ranking. */
export async function listarRanking(): Promise<ItemRanking[]> {
  const vitorias = await buscarMelhoresVitorias();
  return vitorias.map((p) => ({
    jogador: p.jogador,
    pontos: p.pontos,
    palavra: p.palavra.texto,
    resultado: p.status as StatusPartida,
    finalizadaEm: (p.finalizadaEm ?? p.iniciadaEm).toISOString(),
  }));
}
