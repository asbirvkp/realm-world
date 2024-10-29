import React from 'react';

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

