import { useState, type FormEvent } from 'react';
import { Mensagem } from '../components/Mensagem';

type InicioProps = {
  carregando: boolean;
  erro: string | null;
  onIniciar: (apelido: string) => void;
  onRanking: () => void;
};

/** Tela inicial: nome do jogo, apelido e acesso ao ranking. */
export function Inicio({ carregando, erro, onIniciar, onRanking }: InicioProps) {
  const [apelido, setApelido] = useState('');
  const [tocou, setTocou] = useState(false);

  const tamanho = apelido.trim().length;
  const valido = tamanho >= 3 && tamanho <= 20;

  function enviar(e: FormEvent) {
    e.preventDefault();
    if (valido && !carregando) onIniciar(apelido.trim());
  }

  return (
    <section className="tela">
      <h1 className="titulo">Forca Dev</h1>
      <p className="subtitulo">Descubra o termo de programação antes de acabarem as vidas.</p>

      <form className="form" onSubmit={enviar}>
        <label htmlFor="apelido">Seu apelido</label>
        <input
          id="apelido"
          type="text"
          value={apelido}
          maxLength={30}
          placeholder="ex.: enzo"
          autoComplete="off"
          onChange={(e) => setApelido(e.target.value)}
          onBlur={() => setTocou(true)}
        />
        {tocou && !valido && (
          <p className="aviso-campo">O apelido deve ter entre 3 e 20 caracteres.</p>
        )}

        <button type="submit" className="botao botao-principal" disabled={!valido || carregando}>
          {carregando ? 'Iniciando...' : 'Jogar'}
        </button>
      </form>

      {carregando && <Mensagem tipo="carregando" texto="Sorteando a palavra..." />}
      {erro && <Mensagem tipo="erro" texto={erro} />}

      <button type="button" className="botao botao-link" onClick={onRanking}>
        Ver ranking
      </button>
    </section>
  );
}
