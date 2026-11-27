import { Mascara } from '../components/Mascara';
import { Mensagem } from '../components/Mensagem';
import { Teclado } from '../components/Teclado';
import { Vidas } from '../components/Vidas';
import type { ErroApi } from '../services/api';
import type { EstadoPartida } from '../types';

type JogoProps = {
  partida: EstadoPartida;
  carregando: boolean;
  erro: ErroApi | null;
  onLetra: (letra: string) => void;
  onVoltar: () => void;
};

/** Tela do jogo: categoria, palavra escondida, vidas e teclado. */
export function Jogo({ partida, carregando, erro, onLetra, onVoltar }: JogoProps) {
  return (
    <section className="tela">
      <p className="jogador">Jogador: {partida.jogador}</p>
      <p className="categoria">Categoria: {partida.categoria}</p>

      <Mascara mascara={partida.mascara} />
      <Vidas restantes={partida.vidasRestantes} />

      <p className="usadas">
        Letras usadas:{' '}
        {partida.letrasTentadas.length === 0 ? 'nenhuma ainda' : partida.letrasTentadas.join(' ')}
      </p>

      <Teclado
        tentadas={partida.letrasTentadas}
        mascara={partida.mascara}
        desabilitado={carregando}
        onLetra={onLetra}
      />

      {carregando && <Mensagem tipo="carregando" texto="Enviando palpite..." />}
      {!carregando && !erro && <Mensagem tipo="info" texto="Partida em andamento. Escolha uma letra." />}
      {erro && <Mensagem tipo="erro" texto={erro.message} />}

      {erro?.status === 404 && (
        <button type="button" className="botao botao-principal" onClick={onVoltar}>
          Voltar ao início
        </button>
      )}
    </section>
  );
}
