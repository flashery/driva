export type LoanApplication = {
    firstName: string;
    lastName: string;
    email: string;
    employmentStatus: 'Employed' | 'Self-Employed' | 'Unemployed';
    employerName?: string;
    loanPurpose: string;
    amount: number;
    deposit: number;
    loanTerm: number;
  }