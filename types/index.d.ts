import { z } from 'zod';
import { formSchema } from '@/schemas';

export type FormValues = z.infer<typeof formSchema>;
