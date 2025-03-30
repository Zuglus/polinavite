import React from 'react';

// Определяем типы для props
export type SkeletonVariant = 'default' | 'circle' | 'text';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

export interface SkeletonProps {
  /** Дополнительные CSS классы */
  className?: string;
  /** Вариант отображения */
  variant?: SkeletonVariant;
  /** Тип анимации */
  animation?: SkeletonAnimation;
}

/**
 * Компонент для отображения загрузочного состояния
 */
const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '',
  variant = 'default',
  animation = 'pulse'
}) => {
  const baseClasses = 'relative overflow-hidden rounded-[1.875rem] md:rounded-[1.25rem]';
  
  const variantClasses: Record<SkeletonVariant, string> = {
    default: 'h-full w-full min-h-[31rem]',
    circle: 'rounded-full',
    text: 'h-4 w-3/4'
  };

  const animationClasses: Record<SkeletonAnimation, string> = {
    pulse: 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent',
    wave: 'animate-pulse',
    none: ''
  };

  const bgClass = 'bg-white/[0.03]';

  return (
    <div 
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${animationClasses[animation]}
        ${bgClass}
        ${className}
      `}
      data-testid="skeleton"
    >
      <div className="grid h-full w-full place-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-12 w-12 text-white/10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default React.memo(Skeleton);