import type { ItemRanking } from '../types';

type RankingProps = {
  itens: ItemRanking[];
};

/** Tabela com os melhores resultados. */
export function Ranking({ itens }: RankingProps) {
  if (itens.length === 0) {
    return <p className="vazio">Ainda não há vitórias. Seja o primeiro do ranking!</p>;
  }
  return (
    <div className="tabela-area">
      <table className="tabela">
        <thead>
          <tr>
            <th>Posição</th>
            <th>Apelido</th>
            <th>Pontos</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((item, i) => (
            <tr key={`${item.jogador}-${item.finalizadaEm}-${i}`}>
              <td>{i + 1}º</td>
              <td>{item.jogador}</td>
              <td>{item.pontos}</td>
              <td>{item.resultado === 'vitoria' ? 'Vitória' : 'Derrota'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
