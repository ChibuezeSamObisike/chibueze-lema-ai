import { forwardRef, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import TableLoader from 'components/TableLoader';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, children, isLoading, ...props }, ref) => {
    const baseStyles = 'px-4 py-2 rounded-md';
    const variantStyles = {
      primary: 'bg-[#334155] text-white hover:bg-[#42516b]',
      secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    };

    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          className,
          'flex items-center'
        )}
        {...props}
      >
        {children}{' '}
        {isLoading && (
          <div className='w-2'>
            {' '}
            <TableLoader color='#fff' />
          </div>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
