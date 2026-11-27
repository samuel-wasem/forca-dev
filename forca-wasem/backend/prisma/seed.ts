import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

// Palavras em maiúsculas, sem acento, sem espaço e sem hífen
const palavras: [string, string][] = [
  ['PROMISE', 'JavaScript'],
  ['CALLBACK', 'JavaScript'],
  ['CLOSURE', 'JavaScript'],
  ['VARIAVEL', 'JavaScript'],
  ['FUNCAO', 'JavaScript'],
  ['ARRAY', 'JavaScript'],

  ['INTERFACE', 'TypeScript'],
  ['GENERICS', 'TypeScript'],
  ['TIPAGEM', 'TypeScript'],
  ['ENUM', 'TypeScript'],
  ['COMPILADOR', 'TypeScript'],
  ['TUPLA', 'TypeScript'],

  ['COMPONENTE', 'React'],
  ['ESTADO', 'React'],
  ['PROPS', 'React'],
  ['HOOK', 'React'],
  ['RENDERIZACAO', 'React'],
  ['EFEITO', 'React'],

  ['TABELA', 'Banco de Dados'],
  ['CONSULTA', 'Banco de Dados'],
  ['PRISMA', 'Banco de Dados'],
  ['SQLITE', 'Banco de Dados'],
  ['INDICE', 'Banco de Dados'],
  ['CHAVE', 'Banco de Dados'],
];

async function main() {
  for (const [texto, categoria] of palavras) {
    // upsert: se rodar o seed duas vezes, não duplica
    await prisma.palavra.upsert({
      where: { texto },
      update: { categoria },
      create: { texto, categoria },
    });
  }
  console.log(`Seed concluído: ${palavras.length} palavras cadastradas.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
