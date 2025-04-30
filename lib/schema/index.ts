import { z } from 'zod';

export const loanSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    employmentStatus: z.enum(['Employed', 'Self-Employed', 'Unemployed']),
    employerName: z.string().optional(),
    loanPurpose: z.string().min(1),
    amount: z.number().min(2000),
    deposit: z.number().min(0),
    loanTerm: z.number().min(1).max(7),
  });