import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { loanDetailsSchema } from "@driva/schema"



type LoanDetailsFormData = z.infer<typeof loanDetailsSchema>;

export default function LoanDetailsForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LoanDetailsFormData>({
    resolver: zodResolver(loanDetailsSchema),
    defaultValues: {
      deposit: 0,
    },
  });

  const loanPurpose = watch('loanPurpose');

  // Auto-set deposit to 0 if not Vehicle
  useEffect(() => {
    if (loanPurpose !== 'Vehicle') {
      setValue('deposit', 0);
    }
  }, [loanPurpose, setValue]);

  const onSubmit = (data: LoanDetailsFormData) => {
    localStorage.setItem('loanDetails', JSON.stringify(data));
    navigate('/offers');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Loan Details</h2>

      <div>
        <label>Loan Purpose</label>
        <select {...register('loanPurpose')}>
          <option value="">Select</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Home Improvement">Home Improvement</option>
          <option value="Other">Other</option>
        </select>
        {errors.loanPurpose && <p className="error">{errors.loanPurpose.message}</p>}
      </div>

      <div>
        <label>Amount</label>
        <input type="number" step="any" {...register('amount', { valueAsNumber: true })} />
        {errors.amount && <p className="error">{errors.amount.message}</p>}
      </div>

      {loanPurpose === 'Vehicle' && (
        <div>
          <label>Deposit</label>
          <input type="number" {...register('deposit', { valueAsNumber: true })} />
          {errors.deposit && <p className="error">{errors.deposit.message}</p>}
        </div>
      )}

      <div>
        <label>Loan Term (Years)</label>
        <input type="number" {...register('loanTerm', { valueAsNumber: true })} />
        {errors.loanTerm && <p className="error">{errors.loanTerm.message}</p>}
      </div>

      <button type="submit" style={{ marginTop: 20 }}>See Loan Offers</button>
    </form>
  );
}
