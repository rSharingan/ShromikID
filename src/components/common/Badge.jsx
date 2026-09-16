import React from 'react';

/**
 * Badge Component
 * @param {Object} props
 * @param {string} [props.variant='primary'] - 'primary', 'success', 'warning', 'error', 'info', 'secondary'
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 */
const Badge = ({
  variant = 'primary',
  children,
  className = '',
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 border border-primary-300 shadow-sm hover:shadow-md',
    success: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 shadow-sm hover:shadow-md',
    warning: 'bg-gradient-to-r from-yellow-100 to-amber-200 text-amber-800 border border-amber-300 shadow-sm hover:shadow-md',
    error: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300 shadow-sm hover:shadow-md',
    info: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300 shadow-sm hover:shadow-md',
    secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300 shadow-sm hover:shadow-md',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${variants[variant]} transition-all duration-300 hover:scale-105 ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
