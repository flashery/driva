import { Router } from 'express';
import { calculateMonthlyPayment } from '@driva/utils';
import { loanSchema } from '@driva/schema';
import { lenders } from '@driva/data';
import type { Lender, LenderOffer, LoanApplication } from '@driva/types';
import { zodMiddleware } from '@backend/middleware/zod.middleware';

const router = Router();

router.post('/', zodMiddleware(loanSchema), (req, res) => {
  const data: LoanApplication = req.body;


  const lenderOffers: LenderOffer[] = lenders.map((lender: Lender): LenderOffer => {
    const monthlyRepayment: number = calculateMonthlyPayment(data.amount - data.deposit, lender.interestRate, data.loanTerm);
    return {
      lenderName: lender.name,
      monthlyRepayment,
      interestRate: `${lender.interestRate}% APR`,
      fees: lender.fee > 0 ? `$${lender.fee} fee` : 'No fees',
    };
  });

  res.json(lenderOffers);
});

export default router;
