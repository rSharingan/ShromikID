import React from 'react';
import { InboxIcon } from 'lucide-react';
import Button from './Button';

/**
 * EmptyState Component
 * @param {Object} props
 * @param {string} props.title - Main title
 * @param {string} props.description - Description text
 * @param {React.ReactNode} [props.icon] - Icon element
 * @param {React.ReactNode} [props.action] - Action button/component
 * @param {string} [props.className]
 */
const EmptyState = ({
  title,
  description,
  icon = <InboxIcon size={48} />,
  action,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="text-gray-400 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6 max-w-sm">{description}</p>
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
