import React from 'react';
import Card from './Card';

/**
 * StatCard Component
 * @param {Object} props
 * @param {string} props.label - Label text
 * @param {string|number} props.value - Stat value
 * @param {React.ReactNode} [props.icon] - Icon element
 * @param {string} [props.subtext] - Supporting text
 * @param {string} [props.className]
 */
const StatCard = ({
  label,
  value,
  icon,
  subtext,
  className = '',
}) => {
  return (
    <Card className={`text-center hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 ${className}`} hover={true}>
      {icon && (
        <div className="flex justify-center mb-4 text-primary-600 group-hover:text-primary-700 transition-colors duration-300 group-hover:scale-110">
          {icon}
        </div>
      )}
      <p className="text-gray-600 text-sm font-medium mb-2">{label}</p>
      <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-2 group-hover:from-primary-700 group-hover:to-primary-800">{value}</p>
      {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
    </Card>
  );
};

export default StatCard;
