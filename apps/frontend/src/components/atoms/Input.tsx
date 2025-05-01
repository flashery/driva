import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = (props) => (
  <input style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }} step="any" {...props} />
);
