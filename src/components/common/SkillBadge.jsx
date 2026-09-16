import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Badge from './Badge';

/**
 * SkillBadge Component - for displaying skills with verification status
 * @param {Object} props
 * @param {string} props.name - Skill name
 * @param {string} [props.level] - 'beginner', 'intermediate', 'advanced', 'expert'
 * @param {boolean} [props.verified=false] - Whether skill is verified
 * @param {string} [props.className]
 */
const SkillBadge = ({
  name,
  level,
  verified = false,
  className = '',
}) => {
  const levelColors = {
    beginner: 'text-yellow-600',
    intermediate: 'text-blue-600',
    advanced: 'text-primary-600',
    expert: 'text-purple-600',
  };

  const levelLabels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    expert: 'Expert',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Badge variant="secondary">
        <div className="flex items-center gap-1">
          <span>{name}</span>
          {level && <span className={`text-xs ${levelColors[level]}`}>•</span>}
        </div>
      </Badge>
      {verified && (
        <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" title="Verified" />
      )}
    </div>
  );
};

export default SkillBadge;
