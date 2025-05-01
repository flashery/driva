import React from 'react';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: React.FC<LabelProps> = ({ children, ...props }) => (
  <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }} {...props}>
    {children}
  </label>
);
