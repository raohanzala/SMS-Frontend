interface CardProps {
	children : any;
	title : string;
	description: string
}

const Card = ({ children, title, description }: CardProps) => {
  return (
    <div className="bg-bg-main rounded-2xl border shadow-sm overflow-hidden">
      <div className="px-8 py-4 border-b">
        <h3 className="text-xl font-semibold text-text-primary">
          {title}
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
};

export default Card;
