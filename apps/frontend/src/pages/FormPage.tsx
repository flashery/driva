import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PersonalDetailsStep } from '../components/organisms/PersonalDetailsStep';
import { LoanDetailsStep } from '../components/organisms/LoanDetailsStep';
import { Button } from '../components/atoms/Button';
import { ApplyPayload } from '@driva/types';
import { FormSchema } from "@driva/schema"

export const FormPage: React.FC = () => {
    const [step, setStep] = useState(1);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormSchema>();

    const employmentStatus = watch('employmentStatus');
    const loanPurpose = watch('loanPurpose');

    const onSubmit = (data: ApplyPayload) => {
        console.log('Form submitted:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '600px', margin: '0 auto' }}>
            {step === 1 && <PersonalDetailsStep register={register} errors={errors} employmentStatus={employmentStatus} />}
            {step === 2 && <LoanDetailsStep register={register} errors={errors} loanPurpose={loanPurpose} />}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                {step > 1 && <Button type="button" onClick={() => setStep(step - 1)}>Back</Button>}
                {step < 2
                    ? <Button type="button" onClick={() => setStep(step + 1)}>Next</Button>
                    : <Button type="submit">Submit</Button>
                }
            </div>
        </form>
    ); ``
};
