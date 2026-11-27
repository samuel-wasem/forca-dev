import { Mensagem } from '../components/Mensagem';
import { Ranking } from '../components/Ranking';
import { useRanking } from '../hooks/useRanking';

type PaginaRankingProps = {
  onVoltar: () => void;
};

/** Tela do ranking (top 10). */
export function PaginaRanking({ onVoltar }: PaginaRankingProps) {
  const { itens, carregando, erro } = useRanking();

  return (
    <section className="tela">
      <h2 className="titulo-secao">Ranking – Top 10</h2>
      {carregando && <Mensagem tipo="carregando" texto="Carregando ranking..." />}
      {erro && <Mensagem tipo="erro" texto={erro} />}
      {!carregando && !erro && <Ranking itens={itens} />}
      <button type="button" className="botao botao-link" onClick={onVoltar}>
        Voltar
      </button>
    </section>
  );
}
