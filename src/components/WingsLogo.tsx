import React from 'react';
import companyLogo from '../logo.jpg';

interface WingsLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  iconOnly?: boolean;
  layout?: 'horizontal' | 'vertical';
}

export const WingsLogo: React.FC<WingsLogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  iconOnly = false,
  layout = 'horizontal'
}) => {
  const iconDimensions = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28'
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl sm:text-2xl',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-6xl'
  };

  const subSizes = {
    sm: 'text-[8px]',
    md: 'text-[9px] sm:text-[10px]',
    lg: 'text-[11px]',
    xl: 'text-[13px]'
  };

  const containerLayout = layout === 'vertical' 
    ? 'flex-col text-center items-center gap-2' 
    : 'items-center gap-3';

  return (
    <div className={`inline-flex ${containerLayout} ${className}`}>
      {/* WINGS Company Logo (.jpg file from src/logo.jpg with background removed/blended) */}
      <div className={`${iconDimensions[size]} relative flex items-center justify-center shrink-0`}>
        <img
          src={companyLogo}
          alt="WINGS Marketing Logo"
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300 mix-blend-screen"
        />
      </div>

      {/* WINGS Wordmark */}
      {showText && !iconOnly && (
        <div className={`flex flex-col ${layout === 'vertical' ? 'items-center text-center' : 'text-left'}`}>
          <span className={`font-display font-black tracking-[0.12em] text-white ${titleSizes[size]} uppercase leading-none`}>
            WINGS
          </span>
          <span className={`${subSizes[size]} tracking-[0.3em] text-[#AAB2C8] font-bold uppercase mt-1.5 leading-none`}>
            Marketing
          </span>
        </div>
      )}
    </div>
  );
};

