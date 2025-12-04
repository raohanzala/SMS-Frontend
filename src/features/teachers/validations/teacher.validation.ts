import * as Yup from "yup";

export const addTeacherSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  gender: Yup.string().oneOf(["male", "female"], "Gender is required").required(),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Phone must be 10–15 digits")
    .nullable(),
  address: Yup.string().nullable(),
  experience: Yup.string().nullable(),
  education: Yup.string().nullable(),
  husband: Yup.string().nullable(),
  dateOfJoining: Yup.date().nullable(),
  religion: Yup.string().nullable(),
  dob: Yup.date().nullable(),
  nationalId: Yup.string().nullable(),
  levelsIds: Yup.array().of(Yup.string()).required("Teacher levels are required"),
  salary: Yup.object().shape({
    amount: Yup.number().nullable(),
    currency: Yup.string().nullable(),
  }),
});

