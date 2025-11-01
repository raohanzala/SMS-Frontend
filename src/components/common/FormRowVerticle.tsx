import { ReactNode } from 'react';
import { FormikContextType } from 'formik';

interface FormRowVerticalProps {
  label?: string;
  name: string;
  children: ReactNode;
  formik?: FormikContextType<any>;
}

const FormRowVertical = ({ label, name, children, formik }: FormRowVerticalProps) => {

  const error =
    formik?.touched?.[name] && formik?.errors?.[name]
      ? formik.errors[name]
      : null;
  return (
    <div className="mb-2">
      {label && <label htmlFor={name} className="mb-1 capitalize text-dark-3">{label}</label>}
      {children}
      {error && <div className="text-red-500 text-xs mt-1">{error as string}</div>}
      {formik?.touched[name] && formik.errors[name] && (
        <div className="text-red-500 text-xs mt-1">{formik.errors[name] as string}</div>
      )}
    </div>
  );
};

export default FormRowVertical;

