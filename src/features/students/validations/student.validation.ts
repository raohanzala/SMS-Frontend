import * as Yup from "yup";

export const addStudentSchema = Yup.object().shape({
  name: Yup.string().min(3).max(50).required('Name is required'),
  email: Yup.string().email().required('Email is required'),
  phone: Yup.string().matches(/^[0-9]{10,15}$/, "Phone must be 10–15 digits").nullable(),
  address: Yup.string().max(100).nullable(),
  gender: Yup.string()
    .oneOf(["male", "female"], "Gender is required") // ✅ Add this line
    .required("Gender is required"),
  class: Yup.string().required('Class is required'),
  rollNumber: Yup.string().matches(/^[A-Za-z0-9-_]*$/, "Roll number can only contain letters, numbers, - or _").nullable(),
  parent: Yup.string().required('Parent is required'),
});