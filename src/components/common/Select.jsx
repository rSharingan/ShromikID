import React from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Select Component
 * @param {Object} props
 * @param {Array} props.options - Array of { value, label }
 * @param {string} props.value
 * @param {Function} props.onChange
 * @param {string} [props.label]
 * @param {string} [props.error]
 */
const Select = React.forwardRef(({
  options = [],
  value,
  onChange,
  label,
  error,
  placeholder = null,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full px-3 py-2 appearance-none border rounded-lg text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 transition-colors cursor-pointer pr-8 ${
            error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
          } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        >
          {placeholder && <option value="">{typeof placeholder === 'string' ? placeholder : 'নির্বাচন করুন'}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
