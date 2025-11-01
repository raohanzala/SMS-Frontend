import { ReactNode, ButtonHTMLAttributes } from 'react';
import { FiLoader } from 'react-icons/fi';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type IconPosition = 'left' | 'right';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  startIcon,
  endIcon,
  ...props
}: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center h-fit text-nowrap justify-center font-medium rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-primary text-white hover:bg-primary/90 focus:ring-primary/50 shadow-sm hover:shadow-md',
    secondary:
      'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500/50 border border-gray-300',
    outline:
      'bg-transparent text-primary border border-primary hover:bg-primary hover:text-white focus:ring-primary/50',
    ghost:
      'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500/50',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/50 shadow-sm hover:shadow-md',
    success:
      'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500/50 shadow-sm hover:shadow-md',
    warning:
      'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500/50 shadow-sm hover:shadow-md',
  };

  const sizes: Record<ButtonSize, string> = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  const classes = `${baseClasses} ${variantClass} ${sizeClass} ${widthClass} ${className}`;

  const renderLoaderOrIcon = () => {
    if (loading) return <FiLoader className="animate-spin" />;
    return icon;
  };

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {/* Start icon (new API) */}
      {startIcon && <span className="">{startIcon}</span>}

      {/* Legacy icon (if startIcon not provided) */}
      {!startIcon && iconPosition === 'left' && renderLoaderOrIcon() && (
        <span className="mr-2">{renderLoaderOrIcon()}</span>
      )}

      {children}

      {/* End icon (new API) */}
      {endIcon && <span className="ml-2">{endIcon}</span>}

      {/* Legacy icon (if endIcon not provided) */}
      {!endIcon && iconPosition === 'right' && renderLoaderOrIcon() && (
        <span className="ml-2">{renderLoaderOrIcon()}</span>
      )}
    </button>
  );
};

export default Button;

