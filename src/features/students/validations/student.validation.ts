import * as Yup from "yup";

export const addStudentSchema = Yup.object().shape({
  studentName: Yup.string().min(3).max(50).required('Name is required'),
  studentEmail: Yup.string().email().required('Email is required'),
  studentPhone: Yup.string().matches(/^[0-9]{10,15}$/, "Phone must be 10–15 digits").nullable(),
  studentAddress: Yup.string().max(100).nullable(),
  studentGender: Yup.string()
    .oneOf(["male", "female"], "Gender is required")
    .required("Gender is required"),
  studentClassId: Yup.string().required('Class is required'),
  studentRollNumber: Yup.string().matches(/^[A-Za-z0-9-_]*$/, "Roll number can only contain letters, numbers, - or _").nullable(),
  studentParentId: Yup.string().required('Parent is required'),
});