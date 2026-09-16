import React from 'react';

/**
 * LoadingState Component
 * @param {Object} props
 * @param {string} [props.message='লোড হচ্ছে...']
 * @param {string} [props.className]
 */
const LoadingState = ({
  message = 'লোড হচ্ছে...',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
      <p className="text-slate-600 text-sm font-medium">{message}</p>
    </div>
  );
};

export default LoadingState;
