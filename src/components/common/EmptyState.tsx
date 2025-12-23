import { ElementType } from 'react';

interface EmptyStateProps {
  icon?: ElementType;
  title: string;
  description: string;
  // These props are accepted but ignored (for backward compatibility)
  buttonText?: string;
  onButtonClick?: () => void;
  buttonIcon?: ElementType;
}

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="text-center max-w-md">
        {Icon && (
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-bg-secondary flex items-center justify-center">
              <Icon className="w-8 h-8 text-text-tertiary" />
            </div>
          </div>
        )}
        
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          {title}
        </h3>
        
        <p className="text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
