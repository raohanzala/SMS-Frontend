import * as Yup from "yup";

export const addStudentSchema = Yup.object().shape({
  name: Yup.string().min(3).max(50).required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Phone must be 10–15 digits")
    .nullable(),
  address: Yup.string().max(100).nullable(),
  gender: Yup.string().oneOf(["male", "female"]).required("Gender is required"),
  classId: Yup.string().required("Class is required"),
  rollNumber: Yup.string()
    .matches(
      /^[A-Za-z0-9-_]*$/,
      "Roll number can only contain letters, numbers, - or _"
    )
    .nullable(),
  session: Yup.string().required("Session is required"),
  dob: Yup.string().nullable(),
  religion: Yup.string().nullable(),
  nationalId: Yup.string().nullable(),

  // --- Updated for multiple guardians ---
  guardians: Yup.array()
    .of(
      Yup.object().shape({
        parent: Yup.string().required("Parent is required"),
        relation: Yup.string()
          .oneOf(["Father", "Mother", "Guardian"])
          .required("Relation is required"),
      })
    )
    .min(1, "At least one guardian is required"),
});
