import { Router } from 'express';
import { calculateMonthlyPayment } from '@driva/utils';
import { loanSchema } from '@driva/schema';
import type { LoanApplication } from '@driva/types';

const router = Router();



router.post('/', (req, res) => {
  const result = loanSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten() });
  }

  const data: LoanApplication = result.data;

  const lenders = [
    {
      name: 'Lender A',
      interestRate: 5.5,
      fee: 10,
    },
    {
      name: 'Lender B',
      interestRate: 5.0,
      fee: 15,
    },
    {
      name: 'Lender C',
      interestRate: 6.0,
      fee: 0,
    },
  ];

  const offers = lenders.map((lender) => {
    const monthly = calculateMonthlyPayment(data.amount - data.deposit, lender.interestRate, data.loanTerm);
    return {
      lender: lender.name,
      monthlyRepayment: monthly,
      interestRate: `${lender.interestRate}% APR`,
      fees: lender.fee > 0 ? `$${lender.fee} fee` : 'No fees',
    };
  });

  res.json({ offers });
});

export default router;
