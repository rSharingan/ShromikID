import React from 'react';

/**
 * Card Component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {boolean} [props.hover=false]
 * @param {string} [props.padding='md'] - 'sm', 'md', 'lg'
 */
const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  ...props
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const hasCustomBg = className.includes('bg-');
  const hasCustomBorder = className.includes('border-');
  const hasCustomRadius = className.includes('rounded-');

  const defaultBg = hasCustomBg ? '' : 'bg-white';
  const defaultBorder = hasCustomBorder ? '' : 'border border-gray-100/80';
  const defaultRadius = hasCustomRadius ? '' : 'rounded-2xl';
  const hoverClass = hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer' : 'transition-all duration-300';

  return (
    <div
      className={`${defaultBg} ${defaultRadius} shadow-md ${defaultBorder} ${paddingClasses[padding]} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
