import * as Yup from "yup";

export const addTeacherSchema = Yup.object().shape({
  teacherName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters")
    .required("Name is required"),
  teacherEmail: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  teacherPhone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Phone must be between 10–15 digits")
    .nullable(),
  teacherAddress: Yup.string()
    .max(200, "Address can be at most 200 characters")
    .nullable(),
  teacherGender: Yup.string()
    .oneOf(["male", "female"], "Gender must be male or female")
    .required("Gender is required"),
  teacherExperience: Yup.string()
    .max(200, "Experience can be at most 200 characters")
    .nullable(),
  teacherEducation: Yup.string()
    .max(200, "Education can be at most 200 characters")
    .nullable(),
  teacherHusband: Yup.string()
    .max(100, "Husband name can be at most 100 characters")
    .nullable(),
  teacherDateOfJoining: Yup.string()
    .nullable(),
  assignedClasses: Yup.array()
    .of(Yup.string().matches(/^[a-fA-F0-9]{24}$/, "Invalid class ID"))
    .nullable(),
  teacherSalary: Yup.object().shape({
    amount: Yup.number().min(0, "Salary amount must be positive").nullable(),
    currency: Yup.string().nullable(),
  }).nullable(),
});

