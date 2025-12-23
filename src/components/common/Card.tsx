import React from "react";

interface CardProps {
	children : React.ReactNode;
	title ?: string;
	description ?: string
}

const Card = ({ children, title, description }: CardProps) => {
  return (
    <div className="bg-bg-main rounded-2xl border shadow-sm overflow-hidden">
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
