import { z } from 'zod';

export const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  employmentStatus: z.enum(['Employed', 'Self-Employed', 'Unemployed']),
  employerName: z.string().optional(),
  loanPurpose: z.enum(['Vehicle', 'Home Improvement', 'Other']),
  amount: z.coerce.number().min(2000, 'Minimum loan amount is $2000'),
  deposit: z.coerce.number().min(0, 'Deposit cannot be negative'),
  loanTerm: z.coerce.number().min(1).max(7),
}).superRefine((data, ctx) => {
  if (data.employmentStatus === 'Employed' && !data.employerName?.trim()) {
    ctx.addIssue({
      path: ['employerName'],
      code: z.ZodIssueCode.custom,
      message: 'Employer name is required when employed',
    });
  }

  if (data.loanPurpose === 'Vehicle' && data.deposit > data.amount) {
    ctx.addIssue({
      path: ['deposit'],
      code: z.ZodIssueCode.custom,
      message: 'Deposit cannot exceed loan amount',
    });
  }
});

export type FormSchema = z.infer<typeof formSchema>;
