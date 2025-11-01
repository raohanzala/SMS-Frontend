import { ElementType, MouseEvent } from 'react';

interface EmptyStateProps {
  icon?: ElementType;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  buttonIcon?: ElementType;
}

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  buttonText, 
  onButtonClick,
  buttonIcon: ButtonIcon 
}: EmptyStateProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="text-center py-12">
        {Icon && <Icon className="mx-auto h-12 w-12 text-gray-400" />}
        <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
        {buttonText && onButtonClick && (
          <div className="mt-6">
            <button 
              onClick={onButtonClick}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              {ButtonIcon && <ButtonIcon className="mr-2 h-4 w-4" />}
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;

