type TecladoProps = {
  tentadas: string[];
  mascara: string;
  desabilitado: boolean;
  onLetra: (letra: string) => void;
};

const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/** Teclado virtual A–Z. Letra certa fica verde e errada fica vermelha. */
export function Teclado({ tentadas, mascara, desabilitado, onLetra }: TecladoProps) {
  return (
    <div className="teclado">
      {LETRAS.map((letra) => {
        const usada = tentadas.includes(letra);
        const acertou = usada && mascara.includes(letra);
        const classe = usada ? (acertou ? 'tecla tecla-acerto' : 'tecla tecla-erro') : 'tecla';
        return (
          <button
            key={letra}
            type="button"
            className={classe}
            disabled={desabilitado || usada}
            onClick={() => onLetra(letra)}
          >
            {letra}
          </button>
        );
      })}
    </div>
  );
}
