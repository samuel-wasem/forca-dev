type VidasProps = {
  restantes: number;
  total?: number;
};

/** Mostra as vidas com corações cheios (restantes) e vazios (perdidas). */
export function Vidas({ restantes, total = 6 }: VidasProps) {
  return (
    <div className="vidas" aria-label={`${restantes} de ${total} vidas`}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={i < restantes ? 'vida' : 'vida vida-perdida'}>
          {i < restantes ? '♥' : '♡'}
        </span>
      ))}
      <span className="vidas-texto">
        {restantes} {restantes === 1 ? 'vida' : 'vidas'}
      </span>
    </div>
  );
}
