import { LoanApplication, LenderOffer } from '@driva/types';
import { calculateMonthlyPayment } from '@driva/utils';

export function calculateLoanOffers(application: LoanApplication): LenderOffer[] {
    const { amount, loanTerm } = application;

    // Mock offers
    const lenders: LenderOffer[] = [
        {
            lenderName: 'Lender A',
            interestRate: 5.5,
            fees: '$10 processing fee',
            monthlyRepayment: calculateMonthlyPayment(amount, 5.5, loanTerm),
        },
        {
            lenderName: 'Lender B',
            interestRate: 5.0,
            fees: '$15 application fee',
            monthlyRepayment: calculateMonthlyPayment(amount, 5.0, loanTerm),
        },
        {
            lenderName: 'Lender C',
            interestRate: 6.0,
            fees: 'No fees',
            monthlyRepayment: calculateMonthlyPayment(amount, 6.0, loanTerm),
        },
    ];

    return lenders;
}
