import React from 'react';

/**
 * Button Component
 * @param {Object} props
 * @param {string} [props.variant='primary'] - 'primary', 'secondary', 'outline', 'ghost', 'danger'
 * @param {string} [props.size='md'] - 'sm', 'md', 'lg'
 * @param {boolean} [props.disabled=false]
 * @param {boolean} [props.loading=false]
 * @param {boolean} [props.fullWidth=false]
 * @param {React.ReactNode} props.children
 * @param {Function} props.onClick
 * @param {string} [props.className]
 * @param {string} [props.type='button'] - 'button', 'submit', 'reset'
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  children,
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 focus-visible:outline-primary-500 active:scale-95 shadow-md hover:shadow-lg',
    secondary: 'bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-900 hover:from-secondary-200 hover:to-secondary-300 focus-visible:outline-secondary-500 active:scale-95 shadow-sm hover:shadow-md',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus-visible:outline-primary-500 active:bg-primary-100 transition-all duration-300',
    ghost: 'text-primary-600 hover:bg-primary-50 focus-visible:outline-primary-500 active:bg-primary-100 transition-all duration-300',
    danger: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 focus-visible:outline-red-500 active:scale-95 shadow-md hover:shadow-lg',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
