import React from 'react';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  error?: string;
  register: any;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  error,
  register,
  required = true,
}) => (
  <div style={{ marginBottom: '16px' }}>
    <Label htmlFor={name}>{label}</Label>
    <Input id={name} {...register(name, { required })} type={type} />
    {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
  </div>
);
