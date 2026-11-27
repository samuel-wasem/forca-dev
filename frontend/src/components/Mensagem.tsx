type MensagemProps = {
  tipo: 'carregando' | 'erro' | 'info';
  texto: string;
};

/** Caixa de aviso: carregando, erro ou informação. */
export function Mensagem({ tipo, texto }: MensagemProps) {
  return (
    <div className={`mensagem mensagem-${tipo}`} role={tipo === 'erro' ? 'alert' : 'status'}>
      {tipo === 'carregando' && <span className="spinner" aria-hidden="true" />}
      <span>{texto}</span>
    </div>
  );
}
