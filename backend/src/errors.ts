/** Erro com status HTTP, usado para os erros esperados (404, 409...). */
export class ErroApp extends Error {
  constructor(
    mensagem: string,
    public readonly status: number,
  ) {
    super(mensagem);
    this.name = 'ErroApp';
  }
}
