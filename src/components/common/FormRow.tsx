import { useFormikContext } from 'formik';
import { ReactNode } from 'react';

interface FormRowProps {
  label?: string;
  name: string;
  children: ReactNode;
}

const FormRow = ({ label, name, children }: FormRowProps) => {
  const formik = useFormikContext<Record<string, any>>();

  return (
    <div className="grid grid-cols-[0.5fr_2fr_1.2fr] items-center gap-9 mb-2">
    {label && <label htmlFor={name} className="mb-1 capitalize text-dark-3 text-nowrap">{label}</label>}
    {children}
    {formik.touched[name] && formik.errors[name] && (
        <div className="text-red-500 text-xs mt-1">{formik.errors[name] as string}</div>
      )}
  </div>
  )
}

export default FormRow;

