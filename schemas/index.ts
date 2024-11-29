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

export const titlePropertiesSchema = z.object({
  title: z.string().min(2).max(50),
});

export const paragraphPropertiesSchema = z.object({
  text: z.string().min(2).max(500),
});

export const spacerPropertiesSchema = z.object({
  height: z.number().min(5).max(200),
});

export const textAreaPropertiesSchema = propertiesSchema.extend({
  rows: z.number().min(1).max(10),
});
