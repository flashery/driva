import { z } from 'zod';

export const loanDetailsSchema = z
    .object({
        loanPurpose: z.enum(['Vehicle', 'Home Improvement', 'Other'], {
            required_error: 'Loan purpose is required',
        }),
        amount: z.number().min(2000, 'Minimum amount is $2000'),
        deposit: z.number().min(0, 'Minimum deposit is $0'),
        loanTerm: z.number().min(1).max(7),
    })
    .superRefine((data, ctx) => {
        if (data.deposit > data.amount) {
            ctx.addIssue({
                path: ['deposit'],
                code: z.ZodIssueCode.custom,
                message: 'Deposit must not exceed the loan amount',
            });
        }
    });