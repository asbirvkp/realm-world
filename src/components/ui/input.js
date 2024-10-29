import React from 'react';

export const Input = ({ className, ...props }) => {
  return (
    <input
      className={`px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
      {...props}
    />
  );
};

