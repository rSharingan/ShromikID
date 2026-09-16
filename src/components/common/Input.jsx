import React from 'react';

/**
 * Input Component
 * @param {Object} props
 * @param {string} [props.type='text']
 * @param {string} [props.placeholder]
 * @param {string} [props.label]
 * @param {string} [props.error]
 * @param {string} [props.value]
 * @param {Function} props.onChange
 * @param {string} [props.className]
 */
const Input = React.forwardRef(({
  type = 'text',
  placeholder,
  label,
  error,
  value,
  onChange,
  className = '',
  disabled = false,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-2.5 border-2 rounded-lg text-gray-900 placeholder-gray-400 transition-all duration-300 ${
          error 
            ? 'border-red-500 bg-red-50/50 focus-visible:border-red-600 focus-visible:shadow-red-100 focus-visible:shadow-md' 
            : 'border-gray-200 bg-white hover:border-primary-300 focus-visible:border-primary-500 focus-visible:shadow-md focus-visible:shadow-primary-100'
        } focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-4 focus-visible:ring-primary-100/50 ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
