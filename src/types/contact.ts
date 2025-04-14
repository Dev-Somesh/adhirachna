import { z } from 'zod';
import { contactFormSchema } from '@/lib/validations/contact';

export type ContactFormValues = z.infer<typeof contactFormSchema>; 