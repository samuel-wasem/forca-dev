type MascaraProps = {
  mascara: string;
};

/** Mostra a palavra escondida com espaço entre as letras. */
export function Mascara({ mascara }: MascaraProps) {
  return (
    <div className="mascara" aria-label={`Palavra: ${mascara.split('').join(' ')}`}>
      {mascara.split('').map((letra, i) => (
        <span key={i} className={letra === '_' ? 'casa casa-vazia' : 'casa'}>
          {letra === '_' ? '' : letra}
        </span>
      ))}
    </div>
  );
}
