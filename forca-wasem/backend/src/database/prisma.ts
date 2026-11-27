import { PrismaClient } from '../../generated/prisma';

/** Uma única conexão do Prisma usada em todo o backend. */
export const prisma = new PrismaClient();
