import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { PersonalDetailsStep } from '../components/organisms/PersonalDetailsStep';
import { LoanDetailsStep } from '../components/organisms/LoanDetailsStep';
import { Button } from '../components/atoms/Button';

/** STEP 1 schema */
const step1Schema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email'),
    employmentStatus: z.enum(['Employed', 'Self-Employed', 'Unemployed'], {
      errorMap: () => ({ message: 'Employment Status is required' }),
    }),
    employerName: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.employmentStatus === 'Employed' && !data.employerName?.trim()) {
      ctx.addIssue({
        path: ['employerName'],
        code: z.ZodIssueCode.custom,
        message: 'Employer name is required when employed',
      });
    }
  });
type Step1 = z.infer<typeof step1Schema>;

/** STEP 2 schema */
const step2Schema = z
  .object({
    loanPurpose: z.enum(['Vehicle', 'Home Improvement', 'Other'], {
      errorMap: () => ({ message: 'Loan Purpose is required' }),
    }),
    amount: z.coerce.number().min(2000, 'Minimum loan amount is $2000'),
    deposit: z.coerce.number().min(0, 'Deposit cannot be negative'),
    loanTerm: z
      .coerce
      .number()
      .min(1, 'Loan term must be at least 1')
      .max(7, 'Loan term must be at most 7'),
  })
  .superRefine((data, ctx) => {
    if (data.loanPurpose === 'Vehicle' && data.deposit > data.amount) {
      ctx.addIssue({
        path: ['deposit'],
        code: z.ZodIssueCode.custom,
        message: 'Deposit cannot exceed loan amount',
      });
    }
  });
type Step2 = z.infer<typeof step2Schema>;

export const FormPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [personalData, setPersonalData] = useState<Step1 | null>(null);
  const navigate = useNavigate();

  /** Step 1 form */
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    watch: watchEmploymentStatus,
    formState: { errors: errors1 },
  } = useForm<Step1>({
    resolver: zodResolver(step1Schema),
    defaultValues: personalData ?? {},
  });
  const employmentStatus = watchEmploymentStatus('employmentStatus');

  /** Step 2 form */
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    watch: watchLoanPurpose,
    formState: { errors: errors2 },
  } = useForm<Step2>({
    resolver: zodResolver(step2Schema),
  });
  const loanPurpose = watchLoanPurpose('loanPurpose');

  const onSubmitStep1 = (data: Step1) => {
    setPersonalData(data);
    setStep(2);
  };

  const onSubmitStep2 = (data: Step2) => {
    localStorage.setItem('personalDetails', JSON.stringify(personalData));
    localStorage.setItem('loanDetails', JSON.stringify(data));
    navigate('/offers');
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Loan Application Form</h1>

      {step === 1 && (
        <form onSubmit={handleSubmit1(onSubmitStep1)} style={{ maxWidth: 600, margin: '0 auto' }}>
          <PersonalDetailsStep
            register={register1}
            errors={errors1}
            employmentStatus={employmentStatus}
          />
          <div style={{ textAlign: 'right', marginTop: 20 }}>
            <Button type="submit">Next</Button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit2(onSubmitStep2)} style={{ maxWidth: 600, margin: '0 auto' }}>
          <LoanDetailsStep register={register2} errors={errors2} loanPurpose={loanPurpose} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
            <Button type="button" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      )}
    </>
  );
};
