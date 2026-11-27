import { describe, expect, it } from 'vitest';
import {
  calcularPontos,
  determinarStatus,
  gerarMascara,
  letraEstaNaPalavra,
  letraJaUsada,
  normalizarLetra,
  perdeu,
  validarPalpite,
  venceu,
} from '../src/game/regras';

describe('regras do jogo', () => {
  it('aceita somente uma letra de A a Z', () => {
    expect(validarPalpite('A')).toBe(true);
    expect(validarPalpite('z')).toBe(true);
    expect(validarPalpite('ab')).toBe(false);
    expect(validarPalpite('1')).toBe(false);
    expect(validarPalpite('')).toBe(false);
  });

  it('normaliza a letra para maiúscula', () => {
    expect(normalizarLetra('a')).toBe('A');
  });

  it('identifica letras já utilizadas', () => {
    expect(letraJaUsada(['A', 'B'], 'A')).toBe(true);
    expect(letraJaUsada(['A', 'B'], 'C')).toBe(false);
  });

  it('verifica se a letra pertence à palavra', () => {
    expect(letraEstaNaPalavra('PROMISE', 'P')).toBe(true);
    expect(letraEstaNaPalavra('PROMISE', 'X')).toBe(false);
  });

  it('gera a máscara mostrando apenas letras descobertas', () => {
    expect(gerarMascara('PROMISE', ['P', 'R', 'S'])).toBe('PR__S__');
  });

  it('detecta vitória quando todas as letras foram tentadas', () => {
    expect(venceu('ABA', ['A', 'B'])).toBe(true);
    expect(venceu('ABA', ['A'])).toBe(false);
  });

  it('detecta derrota quando as vidas chegam a zero', () => {
    expect(perdeu(0)).toBe(true);
    expect(perdeu(1)).toBe(false);
  });

  it('calcula pontos usando vidas e letras distintas', () => {
    expect(calcularPontos('PROMISE', 4)).toBe(75);
  });

  it('determina vitória, derrota ou partida em andamento', () => {
    expect(determinarStatus('ABA', ['A', 'B'], 3)).toBe('vitoria');
    expect(determinarStatus('ABA', ['X'], 0)).toBe('derrota');
    expect(determinarStatus('ABA', ['A'], 3)).toBe('em_andamento');
  });
});
