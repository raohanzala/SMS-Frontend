import * as Yup from "yup";

export const addParentSchema = Yup.object().shape({
  parentName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters")
    .required("Name is required"),
  parentEmail: Yup.string()
    .email("Invalid email format")
    .nullable(),
  parentPhone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Phone must be between 10–15 digits")
    .required("Phone is required"),
  parentAddress: Yup.string()
    .max(100, "Address can be at most 100 characters")
    .nullable(),
  parentGender: Yup.string()
    .oneOf(["male", "female"], "Gender must be male or female")
    .required("Gender is required"),
  occupation: Yup.string()
    .max(100, "Occupation can be at most 100 characters")
    .nullable(),
  parentChildrenIds: Yup.array()
    .of(Yup.string().matches(/^[a-fA-F0-9]{24}$/, "Invalid student ID"))
    .nullable(),
});