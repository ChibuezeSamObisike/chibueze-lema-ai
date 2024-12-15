import { forwardRef, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

import PublishLoaderIcon from 'assets/publish-loader.svg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, children, isLoading, ...props }, ref) => {
    const baseStyles =
      'px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary:
        'bg-[#334155] text-white hover:bg-[#42516b] disabled:bg-gray-400 font-[500]',
      secondary:
        'bg-white text-gray-700 border border-[#E2E8F0] hover:bg-gray-100 disabled:bg-gray-100 font-[300]',
    };

    return (
      <button
        ref={ref}
        disabled={!!isLoading}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          className,
          'flex items-center'
        )}
        {...props}
      >
        {children}
        {isLoading && (
          <div className='w-5 ml-2'>
            <img src={PublishLoaderIcon} />
          </div>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
