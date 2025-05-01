import React from 'react';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { Label } from '../atoms/Label';
import { FormFieldProps } from '@driva/types';

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  error,
  register,
  required = true,
  options,
}) => (
  <div style={{ marginBottom: '16px' }}>
    <Label htmlFor={name}>{label}</Label>

    {type === 'select' && options ? (
      <Select id={name} {...register(name, { required })}>
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
    ) : (
      <Input id={name} {...register(name, { required })} type={type} />
    )}

    {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
  </div>
);
