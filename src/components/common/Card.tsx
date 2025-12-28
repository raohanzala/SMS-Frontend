import React from "react";

interface CardProps {
	children : React.ReactNode;
	title ?: string;
	description ?: string,
  className?: string,
  size?: string,
}

const Card = ({ children, title, description, className = '', size = 'sm' }: CardProps) => {

  const isInfoText = title || description

  const sizes = {
    sm: `rounded-lg shadow-sm ${isInfoText ? '' :  'p-5'}`,
    md: 'rounded-xl shadow-sm',
  };

   const sizeClass = isInfoText ? sizes['md'] : sizes[size];
   
   const classes = `${sizeClass} ${className}`;

  return (
    <div className={`bg-bg-main border border-border ${classes}`}>
      {(title || description) && <div className={`px-8 py-4 border-b ${title ? "border-b-border" : ""}`}>
        {title && <h3 className="text-xl font-semibold text-text-primary">
          {title}
        </h3>}
        {description && <p className="text-sm text-text-secondary mt-1">
          {description}
        </p>}
      </div>}
      {children}
    </div>
  );
};

export default Card;
