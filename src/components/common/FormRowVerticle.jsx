import { ErrorMessage, useFormikContext } from 'formik'
import React from 'react'

const FormRowVertical = ({ label, name, children, formik }) => {

  const error =
    formik?.touched?.[name] && formik?.errors?.[name]
      ? formik.errors[name]
      : null;
  return (
    <div className="mb-2">
      {label && <label htmlFor={name} className="mb-1 capitalize text-dark-3">{label}</label>}
      {children}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
      {formik?.touched[name] && formik.errors[name] && (
        <div className="text-red-500 text-xs mt-1">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default FormRowVertical