import { ReactNode } from 'react';

interface FormRowVerticalProps {
  label?: string;
  error? : string | null; 
  name: string;
  children: ReactNode;
}

const FormRowVertical = ({ label, name, children, error }: FormRowVerticalProps) => {

  return (
    <div className="mb-2">
      {label && <label htmlFor={name} className="mb-1 capitalize text-dark-3">{label}</label>}
      {children}
      {error && <div className="text-red-500 text-xs mt-1">{error as string}</div>}
    </div>
  );
};

export default FormRowVertical;

