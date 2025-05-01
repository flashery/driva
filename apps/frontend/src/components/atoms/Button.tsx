import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button style={{ padding: '8px 16px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }} {...props}>
    {children}
  </button>
);
