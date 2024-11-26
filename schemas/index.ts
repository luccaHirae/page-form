import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().max(1024).optional(),
});

export const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
});
