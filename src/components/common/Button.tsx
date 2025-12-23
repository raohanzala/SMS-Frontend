import { ReactNode, ButtonHTMLAttributes } from 'react';
import { Loader } from 'lucide-react';

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
    'inline-flex items-center h-fit text-nowrap justify-center font-medium rounded-md transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-primary text-text-white gradient-primary active:bg-primary-darker shadow-primary hover:shadow-md',
    secondary:
      'bg-bg-secondary text-text-primary hover:bg-bg-tertiary border border-border',
    outline:
      'bg-transparent text-text-primary border border-border hover:bg-bg-secondary hover:border-border',
    ghost:
      'bg-transparent text-text-secondary hover:bg-bg-secondary',
    danger:
      'bg-status-error text-text-white hover:bg-status-errorDark shadow-sm hover:shadow-md',
    success:
      'bg-accent-teal text-text-white hover:bg-accent-tealDark shadow-sm hover:shadow-md',
    warning:
      'bg-status-warning text-text-white hover:bg-status-warningDark shadow-sm hover:shadow-md',
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
    if (loading) return <Loader className="animate-spin" />;
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
      {startIcon && <span className="">{startIcon}</span>}

      {!startIcon && iconPosition === 'left' && renderLoaderOrIcon() && (
        <span className="mr-2">{renderLoaderOrIcon()}</span>
      )}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}

      {!endIcon && iconPosition === 'right' && renderLoaderOrIcon() && (
        <span className="ml-2">{renderLoaderOrIcon()}</span>
      )}
    </button>
  );
};

export default Button;

