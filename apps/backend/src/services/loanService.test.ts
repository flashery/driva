import { calculateMonthlyPayment } from '@driva/utils';
import { calculateLoanOffers } from './loanService';
import { LoanApplication } from '@driva/types';

describe('calculateMonthlyPayment', () => {
    it('should correctly compute monthly repayment', () => {
        const loanAmount = 10000;
        const interestRate = 5.5;
        const loanTerm = 5;

        const result = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
        expect(result).toBeCloseTo(191.01, 2);
    });

    it('should return higher payment for higher interest', () => {
        const lowRate = calculateMonthlyPayment(10000, 4, 5);
        const highRate = calculateMonthlyPayment(10000, 8, 5);

        expect(highRate).toBeGreaterThan(lowRate);
    });
});

describe('calculateLoanOffers', () => {
    it('should return 3 lender offers with proper fields', () => {
        const application: LoanApplication = {
            "firstName": "John",
            "lastName": "Doe",
            "email": "john@example.com",
            "employmentStatus": "Employed",
            "employerName": "ACME Inc.",
            "loanPurpose": "Vehicle",
            "amount": 10000,
            "deposit": 2000,
            "loanTerm": 5
        };

        const offers = calculateLoanOffers(application);

        expect(offers).toHaveLength(3);

        offers.forEach((offer) => {
            expect(offer).toHaveProperty('lenderName');
            expect(offer).toHaveProperty('monthlyRepayment');
            expect(offer).toHaveProperty('interestRate');
            expect(offer).toHaveProperty('fees');
        });
    });
});
