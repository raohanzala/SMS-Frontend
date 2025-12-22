import { ReactNode } from "react";
import { FormikErrors } from "formik";

interface FormRowVerticalProps {
  label?: string;
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined;
  name: string;
  children: ReactNode;
  required?: boolean;
  helperText?: string;
}

const FormRowVertical = ({
  label,
  name,
  children,
  error,
  required = false,
  helperText,
}: FormRowVerticalProps) => {
  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={name} 
          className="block text-base font-medium text-gray-600 capitalize"
        >
          {label}
          {required && (
            <span className="text-status-error ml-1" aria-label="required">*</span>
          )}
        </label>
      )}
      {children}
      {helperText && !error && (
        <p className="text-xs text-text-tertiary mt-1">
          {helperText}
        </p>
      )}
      {error && (
        <div 
          className="text-status-error text-xs mt-1 flex items-center gap-1"
          role="alert"
          aria-live="polite"
        >
          <svg 
            className="w-3.5 h-3.5 flex-shrink-0" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
              clipRule="evenodd" 
            />
          </svg>
          <span>{Array.isArray(error) ? error.join(", ") : error}</span>
        </div>
      )}
    </div>
  );
};

export default FormRowVertical;
