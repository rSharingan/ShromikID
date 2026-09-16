import React from 'react';
import { User } from 'lucide-react';

/**
 * Avatar Component
 * @param {Object} props
 * @param {string} [props.src] - Image source
 * @param {string} [props.name] - User name for initials
 * @param {string} [props.size='md'] - 'sm', 'md', 'lg', 'xl'
 * @param {string} [props.className]
 */
const Avatar = ({
  src,
  name = 'User',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const getInitials = (fullName) => {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover flex-shrink-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold flex-shrink-0 ${className}`}
    >
      {name ? getInitials(name) : <User size={16} />}
    </div>
  );
};

export default Avatar;
