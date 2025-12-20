import * as Yup from "yup";

export const createSchoolSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "School name must be at least 3 characters")
    .max(100, "School name must be less than 100 characters")
    .required("School name is required"),
  code: Yup.string()
    .max(20, "School code must be less than 20 characters")
    .matches(/^[A-Z0-9]*$/, "School code must contain only uppercase letters and numbers")
    .optional(),
});

