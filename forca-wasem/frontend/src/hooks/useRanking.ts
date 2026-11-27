import { useEffect, useState } from 'react';
import { api, paraErroApi } from '../services/api';
import type { ItemRanking } from '../types';

/** Carrega o ranking quando a tela abre. */
export function useRanking() {
  const [itens, setItens] = useState<ItemRanking[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;
    api
      .ranking()
      .then((dados) => {
        if (ativo) setItens(dados);
      })
      .catch((e: unknown) => {
        if (ativo) setErro(paraErroApi(e).message);
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });
    return () => {
      ativo = false;
    };
  }, []);

  return { itens, carregando, erro };
}
