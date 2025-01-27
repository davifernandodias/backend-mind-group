import { z } from 'zod';

export const userValidationSchema = z.object({
  email: z.string().email('Email inválido'),
  firstName: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres').max(50, 'O nome não pode ter mais de 50 caracteres'),
  lastName: z.string().min(2, 'O sobrenome deve ter pelo menos 2 caracteres').max(50, 'O sobrenome não pode ter mais de 50 caracteres'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres').max(100, 'A senha não pode ter mais de 100 caracteres'),
});

export const productValidationSchema = z.object({
  name: z.string().min(2, 'O nome do produto deve ter pelo menos 2 caracteres').max(100, 'O nome do produto não pode ter mais de 100 caracteres'),
  description: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres').max(500, 'A descrição não pode ter mais de 500 caracteres'),
  price: z.number().positive('O preço deve ser um número positivo'),
  image: z.instanceof(Buffer).optional(), 
});
