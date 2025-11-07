import { ReactNode } from 'react';

interface FormRowVerticalProps {
  label?: string;
  error? : string | null; 
  name: string;
  children: ReactNode;
}

const FormRowVertical = ({ label, name, children, error }: FormRowVerticalProps) => {

  return (
    <div>
      {label && <label htmlFor={name} className="mb-1 capitalize text-dark-3">{label}</label>}
      {children}
      <div className={`text-red-500 text-xs mt-1 ${error ? 'opacity-100': 'opacity-0'}`}>{error || "none"}</div>
    </div>
  );
};

export default FormRowVertical;

