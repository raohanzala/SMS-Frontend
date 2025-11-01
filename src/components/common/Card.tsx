import { ReactNode, HTMLAttributes } from 'react';

type CardSize = 'sm' | 'md' | 'lg' | 'xl';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: string;
  shadow?: string;
  border?: string;
  rounded?: string;
  hover?: boolean;
}

interface CardSubComponentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  size?: CardSize;
}

const Card = ({
  children,
  className = '',
  padding = 'p-6',
  shadow = 'shadow-sm',
  border = 'border border-gray-200',
  rounded = 'rounded-lg',
  hover = false,
  ...props
}: CardProps) => {
  const baseClasses = 'bg-white';
  const hoverClass = hover ? 'hover:shadow-md transition-shadow duration-200' : '';
  
  const classes = `${baseClasses} ${padding} ${shadow} ${border} ${rounded} ${hoverClass} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Card Header component
Card.Header = ({ children, className = '', ...props }: CardSubComponentProps) => (
  <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`} {...props}>
    {children}
  </div>
);

// Card Title component
Card.Title = ({ children, className = '', size = 'lg', ...props }: CardTitleProps) => {
  const sizeClasses: Record<CardSize, string> = {
    sm: 'text-lg font-semibold',
    md: 'text-xl font-semibold',
    lg: 'text-2xl font-bold',
    xl: 'text-3xl font-bold'
  };

  const classes = `${sizeClasses[size]} text-gray-900 ${className}`;

  return (
    <h3 className={classes} {...props}>
      {children}
    </h3>
  );
};

// Card Subtitle component
Card.Subtitle = ({ children, className = '', ...props }: CardSubComponentProps) => (
  <p className={`text-gray-600 mt-1 ${className}`} {...props}>
    {children}
  </p>
);

// Card Body component
Card.Body = ({ children, className = '', ...props }: CardSubComponentProps) => (
  <div className={className} {...props}>
    {children}
  </div>
);

// Card Footer component
Card.Footer = ({ children, className = '', ...props }: CardSubComponentProps) => (
  <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`} {...props}>
    {children}
  </div>
);

export default Card;

