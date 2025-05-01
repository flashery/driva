import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select: React.FC<SelectProps> = ({ children, ...props }) => (
  <select
    style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
    {...props}
  >
    {children}
  </select>
);
