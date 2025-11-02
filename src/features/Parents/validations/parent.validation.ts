import * as Yup from "yup";

export const addParentSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Phone must be between 10–15 digits")
    .nullable(),
  address: Yup.string()
    .max(100, "Address can be at most 100 characters")
    .nullable(),
  gender: Yup.string()
    .required("Gender is required"),
  children: Yup.array()
    .of(Yup.string().matches(/^[a-fA-F0-9]{24}$/, "Invalid student ID"))
    .nullable(),
});