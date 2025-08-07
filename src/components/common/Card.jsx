import React from 'react';

const Card = ({
  children,
  className = '',
  padding = 'p-6',
  shadow = 'shadow-sm',
  border = 'border border-gray-200',
  rounded = 'rounded-lg',
  hover = false,
  ...props
}) => {
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
Card.Header = ({ children, className = '', ...props }) => (
  <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`} {...props}>
    {children}
  </div>
);

// Card Title component
Card.Title = ({ children, className = '', size = 'lg', ...props }) => {
  const sizeClasses = {
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
Card.Subtitle = ({ children, className = '', ...props }) => (
  <p className={`text-gray-600 mt-1 ${className}`} {...props}>
    {children}
  </p>
);

// Card Body component
Card.Body = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

// Card Footer component
Card.Footer = ({ children, className = '', ...props }) => (
  <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`} {...props}>
    {children}
  </div>
);

export default Card; 