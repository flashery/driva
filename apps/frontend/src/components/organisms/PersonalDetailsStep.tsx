import React from 'react';
import { FormField } from '../molecules/FormField';

export const PersonalDetailsStep = ({ register, errors, employmentStatus }: any) => (
  <>
    <h2>Personal Details</h2>
    <FormField label="First Name" name="firstName" register={register} error={errors.firstName?.message} />
    <FormField label="Last Name" name="lastName" register={register} error={errors.lastName?.message} />
    <FormField label="Email" name="email" register={register} error={errors.email?.message} type="email" />
    <FormField
      label="Employment Status"
      name="employmentStatus"
      type="select"
      register={register}
      error={errors.employmentStatus?.message}
      options={[
        { value: 'Employed', label: 'Employed' },
        { value: 'Self-Employed', label: 'Self-Employed' },
        { value: 'Unemployed', label: 'Unemployed' },
      ]}
    />

    {employmentStatus === 'Employed' && (
      <FormField label="Employer Name" name="employerName" register={register} error={errors.employerName?.message} />
    )}
  </>
);
