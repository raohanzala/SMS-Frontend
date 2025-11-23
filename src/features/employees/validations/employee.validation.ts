import * as Yup from "yup";

export const addEmployeeSchema = Yup.object().shape({
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
    .max(200, "Address can be at most 200 characters")
    .nullable(),

  gender: Yup.string()
    .oneOf(["male", "female"], "Gender must be male or female")
    .required("Gender is required"),

  designation: Yup.string()
    .oneOf(
      ["teacher", "principal", "accountant", "management", "admin", "other"],
      "Invalid designation"
    )
    .required("Designation is required"),

  experience: Yup.string()
    .max(200, "Experience can be at most 200 characters")
    .nullable(),

  education: Yup.string()
    .max(200, "Education can be at most 200 characters")
    .nullable(),

  husbandName: Yup.string()
    .max(100, "Husband name can be at most 100 characters")
    .nullable(),

  dateOfJoining: Yup.string().nullable(),

  assignedClasses: Yup.array()
    .of(
      Yup.string().matches(/^[a-fA-F0-9]{24}$/, "Invalid class ID")
    )
    .nullable(),

  salary: Yup.object()
    .shape({
      amount: Yup.number()
        .min(0, "Salary amount must be positive")
        .nullable(),
      currency: Yup.string().nullable(),
    })
    .nullable(),
});
