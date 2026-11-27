import 'dotenv/config';
import { criarApp } from './app';

const PORTA = Number(process.env.PORT ?? 3333);
const app = criarApp();

app.listen({ port: PORTA, host: '127.0.0.1' }).catch((erro: unknown) => {
  app.log.error(erro);
  process.exit(1);
});
