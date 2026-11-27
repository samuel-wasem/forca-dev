/** Quantidade de vidas no começo de cada partida. */
export const VIDAS_INICIAIS = 6;

/** Possíveis estados de uma partida. */
export type StatusPartida = 'em_andamento' | 'vitoria' | 'derrota';

/**
 * Valida se o palpite é exatamente uma letra de A a Z (sem acento, sem número).
 * @param entrada - Texto recebido do jogador.
 * @returns `true` se for uma única letra de A a Z, senão `false`.
 */
export function validarPalpite(entrada: string): boolean {
  return /^[a-zA-Z]$/.test(entrada);
}

/**
 * Converte a letra para maiúscula.
 * @param letra - Letra digitada pelo jogador.
 * @returns A letra em maiúscula.
 */
export function normalizarLetra(letra: string): string {
  return letra.toUpperCase();
}

/**
 * Verifica se a letra já foi tentada antes.
 * @param tentadas - Letras já tentadas (maiúsculas).
 * @param letra - Letra do novo palpite (maiúscula).
 * @returns `true` se a letra já está na lista.
 */
export function letraJaUsada(tentadas: string[], letra: string): boolean {
  return tentadas.includes(letra);
}

/**
 * Verifica se a letra existe na palavra.
 * @param palavra - Palavra secreta.
 * @param letra - Letra do palpite.
 * @returns `true` se a palavra contém a letra.
 */
export function letraEstaNaPalavra(palavra: string, letra: string): boolean {
  return palavra.includes(letra);
}

/**
 * Mostra as letras já descobertas e troca as demais por "_".
 * @param palavra - Palavra secreta.
 * @param tentadas - Letras já tentadas.
 * @returns A máscara, por exemplo "PR_M_SE".
 */
export function gerarMascara(palavra: string, tentadas: string[]): string {
  return [...palavra].map((l) => (tentadas.includes(l) ? l : '_')).join('');
}

/**
 * Verifica se todas as letras da palavra foram descobertas.
 * @param palavra - Palavra secreta.
 * @param tentadas - Letras já tentadas.
 * @returns `true` se o jogador venceu.
 */
export function venceu(palavra: string, tentadas: string[]): boolean {
  return [...palavra].every((l) => tentadas.includes(l));
}

/**
 * Verifica se o jogador ficou sem vidas.
 * @param vidasRestantes - Vidas que sobraram.
 * @returns `true` se as vidas chegaram a zero.
 */
export function perdeu(vidasRestantes: number): boolean {
  return vidasRestantes <= 0;
}

/**
 * Calcula os pontos da vitória: vidas restantes × 10 + letras distintas × 5.
 * @param palavra - Palavra secreta.
 * @param vidasRestantes - Vidas que sobraram no fim da partida.
 * @returns Pontuação da vitória.
 */
export function calcularPontos(palavra: string, vidasRestantes: number): number {
  const letrasDistintas = new Set(palavra).size;
  return vidasRestantes * 10 + letrasDistintas * 5;
}

/**
 * Descobre em que estado a partida está.
 * @param palavra - Palavra secreta.
 * @param tentadas - Letras já tentadas.
 * @param vidasRestantes - Vidas que sobraram.
 * @returns "vitoria", "derrota" ou "em_andamento".
 */
export function determinarStatus(
  palavra: string,
  tentadas: string[],
  vidasRestantes: number,
): StatusPartida {
  if (venceu(palavra, tentadas)) return 'vitoria';
  if (perdeu(vidasRestantes)) return 'derrota';
  return 'em_andamento';
}
