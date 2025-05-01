import React from 'react';
import { FormField } from '../molecules/FormField';

export const LoanDetailsStep = ({ register, errors, loanPurpose }: any) => (
  <>
    <FormField label="Loan Purpose" name="loanPurpose" register={register} error={errors.loanPurpose?.message} />
    <FormField label="Amount" name="amount" type="number" register={register} error={errors.amount?.message} />
    {loanPurpose === 'Vehicle' && (
      <FormField label="Deposit" name="deposit" type="number" register={register} error={errors.deposit?.message} />
    )}
    <FormField label="Loan Term (years)" name="loanTerm" type="number" register={register} error={errors.loanTerm?.message} />
  </>
);
