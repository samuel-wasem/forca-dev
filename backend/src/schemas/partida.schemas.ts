import { z } from 'zod';
import { normalizarLetra, validarPalpite } from '../game/regras';

export const novaPartidaSchema = z.object(
  {
    jogador: z
      .string({ required_error: 'Informe o apelido', invalid_type_error: 'Apelido inválido' })
      .trim()
      .min(3, 'O apelido deve ter entre 3 e 20 caracteres')
      .max(20, 'O apelido deve ter entre 3 e 20 caracteres'),
  },
  { invalid_type_error: 'Dados inválidos', required_error: 'Dados inválidos' },
);

export const palpiteSchema = z.object(
  {
    letra: z
      .string({ required_error: 'Informe uma letra', invalid_type_error: 'Letra inválida' })
      .refine(validarPalpite, 'Envie uma única letra de A a Z')
      .transform(normalizarLetra),
  },
  { invalid_type_error: 'Dados inválidos', required_error: 'Dados inválidos' },
);

export const idSchema = z.object({
  id: z.coerce
    .number({ invalid_type_error: 'Id inválido' })
    .int('Id inválido')
    .positive('Id inválido')
    .max(2147483647, 'Id inválido'),
});
