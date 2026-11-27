import { useState } from 'react';
import { Inicio } from './pages/Inicio';
import { Jogo } from './pages/Jogo';
import { PaginaRanking } from './pages/PaginaRanking';
import { Resultado } from './pages/Resultado';
import { api, paraErroApi, type ErroApi } from './services/api';
import type { EstadoPartida } from './types';

type Tela = 'inicio' | 'jogo' | 'resultado' | 'ranking';

export default function App() {
  const [tela, setTela] = useState<Tela>('inicio');
  const [partida, setPartida] = useState<EstadoPartida | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<ErroApi | null>(null);

  function irPara(nova: Tela) {
    setErro(null);
    setTela(nova);
  }

  async function iniciar(apelido: string) {
    setCarregando(true);
    setErro(null);
    try {
      const nova = await api.novaPartida(apelido);
      setPartida(nova);
      setTela('jogo');
    } catch (e) {
      setErro(paraErroApi(e));
    } finally {
      setCarregando(false);
    }
  }

  async function palpitar(letra: string) {
    if (!partida || carregando) return;
    setCarregando(true);
    setErro(null);
    try {
      const novo = await api.palpitar(partida.id, letra);
      setPartida(novo);
      if (novo.status !== 'em_andamento') setTela('resultado');
    } catch (e) {
      const err = paraErroApi(e);
      setErro(err);
      // 409 = letra repetida ou partida finalizada: sincroniza com o servidor
      if (err.status === 409) {
        try {
          const atual = await api.buscarPartida(partida.id);
          setPartida(atual);
          if (atual.status !== 'em_andamento') setTela('resultado');
        } catch {
          // mantém a mensagem de erro original
        }
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="app">
      {tela === 'inicio' && (
        <Inicio
          carregando={carregando}
          erro={erro?.message ?? null}
          onIniciar={iniciar}
          onRanking={() => irPara('ranking')}
        />
      )}
      {tela === 'jogo' && partida && (
        <Jogo
          partida={partida}
          carregando={carregando}
          erro={erro}
          onLetra={palpitar}
          onVoltar={() => irPara('inicio')}
        />
      )}
      {tela === 'resultado' && partida && (
        <Resultado
          partida={partida}
          onNovaPartida={() => irPara('inicio')}
          onRanking={() => irPara('ranking')}
        />
      )}
      {tela === 'ranking' && (
        <PaginaRanking onVoltar={() => irPara(partida?.status === 'em_andamento' || !partida ? 'inicio' : 'resultado')} />
      )}
    </main>
  );
}
