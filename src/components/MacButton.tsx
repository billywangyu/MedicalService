// components/MacButton.tsx
import React from 'react';
import clsx from 'clsx';

interface MacButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const MacButton: React.FC<MacButtonProps> = ({
  children,
  isActive = false,
  variant = 'primary',
  className,
  ...props
}) => {
  const variantClasses = {
    primary:
      'bg-gradient-to-b from-gray-300 to-gray-100 text-gray-900 border-gray-400 hover:from-gray-400',
    secondary:
      'bg-gradient-to-b from-white to-gray-200 text-gray-700 border-gray-300 hover:from-gray-300',
    danger:
      'bg-gradient-to-b from-red-500 to-red-400 text-white border-red-600 hover:from-red-600',
  };

  return (
    <button
      {...props}
      className={clsx(
        'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none active:scale-95',
        'shadow-md hover:shadow-lg',
        variantClasses[variant],
        isActive && 'ring-2 ring-blue-500',
        className
      )}
    >
      {children}
    </button>
  );
};
