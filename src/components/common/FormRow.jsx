import { useFormikContext } from 'formik';
import React from 'react'

const FormRow = ({ label, name, children }) => {
  const formik = useFormikContext();

  return (
    <div className="grid grid-cols-[0.5fr_2fr_1.2fr] items-center gap-9 mb-2">
    {label && <label htmlFor={name} className="mb-1 capitalize text-dark-3 text-nowrap">{label}</label>}
    {children}
    {formik.touched[name] && formik.errors[name] && (
        <div className="text-red-500 text-xs mt-1">{formik.errors[name]}</div>
      )}
  </div>
  )
}

export default FormRow