import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ShramikID Badge Logo Icon (ID Card with Lanyard Clip, Avatar & Details)
 * Exactly styled as the Worker Identity Smart Card
 */
export const LogoIcon = ({
  size = 40,
  className = '',
  variant = 'emerald', // 'emerald', 'white', 'slate', 'dark'
}) => {
  const getColors = () => {
    switch (variant) {
      case 'white':
        return {
          stroke: '#FFFFFF',
          accent: '#A7F3D0',
          bg: 'rgba(255, 255, 255, 0.15)',
        };
      case 'dark':
        return {
          stroke: '#10B981',
          accent: '#34D399',
          bg: '#0F172A',
        };
      case 'slate':
        return {
          stroke: '#1E293B',
          accent: '#059669',
          bg: '#F1F5F9',
        };
      case 'emerald':
      default:
        return {
          stroke: 'currentColor',
          accent: 'currentColor',
          bg: 'transparent',
        };
    }
  };

  const colors = getColors();

  return (
    <svg
      width={size}
      height={Math.round((size * 72) / 60)}
      viewBox="0 0 60 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block transition-transform duration-300 ${className}`}
    >
      {/* Top Lanyard Clip / Loop */}
      <path
        d="M26 12V4C26 2.89543 26.8954 2 28 2H32C33.1046 2 34 2.89543 34 4V12"
        stroke={colors.stroke}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="24"
        y1="12"
        x2="36"
        y2="12"
        stroke={colors.stroke}
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Main ID Badge Card Outer Body */}
      <rect
        x="9"
        y="12"
        width="42"
        height="56"
        rx="8"
        stroke={colors.stroke}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Top Header Strip / Category Bar */}
      <rect
        x="16"
        y="18"
        width="28"
        height="5.5"
        rx="1.5"
        stroke={colors.stroke}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Person Avatar: Head Circle */}
      <circle
        cx="30"
        cy="33"
        r="6.5"
        stroke={colors.stroke}
        strokeWidth="3.2"
      />

      {/* Person Avatar: Shoulders / Bust with V-Neck Collar Notch */}
      <path
        d="M18.5 50.5C18.5 45.5 22 42.5 26.5 41L30 45L33.5 41C38 42.5 41.5 45.5 41.5 50.5"
        stroke={colors.stroke}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3 Horizontal Credential Details Lines */}
      <line
        x1="18"
        y1="56"
        x2="42"
        y2="56"
        stroke={colors.stroke}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="61"
        x2="42"
        y2="61"
        stroke={colors.stroke}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="66"
        x2="42"
        y2="66"
        stroke={colors.stroke}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Full Brand Logo with Icon & Bengali Name
 */
export const Logo = ({
  to = '/',
  size = 'md', // 'sm', 'md', 'lg'
  variant = 'default', // 'default', 'light', 'dark'
  showSubtitle = true,
  className = '',
}) => {
  const isLight = variant === 'light';

  const iconSizes = {
    sm: 28,
    md: 36,
    lg: 46,
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  const content = (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* ID Badge Icon Container */}
      <div className={`flex items-center justify-center p-2 rounded-2xl transition-all duration-300 ${
        isLight
          ? 'bg-white/10 text-emerald-300 group-hover:bg-white/20'
          : 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-sm group-hover:border-emerald-300 group-hover:bg-emerald-100/70 group-hover:scale-105'
      }`}>
        <LogoIcon size={iconSizes[size] || 36} />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span className={`font-black tracking-tight flex items-center gap-1 ${textSizes[size] || 'text-2xl'} ${
          isLight ? 'text-white' : 'text-slate-900'
        }`}>
          শ্রমিক<span className="text-emerald-600">আইডি</span>
        </span>
        {showSubtitle && (
          <span className={`font-semibold tracking-wider uppercase -mt-1 ${subSizes[size] || 'text-[10px]'} ${
            isLight ? 'text-emerald-200' : 'text-slate-500'
          }`}>
            ডিজিটাল স্কিল পাসপোর্ট
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
