import type { EstadoPartida } from '../types';

type ResultadoProps = {
  partida: EstadoPartida;
  onNovaPartida: () => void;
  onRanking: () => void;
};

/** Tela de fim de jogo. */
export function Resultado({ partida, onNovaPartida, onRanking }: ResultadoProps) {
  const venceu = partida.status === 'vitoria';
  return (
    <section className="tela">
      <h2 className={venceu ? 'resultado resultado-vitoria' : 'resultado resultado-derrota'}>
        {venceu ? 'Você venceu!' : 'Você perdeu!'}
      </h2>

      <p className="subtitulo">A palavra era</p>
      <p className="palavra-final">{partida.palavra}</p>

      <ul className="dados">
        <li>
          Pontos: <strong>{partida.pontos}</strong>
        </li>
        <li>
          Vidas restantes: <strong>{partida.vidasRestantes}</strong>
        </li>
      </ul>

      <div className="botoes">
        <button type="button" className="botao botao-principal" onClick={onNovaPartida}>
          Jogar de novo
        </button>
        <button type="button" className="botao botao-link" onClick={onRanking}>
          Ver ranking
        </button>
      </div>
    </section>
  );
}
