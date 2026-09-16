import React from 'react';

/**
 * ProgressBar Component
 * @param {Object} props
 * @param {number} props.progress - Progress percentage (0-100)
 * @param {string} [props.label] - Label text
 * @param {string} [props.color='primary'] - Color variant
 * @param {string} [props.size='md'] - 'sm', 'md', 'lg'
 */
const ProgressBar = ({
  progress = 0,
  label,
  color = 'primary',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const colorClasses = {
    primary: 'bg-primary-600',
    success: 'bg-green-600',
    warning: 'bg-amber-600',
    error: 'bg-red-600',
  };

  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-gray-700">{label}</p>
          <p className="text-sm text-gray-600">{normalizedProgress}%</p>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full transition-all duration-300`}
          style={{ width: `${normalizedProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
